// dashboard.js

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/dashboard', async (req, res) => {
  try {
    if (!req.session.user) {
      // If the user is not authenticated, redirect to login
      return res.redirect('/login');
    }

    // Récupérer l'ID de l'utilisateur de la session
    const userId = req.session.user.user_id;
    
    // Récupérer les groupes auxquels l'utilisateur appartient
    const userGroupMemberships = await prisma.appartenance_User_Grp.findMany({
      where: {
        user_id: userId,
      },
      include: {
        groupe: true,
      },
    });

    res.render('dashboard', { userGroupMemberships, user: req.session.user });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.redirect('/login');
  }
});

module.exports = router;
