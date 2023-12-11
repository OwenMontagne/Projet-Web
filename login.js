const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


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
  
      //Dehash du mot de passe
      //const user_dehash_passw = await bcrypt.compare(user_passw, utilisateur.user_passw);
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

  module.exports = router;
