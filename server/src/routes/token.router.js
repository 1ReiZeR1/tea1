const { verifyRefreshToken } = require('../middlewares/verifyToken');
const generateToken = require('../utils/generateToken');
const { refresh } = require('../configs/cookiesConfig');
const { User } = require('../../db/models'); 


const router = require('express').Router();

router.get('/refresh', verifyRefreshToken, async (req, res) => {
  
  try {
    // * в ф-ию generateToken передаём объект { user: res.locals.user } в качестве полезной нагрузки (payload)
    // * generateToken возвращает объект { accessToken, refreshToken }
    const { accessToken, refreshToken } = generateToken({
      user: res.locals.user,
    });

    const car = await User.findOne({
      where: { id: res.locals.user.id },
    });

    // * создаём и отсылаем куку на клиент с ключом refreshToken вместе с json { user: res.locals.user, accessToken }
    // ! кука с refreshToken, json с accessToken
    res
      .cookie('refreshToken', refreshToken, refresh)
      .json({ user: {...res.locals.user, car}, accessToken });

  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
