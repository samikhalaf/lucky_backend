const express = require('express');
const passport = require('passport');

const router = express.Router();

//////////// POST PARA REGISTRAR USUARIOS //////////////////////////////
router.post('/register', passport.authenticate('register'), (req, res) =>
  res.status(200).json({ data: req.user }),
);

//////////// POST PARA LOGUEAR USUARIOS ///////////////////////////////
router.post('/login', passport.authenticate('login'), (req, res) =>
  res.status(200).json({ data: req.user }),
);

//////////// GET PARA CERRAR SESION /////////////////////////////
router.get('/logout', (req, res) => {
  // Logout using the passport added logout method
  req.logout();

  // Send user to check if it's really logged out
  res.status(200).json({ data: 'OK' });
});

module.export = router;
