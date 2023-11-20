const express = require('express');
const{ engine } = require('express-handlebars');
const { resolve } = require('path');

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home');
});


app.get('/users/:id', (req, res) => {
  res.render('home', { Donnee: req.params.id });
});

app.get('/bonjour', (req, res) => {
  let maDonnee = "Bonjour le monde !";
  let condition = false; // Cette valeur peut être définie dynamiquement
  res.render('home', { Donnee: maDonnee, condition: condition });
});

app.get('/tableau', (req, res) => {
  let monTableau = ["élément 1", "élément 2", "élément 3"];
  let condition = true;
  res.render('home', { tableau: monTableau, condition: condition});
});

app.listen(3010);