const express = require('express');
const passport = require('passport');

const router = express.Router();

const { upload } = require('../middlewares/file.middleware');

//////////// GET PARA COMPROBAR QUE ESTAMOS LOGEADOS //////////////////////////////
router.get('/is-logged', (req, res) => {
  if (req.user) {
    res.status(200).json({ data: true });
  } else {
    res.status(401).json({ data: false });
  }
});

//////////// POST PARA REGISTRAR USUARIOS //////////////////////////////
router.post('/register', [upload.single('avatar'), passport.authenticate('register')], (req, res) =>
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

module.exports = router;
