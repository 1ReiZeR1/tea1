const express = require("express");
const router = express.Router();
const { Message } = require("../../db/models");
const { verifyRefreshToken } = require("../middlewares/verifyToken");

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