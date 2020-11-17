const express = require('express');

const petsRouter = require('./pet.routes');
const usersRouter = require('./user.routes');
const adoptRouter = require('./adopt.routes');
const authRouter = require('./auth.routes');

const router = express.Router();

router.get('/', (req, res) => {
  res
    .status(200)
    .send(
      '<body style="height: 100vh; width: 100vw; display:flex; flex-direction: column; justify-content: center; align-items: center"><h1>¡Eyyy que pasa!</h1> <p>Esta API REST va fina.</p><p>Pruébame poniendo ~/pets o ~/users en la url</p></body>',
    );
  console.log(req);
});

router.use('/pets', petsRouter);
router.use('/users', usersRouter);
router.use('/adopt', adoptRouter);
router.use('/auth', authRouter);

// Middleware para rutas inexistentes (NO VA)
// server.use('/*', (req, res, next) => {
//   const error = new Error('404. Esa ruta no existe');
//   error.status = 404;
//   next(error);
// });

module.exports = router;
