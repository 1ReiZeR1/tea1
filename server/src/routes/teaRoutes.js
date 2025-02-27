const express = require("express");
const { Tea } = require("../../db/models");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const teas = await Tea.findAll();
    res.json(teas);
  } catch (error) {
    console.error(error);
    res.status(500).send("Ошибка сервера");
  }
});

module.exports = router;

// Добавить новый чай
router.post("/", async (req, res) => {
  try {
    const { name, cultivationPlace, image, description, userId } = req.body;
    if (!name || !cultivationPlace || !userId) {
      return res.status(400).json({ error: "Не все обязательные поля заполнены" });
    }

    const newTea = await Tea.create({ name, cultivationPlace, image, description, userId });
    res.status(201).json(newTea);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при добавлении чая" });
  }
});

// Удалить чай по ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const tea = await Tea.findByPk(id);

    if (!tea) {
      return res.status(404).json({ error: "Чай не найден" });
    }

    await tea.destroy();
    res.json({ message: "Чай удалён" });
  } catch (error) {
    res.status(500).json({ error: "Ошибка при удалении чая" });
  }
});

module.exports = router;
