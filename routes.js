// routes.js

const express = require('express');
const router = express.Router(); // Create an Express router
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Routes /register
router.get('/register', (req, res) => {
  res.render('register');
});

// Gestionnaire de route POST pour /register
router.post('/register', async (req, res) => {
  const { user_name, user_firstname, user_email, user_passw } = req.body;

  try {
    // Enregistrement des données dans la base de données avec Prisma
    const utilisateur = await prisma.utilisateur.create({
      data: {
        user_name,
        user_firstname,
        user_email,
        user_passw,
      },
    });

    // Redirection vers une page de succès ou une autre page appropriée
    res.redirect('/login');
  } catch (error) {
    // Gestion des erreurs, vous pouvez envoyer un message d'erreur à la page d'inscription
    if (error.code == 'P2002') {
      res.render('register', { error: 'Cette adresse mail est déjà utilisée' });
    } else {
      res.render('register', { error: 'Une erreur s\'est produite lors de l\'inscription.' });
    }
  }
});

// Routes /login
router.get('/login', (req, res) => {
    res.render('login', { error: req.session.loginError }); // Pass login error to the view
  });
  
  router.post('/login', async (req, res) => {
    const { user_email, user_passw } = req.body;
  
    try {
      const utilisateur = await prisma.utilisateur.findUnique({
        where: {
            user_email,
        },
      });
  
      if (!utilisateur || utilisateur.user_passw !== user_passw) {
        req.session.loginError = 'Adresse email ou mot de passe incorrect';
        res.redirect('/login');
      } else {
        req.session.user = utilisateur;
        res.redirect('/dashboard'); // Redirect to the dashboard or another page
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.redirect('/login');
    }
  });
  
  router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      res.redirect('/login');
    });
  });
  

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
    res.render('dashboard', { user: req.session.user });
  });
  
  


// Export the router to use in other files
module.exports = router;
