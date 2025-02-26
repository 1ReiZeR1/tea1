const express = require("express");
const router = express.Router();
const { Message, User } = require("../../db/models");

router.post("/", async (req, res) => {
    const { text, image, userId } = req.body;
    if (!text || !image || !userId) {
      return res.status(400).json({ error: "данные не переданы" });
    }
    
    const message = await Message.create({ text, image, userId});
    return res
    .status(200).json({ message: "Сообщение сохранено", message});
  });

  router.get("/", async (req, res) => {   
    try {
      const messages = await Message.findAll({
        include: {
          model: User, 
          attributes: ['id', 'name', 'email']
        }
      });
  
      return res.status(200).json({ messages });
    } catch (error) {
      console.error('Error fetching messages:', error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  
  module.exports = router;