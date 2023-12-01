const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/create-group', async (req, res) => {
  // code pour créer un groupe
});

router.post('/add-user-to-group', async (req, res) => {
  // code pour ajouter un utilisateur à un groupe
});

module.exports = router;