const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// Routes /login
router.get('/login', (req, res) => {
    res.render('login', { error: req.session.loginError }); // Passer l'erreur de connexion à la vue
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
        res.redirect('/dashboard'); // Rediriger vers la page de connexion
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

  module.exports = router;
