const express = require('express');
const router = express.Router();
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


  module.exports = router;
