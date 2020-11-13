const express = require('express');

const petsRouter = require('./pet.routes');
const usersRouter = require('./user.routes');
const adoptRouter = require('./adopt.routes');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('Server running OK');
  console.log(req);
});

router.use('/pets', petsRouter);
router.use('/users', usersRouter);
router.use('/adopt', adoptRouter);

// Middleware para rutas inexistentes (NO VA)
// server.use('/*', (req, res, next) => {
//   const error = new Error('404. Esa ruta no existe');
//   error.status = 404;
//   next(error);
// });

module.exports = router;
