const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'styles')));

// Authorization config
const checkJwt = auth({
  // Probar con allowedAudiences si es que no funciona
  audience: "https://capstone_api/",
  issuerBaseURL: `https://dev-3r7miffl.us.auth0.com`,
});

// Public
app.get('/', function (req, res) {
  res.send('Public');
});

// Private
app.get('/private', checkJwt, function(req, res) {
  res.send('Endpoint Privado');
});

// Scope
const checkScopes = requiredScopes(['example:permission']);

// Private with scope
app.get('/private_scope', checkJwt, checkScopes, function(req, res) {
  res.send('Endpoint Privado con Scope');
});

app.listen(3001, () => {
  console.log("El servidor está inicializado en el puerto 3001");
 });