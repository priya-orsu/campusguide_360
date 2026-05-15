const jwt = require('jsonwebtoken');

// Main Authentication Middleware

const authMiddleware = (req, res, next) => {

  try {

    // Get Authorization Header

    const authHeader = req.headers.authorization;

    // Check Header

    if (!authHeader || !authHeader.startsWith('Bearer ')) {

      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    // Extract Token

    const token = authHeader.split(' ')[1];

    // Verify Token

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Save User Data

    req.user = decoded;

    next();

  } catch (error) {

    console.error('JWT Error:', error.message);

    // Token Expired

    if (error.name === 'TokenExpiredError') {

      return res.status(401).json({
        success: false,
        message: 'Token expired'
      });
    }

    // Invalid Token

    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
};

// Role-Based Middleware

const authorizeRoles = (...roles) => {

  return (req, res, next) => {

    if (!req.user || !roles.includes(req.user.role)) {

      return res.status(403).json({
        success: false,
        message: 'Access forbidden'
      });
    }

    next();
  };
};

module.exports = {
  authMiddleware,
  authorizeRoles
};