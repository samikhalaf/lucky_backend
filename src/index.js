// Paquetes que utilizamos para levantar nuestra API REST
const express = require('express');
const morgan = require('morgan');

// Referencia al router
const apiRoutes = require('./routes/index.routes');

// Configuracion de nuestra BBDD
require('./config/db');

// Arrancamos el server de express 🔥
const server = express();

// Middleware de express, obligatorio, viene en la documentacion
server.use(express.urlencoded({ extended: false }));

// Este parsea todo el body de las peticiones HTTP en json
server.use(express.json());

server.use(apiRoutes);

server.use(morgan('tiny'));

// Ultima red de seguridad para control de errores
server.use((err, req, res, next) => {
  console.log('Entramos en el control de errores');
  return res.status(err.status || 500).json(err.message || 'Unexpected error');
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Conectados a http://localhost:${PORT}`);
});
