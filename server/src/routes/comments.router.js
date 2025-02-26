const express = require("express");
const { Comment, User, Tea } = require("../../db/models");
const router = express.Router();
const { verifyRefreshToken } = require("../middlewares/verifyToken");
const { where } = require("sequelize");

router.post("/", async (req, res) => {
  try {
    const { comment_text, teaId, userId } = req.body;

    const newComment = await Comment.create({
      comment_text,
      teaId,
      userId,
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error("Ошибка при создании комментария:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

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
  } catch (error) {
    console.error("Ошибка при загрузке комментариев:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

module.exports = router;