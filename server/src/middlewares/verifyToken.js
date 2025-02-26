const jwt = require('jsonwebtoken');

const verifyAccessToken = (req, res, next) => {
  try {
    // * Из заголовков по ключу authorization получаем строку вида "Bearer, myToken"
    // * сплитим её и достаём элемент myToken
    const accessToken = req.headers.authorization.split(' ')[1];
    const { user } = jwt.verify(accessToken, process.env.ACCESS_TOKEN);
    // * записываем user, которого получили из jwt.verify в res.locals, чтобы он был во всех ручках
    res.locals.user = user;
    next();
  } catch (error) {
    console.error('Invalid refresh token', error);
    res.status(401).end();
  }
};

const verifyRefreshToken = (req, res, next) => {
  try {
    const { refreshToken } = req.cookies; // по ключу рефреш значение из cookie
    const { user } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
    res.locals.user = user;
    next();
  } catch (error) {
    console.error('Invalid refresh token', error);
    res.clearCookie('refreshToken').sendStatus(401);
  }
};

module.exports = {
  verifyRefreshToken,
  verifyAccessToken,
};
