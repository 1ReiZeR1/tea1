const express = require("express");
const router = express.Router();
const { verifyRefreshToken } = require("../middlewares/verifyToken");
const { Comment, User, Message, Tea } = require("../../db/models");

router.get("/latest", verifyRefreshToken, async (req, res) => {
  try {
    const comments = await Comment.findAll({
      limit: 10,
      where: { userId: res.locals.user.id}, // только если есть мидлварка verifyRefreshToken тогда есть user
      order: [["createdAt", "DESC"]],
      include: [
        { model: User, attributes: ["name"] }, 
        { model: Tea, attributes: ["name"] },
      ],
    });
    if (comments.length === 0) {
      return res.status(404).json({ message: "Комментарии не найдены" });
    }
    res.json(comments);
  }
  catch {
    console.error("Ошибка при загрузке комментариев:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
})

  router.get("/", verifyRefreshToken, async (req, res) => {   
    try {
      const messages = await Message.findAll({ where: {userId: res.locals.user.id}});      
      return res.status(200).json({ messages });
    } catch (error) {
      console.error('ошибка запроса сообщений', error);
      return res.status(500).json({ error: "Ошибка сервера" });
    }
  });

  router.delete("/:messageId", verifyRefreshToken, async (req, res) => {   
    try {
      const { messageId } = req.params;
      await Message.destroy({ where: { userId: res.locals.user.id, id: messageId } });

      return res.status(200).json({ message: "Ошибка удаления сообщения" }); 
    } catch (error) {
      console.error('Ошибка удаления сообщения', error);
      return res.status(500).json({ error: "Ошибка сервера" });
    }
  });

  router.post("/", verifyRefreshToken, async (req, res) => {
    try {
      const { messageId, text, image } = req.body;
      
      if (!messageId || !text || !image) {
        return res.status(400).json({ error: "Все поля обязательны" });
      }
      const message = await Message.findOne({
        where: { id: messageId, userId: res.locals.user.id },
      });
  
      if (!message) {
        return res.status(404).json({ error: "Сообщение не найдено" });
      }
  
      await message.update({ text, image });
  
      return res.status(200).json({ message });
    } catch (error) {
      console.error("Ошибка обновления сообщения", error);
      return res.status(500).json({ error: "Ошибка сервера" });
    }
  });
  
  
  module.exports = router;