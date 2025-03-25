const verifyAdmin = async (req, res, next) => {
    try {

      if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({ 
          err: "Access denied. Admin privileges required."
        });
      }

      next();
    } catch (error) {
      res.status(500).json({ err: error.message });
    }
  };
  module.exports = verifyAdmin