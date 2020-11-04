const express = require('express');

const petsRouter = require('./pets.routes')
const usersRouter = require('./users.routes')

const router = express.Router();

router.get('/', (req, res) => {
          res.status(200).send('Server running OK');
          console.log(req)
 });

router.use('/pets', petsRouter)

router.use('/users', usersRouter)

module.exports = router;