const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const { demoFunction } = require('./test.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    // res.sendFile(path.join(__dirname, '/index.html'));
    const array = demoFunction();
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json))
    const response = 'hola' + array[0] + 'comom' + array[1];
    res.send(response);
  });

app.get('/login', function (req, res) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("client_id", "backendApp");
  urlencoded.append("username", "vchadwick");
  urlencoded.append("password", "Clave123");
  urlencoded.append("grant_type", "password");

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };

  fetch("http://localhost:8080/realms/appDemo/protocol/openid-connect/token", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
});

app.listen(3001, () => {
 console.log("El servidor está inicializado en el puerto 3001");
});