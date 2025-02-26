const express = require("express");
const router = express.Router();
const { User } = require("../../db/models");
const { refresh } = require("../configs/cookiesConfig");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
  const { email, name ,password } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: "Не указаны все данные" });
  }
  let user = await User.findOne({ where: { email } });
  if (user) {
    return res
      .status(400)
      .json({ message: "Такой пользователь уже зарегестрирован" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    email,
    name,
    password: hashedPassword,
  });

  const plainUser = newUser.get({ plain: true });
  delete plainUser.password;
  
  const { refreshToken } = generateToken({ user: plainUser });

  return res
    .cookie("refreshToken", refreshToken, refresh)
    .status(200)
    .json({ message: "Аутентификация прошла успешно", user: plainUser });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "данные не переданы" });
  }
  
  let user = await User.findOne({ where: { email } });
  if (!user) {
    return res
      .status(400)
      .json({ message: "Такой пользователь не зарегестрирован" });
  }

  const isCorrectPass = await bcrypt.compare(password, user.password);
  if (!isCorrectPass) {
    return res.status(400)
  .setHeader("Content-Type", "application/json")
  .json({ message: "Неверный пароль." });
  }

  const plainUser = user.get({ plain: true });
  delete plainUser.password;
  const { refreshToken } = generateToken({ user: plainUser });
  return res
  .cookie("refreshToken", refreshToken, refresh)
  .status(200).json({ message: "вход выполнен", user: plainUser });
});

router.get('/logout', (req, res) => {
    try {
      res.clearCookie('refreshToken').sendStatus(200);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

module.exports = router;
