const express = require("express");
const router = express.Router();
const { Comment, User } = require("../../db/models");
const { verifyRefreshToken } = require("../middlewares/verifyToken");


router.get("/:teaId", async (req, res) => {
  try {
    const { teaId } = req.params;
    const comments = await Comment.findAll({
      where: { teaId: teaId },
      include: [User],
      order: [['createdAt', 'ASC']] 
    });
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).send("Ошибка сервера");
  }
});

router.post("/", verifyRefreshToken, async (req, res) => {
  try {
    const { teaId, comment_text } = req.body;
    const userId = res.locals.user.id;
    const newComment = await Comment.create({
      userId: userId,
      teaId: teaId,
      comment_text: comment_text,
    });

    const comment = await Comment.findOne({
      where: { id: newComment.id },
      include: [User],
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).send("Ошибка сервера");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ error: "коментарий не найден" });
    }
    await comment.destroy();
    res.json({ message: "Коментарий удалён" });
  } catch (error) {
    res.status(500).json({ error: "Ошибка при удалении коментария" });
  }
});


module.exports = router;