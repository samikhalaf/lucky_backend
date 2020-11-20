const express = require('express');

const { isAuthenticated } = require('../middlewares/authentication.middleware');

// Importo modelo de usuario
const User = require('../models/User');

// Verifico que llega todo limpio
const cleanPayload = require('../utils/clean-payload');

// Middleware para subir las imágenes ↓
const imagesMiddleware = require('../middlewares/file.middleware');

// Validación de datos antes de escribirse en la DB
const validateData = (req, res, next) => {
  if (
    typeof req.body.username === 'undefined' ||
    typeof req.body.name === 'undefined' ||
    typeof req.body.email === 'undefined' ||
    typeof req.body.password === 'undefined' ||
    typeof req.body.eula === 'undefined' ||
    typeof req.body.city === 'undefined' ||
    typeof req.body.zipCode === 'undefined' ||
    typeof req.body.role === 'undefined'
  ) {
    res
      .status(400)
      .send('Faltan argumentos compa. No me estás enviando campos requeridos en la BBDD.');
    return;
  }

  next();
};

const router = express.Router();

//////////// GET PARA VER USUARIOS /////////////////////////////

router.get('/', [isAuthenticated], (req, res) => {
  User.find({})
    .then((user) => {
      return res.json(user);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

// router.get(
//   '/google',
//   passport.authenticate('google', {
//     scope: ['profile', 'email'],
//   }),
// );

//////////// GET PARA VER USUARIO (POR ID) /////////////////////////////

router.get('/:id', (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then((user) => {
      return res.json(user);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

//////////// PUT PARA ACTUALIZAR USUARIOS /////////////////////////////

router.put('/:id', [isAuthenticated, imagesMiddleware.upload.single('avatar')], (req, res) => {
  const id = req.params.id;

  const updateUser = cleanPayload({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    eula: req.body.eula,
    city: req.body.city,
    zipCode: req.body.zipCode,
    avatar: req.file ? `/uploads/${req.file.filename}` : null,
    position: req.body.position,
    formHistory: req.body.formHistory,
    favorites: req.body.formHistory,
    address: req.body.address,
    contactPhone: req.body.contactPhone,
    role: req.body.role,
  });

  User.findByIdAndUpdate(id, updateUser)
    .then((preStoredUser) => {
      res.status(200).send('Todo actualizado correctamente.');
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).send('Error al actualizar el usuario.');
    });
});

//////////// DELETE PARA BORRAR USUARIOS /////////////////////////////

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  User.findByIdAndDelete(id)
    .then(() => {
      return res.send('Usuario borrado con éxito');
    })
    .catch((error) => {
      console.log(error.message);
      return res.status(500).send('No se ha podido borrar el usuario');
    });
});

module.exports = router;
