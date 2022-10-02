const express = require("express");
const app = express();

app.get('/', function (req, res) {
    res.send('[GET] Saludos desde express');
  });

app.listen(3001, () => {
 console.log("El servidor está inicializado en el puerto 3001");
});