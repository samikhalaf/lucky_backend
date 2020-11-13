const express = require('express');
const User = require('../models/User');
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

router.get('/', (req, res) => {
  User.find({})
    .then((user) => {
      return res.json(user);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

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

//////////// POST PARA REGISTRAR USUARIOS //////////////////////////////

router.post('/register', imagesMiddleware.upload.single('avatar'), (req, res) => {
  // Asignamos a cada valor su clave

  const userProps = {
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    eula: req.body.eula,
    city: req.body.city,
    zipCode: req.body.zipCode,
    avatar: '/uploads/' + req.file.filename,
    favorites: req.body.favorites,
    address: req.body.address,
    contactPhone: req.body.contactPhone,
    role: req.body.role,
  };

  const user = new User(userProps);

  // Aquí guardamos el usuario

  user
    .save()
    .then((storedUser) => {
      console.log('Guardado correctamente.');
      console.log(storedUser);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('Error al guardar el usuario: ');
      console.log(error.message);
    });
});

//////////// POST PARA LOGUEAR USUARIOS ///////////////////////////////

// router.post('/login', validateData, (req, res) => {
//   // Asignamos a cada valor su clave

//   const userProps = {
//     email: req.body.email,
//     password: req.body.password
//   };

//   const user = new User(userProps);

//   user
//     .save()
//     .then((storedUser) => {
//       console.log('Guardado correctamente.');
//       console.log(storedUser);
//       res.sendStatus(201);
//     })
//     .catch((error) => {
//       console.log('Error al guardar el usuario: ');
//       console.log(error.message);
//     });
// });

//////////// PUT PARA ACTUALIZAR USUARIOS /////////////////////////////

router.put('/:id', imagesMiddleware.upload.single('avatar'), (req, res) => {
  const id = req.params.id;

  const updateUser = cleanPayload({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    eula: req.body.eula,
    city: req.body.city,
    zipCode: req.body.zipCode,
    avatar: '/uploads/' + req.file.filename,
    formHistory: req.body.formHistory,
    favorites: req.body.formHistory,
    address: req.body.address,
    contactPhone: req.body.contactPhone,
    role: req.body.role,
  });

  User.findByIdAndUpdate(id, updateUser)
    .then((preStoredUser) => {
      console.log(preStoredUser);
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
