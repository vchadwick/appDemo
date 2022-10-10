const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'styles')));

// Authorization middleware.
const checkJwt = auth({
  audience: 'YOUR_API_IDENTIFIER',
  issuerBaseURL: `https://YOUR_DOMAIN/`,
});

// Landing page
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});


// This route doesn't need authentication
app.get('/api/public', function(req, res) {
  res.json({
    message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
  });
});

// This route needs authentication
app.get('/api/private', checkJwt, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated to see this.'
  });
});

app.listen(3001, () => {
  console.log("El servidor está inicializado en el puerto 3001");
 });