const express = require("express");
const router = express.Router();
const { Message, User, Like } = require("../../db/models");
const { verifyRefreshToken } = require("../middlewares/verifyToken");

  router.post("/", verifyRefreshToken, async (req, res) => {
    try {
      const { messageId } = req.body;
      const user = res.locals.user
      if (!messageId || !user) {
        return res.status(400).json({ error: "Не удалось поставить лайк, ошибка" });
      }
      const like = await Like.findOne({
        where: { messageId, userId: user.id },
      });
  
      if (like) {
        return res.status(400).json({ error: "Лайк уже поставлен" });
      }
      const newLike = await Like.create({
         messageId, userId: user.id
      });
    
      const message = await Message.findOne({
        where: { id: messageId },
      });

      const newCountLike = message?.countLike ? message?.countLike + 1 : 1
      await message?.update({ countLike: newCountLike });
  
      return res.status(200).json({ like: newLike, message: 'Лайк успешно сохранен' });
    } catch (error) {
      console.error("Ошибка обновления сообщения", error);
      return res.status(500).json({ error: "Ошибка сервера" });
    }
  });
  
  
  module.exports = router;