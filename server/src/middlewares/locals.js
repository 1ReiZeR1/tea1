const { Entrie } = require('../../db/models');

async function getLatestEntrie(req, res, next) {
  try {
    const { title, text } = await Entrie.findOne({ order: [['createdAt', 'DESC']] })
    res.locals.entrie = { title, text }
    next()
  } catch (error) {
    console.log(error)
    res.status(500).send(error.message)
  }
}

module.exports = getLatestEntrie
