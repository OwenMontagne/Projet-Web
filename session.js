// session.js

const express_session = require('express-session');

// Session configuration
const sessionConfig = {
  secret: 'your-secret-key', // Change this to a secure secret key
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600000, // Session expires in 1 hour
  },
};

// Middleware to manage user sessions
const sessionMiddleware = express_session(sessionConfig);

module.exports = { sessionMiddleware };
