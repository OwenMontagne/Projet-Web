// routes.js

const express = require('express');
const router = express.Router(); // Create an Express router
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

  // Middleware to check if the user is authenticated
  const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
      // User is authenticated, proceed to the next middleware or route
      next();
    } else {
      // User is not authenticated, redirect to login page
      res.redirect('/login');
    }
  };
  
  // Routes
  router.get('/', isAuthenticated, (req, res) => {
    // If the middleware passes, the user is authenticated
    // Render the dashboard or any other page you want to display for authenticated users
    res.redirect('/dashboard', { user: req.session.user });
  });

  router.get('/dashboard', (req, res) => {
    // Render your dashboard here
    res.render('dashboard', { user: req.session.user });
  });
  
//Utiliser le login.js
router.use(require('./login.js'));

//Utiliser le register.js
router.use(require('./register.js'));

//Utiliser le grouproute.js
router.use(require('./grouproute.js'));
  


// Export the router to use in other files
module.exports = router;