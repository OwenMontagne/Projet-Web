const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/create-group', async (req, res) => {
  const { grp_name } = req.body;

  try {
    const groupe = await prisma.groupe.create({
      data: {
        grp_name,
      },
    });

    res.redirect('/dashboard');
  } catch (error) {
    // Gestion des erreurs, vous pouvez envoyer un message d'erreur à la page d'inscription
    if (error.code == 'P2002') {
      res.redirect('/dashboard', { error: 'Cette nom de groupe est déjà utilisée' });
    } else {
      res.redirect('/dashboard', { error: 'Une erreur s\'est produite lors de la création du groupe.' });
    }
  }
});

router.post('/add-user-to-group', async (req, res) => {
  // code pour ajouter un utilisateur à un groupe
});

module.exports = router;