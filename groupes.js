const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/create-group', async (req, res) => {
  const { grp_name } = req.body;

  try {
    // Récupérer l'ID de l'utilisateur de la session
    const userId = req.session.user.user_id;

    // Créer le groupe
    const groupe = await prisma.groupe.create({
      data: {
        grp_name,
      },
    });

    // Associer l'utilisateur de la session au groupe dans la table Appartenance_User_Grp
    await prisma.appartenance_User_Grp.create({
      data: {
        grp_id: groupe.grp_id,
        user_id: userId,
      },
    });

    res.redirect('/dashboard');
  } catch (error) {
    // Gestion des erreurs, vous pouvez envoyer un message d'erreur à la page d'inscription
    if (error.code == 'P2002') {
      res.redirect('/dashboard', { error: 'Ce nom de groupe est déjà utilisé' });
    } else {
      res.redirect('/dashboard', { error: 'Une erreur s\'est produite lors de la création du groupe.' });
    }
  }
});



// Middleware to check if the user belongs to the group
const userBelongsToGroup = async (req, res, next) => {
  try {
    if (!req.session.user) {
      // If the user is not logged in, redirect to login
      return res.redirect('/login');
    }

    const userId = req.session.user.user_id;
    const groupId = parseInt(req.params.id, 10);
    const userBelongsToGroup = await prisma.appartenance_User_Grp.findMany({
      where: {
        user_id: userId,
        grp_id: groupId,
      },
    });

    if (userBelongsToGroup.length > 0) {
      next();
    } else {
      res.status(403).send('Vous n\'appartenez pas à ce groupe, ou celui-ci est inexistant.');
    }
  } catch (error) {
    console.error('Error checking group membership:', error);
    res.status(500).send('Une erreur s\'est produite lors de la vérification de l\'appartenance au groupe.');
  }
};

router.get('/groupe/:id', userBelongsToGroup, async (req, res) => {
  let groupId = parseInt(req.params.id, 10);
  const group = await prisma.groupe.findUnique({
    where: {
      grp_id: groupId,
    },
  });

  if (group) {
    res.render('groupe', { group });
  } else {
    res.status(404).send('Groupe not found');
  }
});


router.post('/add_user_to_grp/', userBelongsToGroup, async (req, res) => {
  const { user_email } = req.body;

  try {
    // Retrieve user by email
    const userToAdd = await prisma.utilisateur.findUnique({
      where: {
        user_email,
      },
    });

    if (userToAdd) {
      // Check if the user is already a member of the group
      const existingMembership = await prisma.appartenance_User_Grp.findFirst({
        where: {
          user_id: userToAdd.user_id,
          grp_id: groupId,
        },
      });

      if (existingMembership) {
        res.status(400).send('L\'utilisateur est déjà membre de ce groupe.');
      } else {
        // Add user to the group
        await prisma.appartenance_User_Grp.create({
          data: {
            user_id: userToAdd.user_id,
            grp_id: groupId,
          },
        });

        res.redirect(`/groupe/${groupId}`);
      }
    } else {
      res.status(404).send('Utilisateur non trouvé.');
    }
  } catch (error) {
    console.error('Error adding user to group:', error);
    res.status(500).send('Une erreur s\'est produite lors de l\'ajout de l\'utilisateur au groupe.');
  }
});

module.exports = router;