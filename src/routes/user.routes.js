const express = require('express');

const router = express.Router();

const users = [
  // CUTRERIO
  {
    name: 'judit',
    species: 'persona',
    legs: 2,
  },
  {
    name: 'edu',
    species: 'persona',
    legs: 2,
  },
  {
    name: 'rosa',
    species: 'valenciana',
    legs: 2,
  },
];

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

//////////// POST PARA AÑADIR USUARIOS /////////////////////////////

router.post('/', (req, res) => {
  // Comprobación de que los campos requeridos están en la petición

  if (
    !req.body.username ||
    !req.body.email ||
    !req.body.password ||
    !req.body.eula ||
    !req.body.city ||
    !req.body.zipCode ||
    !req.body.role
  ) {
    res
      .status(400)
      .send('Te faltan argumentos compa. No me estás enviando campos requeridos en la BBDD.');
  }

  const user = new User();

  // Recogemos del body sus propiedades
  // Se podria hacer con un map pero paso de añadir complejidad

  user.username = req.body.username;
  user.email = req.body.email;
  user.password = req.body.password;
  user.eula = req.body.eula;
  user.city = req.body.city;
  user.zipCode = req.body.zipCode;
  user.avatar = req.body.avatar;
  user.address = req.body.address;
  user.contactPhone = req.body.contactPhone;
  user.role = req.body.role;

  // Aquí guardamos el usuario

  user
    .save()
    .then((storedUser) => {
      console.log('Guardado correctamente.');
      console.log(storedUser);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('Error al guardar el usuario: ');
      console.log(error.message);
    });
});

//////////// PUT PARA ACTUALIZAR USUARIOS /////////////////////////////

router.put('/id', (req, res) => {
  const id = req.params.id;

  const updateUser = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    eula: req.body.eula,
    city: req.body.city,
    zipCode: req.body.zipCode,
    role: req.body.role,
  };

  User.findByIdAndUpdate(
    id,
    updateUser
      .then((preStoredUser) => {
        console.log(preStoredUser);
        res.status(201).send('Todo actualizado correctamente.');
      })
      .catch((error) => {
        console.log(error.message);
        res.status(500).send('Error al actualizar la mascota.');
      }),
  );
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
