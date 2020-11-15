// Paquetes que utilizamos para levantar nuestra API REST
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// Referencia al router
const apiRoutes = require('./routes/index.routes');

// Configuracion de nuestra BBDD
require('./config/db');

// Arrancamos el server de express 🔥
const server = express();

// CORS pa que
server.use(cors());

// Middleware de express, obligatorio, viene en la documentacion
server.use(express.urlencoded({ extended: false }));

// Middleware que permite una ruta a contenido estático
server.use(express.static('public'));

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
  console.log('Welcome to the');
  console.log('██▓     █    ██  ▄████▄   ██ ▄█▀▓██   ██▓');
  console.log('▒██░    ▓██  ▒██░▒▓█    ▄ ▓███▄░   ▒██ ██░');
  console.log('▒██░    ▓▓█  ░██░▒▓▓▄ ▄██▒▓██ █▄   ░ ▐██▓░');
  console.log('░██████▒▒▒█████▓ ▒ ▓███▀ ░▒██▒ █▄  ░ ██▒▓░');
  console.log('░ ░ ▒  ░░░▒░ ░ ░   ░  ▒   ░ ░▒ ▒░ ▓██ ░▒░ ');
  console.log('  ░ ░    ░░░ ░ ░ ░        ░ ░░ ░  ▒ ▒ ░░  ');
  console.log('    ░  ░   ░     ░ ░      ░  ░    ░ ░     ');
  console.log('                 ░                ░ ░      API REST');
  console.log(`*** Conectados a http://localhost:${PORT} ***`);
});
