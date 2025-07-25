// server/middleware/authMiddleware.js

import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user ={id:decoded.id} ;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid Token' });
  }
};
