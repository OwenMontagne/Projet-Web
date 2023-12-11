// index.js

const express = require('express');
const { engine } = require('express-handlebars');

const bodyParser = require('body-parser');

const { sessionMiddleware } = require('./session.js'); // Import session middleware

const app = express();



// Configuration du middleware body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Configuration d'Express Handlebars comme moteur de modèle
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Use session middleware
app.use(sessionMiddleware);

// Import the router
const routes = require('./routes.js');

// Use the router in your Express app
app.use('/', routes);

//Passage des fichiers statiques
app.use(express.static('STYLES'));

// Démarrer le serveur
const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
