const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).json({ msg: 'No token, access denied' });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id : decoded.id,
    };
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};

module.exports = auth;