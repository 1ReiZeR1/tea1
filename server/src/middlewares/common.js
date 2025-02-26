function getTime(req, res, next) {
    console.log('\x1b[33m%s\x1b[0m', new Date().toLocaleString())
    next()
  }
  
  function removeHeader(req, res, next) {
    res.removeHeader('X-Powered-By')
    next()
  }
  
  function checkId(req, res, next) {
    const { id } = req.params
    if (Number(id)) {
      next()
    } else {
      res.status(400).send(`
        <h1>Неверный тип данных для id</h1>
        <a href='/'>На главную</a>
      `)
    }
  }
  
  function checkBody(req, res, next) {
    const { title, text } = req.body
    if (title && text) {
      next()
    } else {
      res.status(409).send('Нет необходимых данных для изменений')
    }
  }
  
  module.exports = { getTime, removeHeader, checkId, checkBody }
  