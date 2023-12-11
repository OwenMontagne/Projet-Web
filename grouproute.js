// routes.js

const express = require('express');
const router = express.Router(); // Create an Express router
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



// Gestionnaire de route POST pour /dashboard
router.post('/creategroupe', async (req, res) => {
  const { group_name } = req.body;

  try {
    // Enregistrement des données dans la base de données avec Prisma
    const Groupe = await prisma.groupe.create({
      data: {
       group_name
      },
    });

  } catch (error) {
    // Gestion des erreurs, vous pouvez envoyer un message d'erreur à la page d'inscription
    if (error.code == 'P2002') {
      res.render('/', { error: 'Ce nom de groupe est déja utiliser' });
    } else {
      res.render('/', { error: 'Une erreur s\'est produite lors de l\'inscription.' });
    }
  }
});