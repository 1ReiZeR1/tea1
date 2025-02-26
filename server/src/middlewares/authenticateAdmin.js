const authenticateAdmin = (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ success: false, message: "Доступ запрещён" });
    }
    next();
  };
  
  module.exports = { authenticateAdmin };