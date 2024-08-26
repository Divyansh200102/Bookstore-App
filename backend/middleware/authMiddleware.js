// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded JWT:', decoded); // Debug log
    req.user = await User.findById(decoded.user.id).select('-password');
    console.log('User from DB:', req.user); // Debug log
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized' });
  }
};

exports.admin = (req, res, next) => {
  console.log('User role:', req.user.role); // Debug log
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};