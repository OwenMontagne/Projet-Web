// routes.js

const express = require('express');
const router = express.Router(); // Create an Express router
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


  // Middleware pour vérifier si l'utilisateur est authentifié
  const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
      // L'utilisateur est authentifié, passer au middleware ou à la route suivante
      next();
    } else {
      // Utilisateur non authentifié, redirection vers la page de connexion
      res.redirect('/login');
    }
  };
  
  // Routes
  router.get('/', isAuthenticated, (req, res) => {
    res.redirect('/dashboard', { user: req.session.user });
  });

  
//Utiliser le login.js
router.use(require('./Routes/login.js'));

//Utiliser le register.js
router.use(require('./Routes/register.js'));

//Utiliser le grouproute.js
router.use(require('./Routes/groupes.js'));

//Utiliser le dashboard.js
router.use(require('./Routes/dashboard.js'));

//Utilser le rappel.js
router.use(require('./Routes/rappel.js'));
  


// Export the router to use in other files
module.exports = router;
