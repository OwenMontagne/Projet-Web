const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Gestions des rappels
router.post('/add_reminder/:groupId', async (req, res) => {
    const { rappel_name, rappel_description, rappel_due_date, rappel_color } = req.body;
    const groupId = parseInt(req.params.groupId, 10);
  
    try {
      // Ajouter le rappel au groupe
      await prisma.rappel.create({
        data: {
          rappel_name,
          description: rappel_description,
          due_date: new Date(rappel_due_date),
          color: rappel_color,
          grp_id: groupId,
        },
      });
  
      res.redirect(`/groupe/${groupId}`);
    } catch (error) {
      console.error('Error adding reminder:', error);
      res.status(500).send('Une erreur s\'est produite lors de l\'ajout du rappel.');
    }
  });
  
  // Supprimer un rappel
  router.post('/delete_reminder/:reminderId/', async (req, res) => {
    const reminderId = parseInt(req.params.reminderId, 10);
  
    try {
      // Supprimer le rappel du groupe
      await prisma.rappel.delete({
        where: {
          rappel_id: reminderId,
        },
      });
  
      res.redirect(`/dashboard`); // Redirige vers la page du groupe, ajustez si nécessaire
    } catch (error) {
      console.error('Error deleting reminder:', error);
      res.status(500).send('Une erreur s\'est produite lors de la suppression du rappel.');
    }
  });



    module.exports = router;