// index.js

const express = require('express');
const session = require('express-session');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser'); // Ajout du middleware body-parser
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

// Configuration du middleware body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Configuration d'Express Handlebars comme moteur de modèle
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');



// Routes
app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/register', (req, res) => {
  res.render('register');
});

// Gestionnaire de route POST pour /register
app.post('/register', async (req, res) => {
  const { nom, prenom, email, motDePasse } = req.body;

  try {
    // Enregistrement des données dans la base de données avec Prisma
    const utilisateur = await prisma.utilisateur.create({
      data: {
        nom,
        prenom,
        email,
        motDePasse,
      },
    });

    // Redirection vers une page de succès ou une autre page appropriée
    res.redirect('/login');
  } catch (error) {
    // Gestion des erreurs, vous pouvez envoyer un message d'erreur à la page d'inscription
    if (error.code == 'P2002')
    {
      res.render('register', { error: 'Cette adresse mail est déjà utilisée'});
    }
    else
    {
      res.render('register', { error: 'Une erreur s\'est produite lors de l\'inscription.' });
    }
  }
});

// Démarrer le serveur
const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
