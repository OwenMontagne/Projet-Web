// session.js

const express_session = require('express-session');

// Configuration de la session
const sessionConfig = {
  secret: 'laclefsecretesupersecuriseesinoncavavousmoicavasuper',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 360000, // 1 heure
  },
};

const sessionMiddleware = express_session(sessionConfig);

module.exports = { sessionMiddleware };
