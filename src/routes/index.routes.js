const express = require('express');

const petsRouter = require('./pet.routes');
const usersRouter = require('./user.routes');
const testRouter = require('./test.routes');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('Server running OK');
  console.log(req);
});

router.use('/pets', petsRouter);
router.use('/users', usersRouter);
router.use('/test', testRouter);

module.exports = router;
