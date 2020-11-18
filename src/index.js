// Paquetes que utilizamos para levantar nuestra API REST
require('dotenv').config();
const express = require('express');
const passport = require('passport');
const morgan = require('morgan');
const cors = require('cors');
const cookieSession = require('cookie-session');

require('./config/db');
require('./config/passport');
const errorHandler = require('./config/error-handler');

// Referencia al router
const apiRoutes = require('./routes/index.routes');
const welcome = require('./utils/welcome');

// Configuracion de nuestra BBDD
require('./config/db');

// Arrancamos el server de express 🔥
const server = express();

// CORS pa que
server.use(
  cors({
    origin: true, // Easy cors origin validation for development purposes
    credentials: true,
  }),
);

// Middleware de express, obligatorio, viene en la documentacion
server.use(express.urlencoded({ extended: false }));

// Middleware que permite una ruta a contenido estático
server.use(express.static('public'));

// Este parsea todo el body de las peticiones HTTP en json
server.use(express.json());

server.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // milliseconds of a day
    keys: [process.env.COOKIE_KEY || 'express-auth-cookie'],
  }),
);

server.use(passport.initialize());
server.use(passport.session());

server.use(apiRoutes);

server.use(morgan('tiny'));

// Ultima red de seguridad para control de errores
server.use(errorHandler);

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  welcome();
  console.log('\x1b[36m%s\x1b[0m', `*** Conectados a http://localhost:${PORT}`);
});
