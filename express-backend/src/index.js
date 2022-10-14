const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const { auth } = require('express-oauth2-jwt-bearer');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'styles')));

// Middleware to check authentication of user
const checkJwt = auth({
  audience: "https://capstone_api/",
  issuerBaseURL: `https://dev-3r7miffl.us.auth0.com`,
});

// Middleware to check permissions/scope of the user
const checkPermissions = (permissions) => function (req, res, next) {
  var approbed = true;
  const userPermissions = req.auth.payload.permissions;
  permissions.forEach(permission => {
    if (!userPermissions.includes(permission)) { approbed = false }
  });
  approbed ? next() : res.status(401).send("Unauthorized");
}

// Public
app.get('/', function (req, res) {
  res.send('Public');
});

// Private
app.get('/private', checkJwt, function(req, res) {
  res.send("aqui andamos");
});

// Private with scope
app.get('/private_scope', checkJwt, checkPermissions(["example:permission", "example2: permission"]), function(req, res) {
  res.send('Endpoint Privado con Scope');
});

app.listen(3001, () => {
  console.log("El servidor está inicializado en el puerto 3001");
 });