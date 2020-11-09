const express = require('express');
const Adopt = require('../models/Adopt')
const router = express.Router();


//////////// GET PARA VER USUARIOS \\\\\\\\\\\\\\\\\\\\\\\\\\

router.get('/', (req, res) => {
  Adopt.find({})
    .then((adopt) => {
      return res.json(adopt);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

//////////// GET PARA VER USUARIO (POR ID) \\\\\\\\\\\\\\\\\\

router.get('/:id', (req, res) => {
  const id = req.params.id;

  Adopt.findById(id)
    .then((adopt) => {
      return res.json(adopt);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

//////////// POST PARA AÑADIR USUARIOS \\\\\\\\\\\\\\\\\\\\\\

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

  const adppt = new Adopt();

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

  adopt
    .save()
    .then((storedAdopt) => {
      console.log('Guardado correctamente.');
      console.log(storedAdopt);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('Error al guardar formulario de adopción: ');
      console.log(error.message);
    });
});

//////////// PUT PARA ACTUALIZAR USUARIOS \\\\\\\\\\\\\\\\\\\\

router.put('/id', (req, res) => {
  const id = req.params.id;

  const updateAdopt = {
    adoptname: req.body.adoptname,
    email: req.body.email,
    password: req.body.password,
    eula: req.body.eula,
    city: req.body.city,
    zipCode: req.body.zipCode,
    role: req.body.role,
  };

  Adopt.findByIdAndUpdate(
    id,
    updateAdopt
      .then((preStoredAdopt) => {
        console.log(preStoredAdopt);
        res.status(201).send('Todo actualizado correctamente.');
      })
      .catch((error) => {
        console.log(error.message);
        res.status(500).send('Error al actualizar el formulario de adopción.');
      }),
  );
});

//////////// DELETE PARA BORRAR USUARIOS \\\\\\\\\\\\\\\\\\\\\

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  Adopt.findByIdAndDelete(id)
    .then(() => {
      return res.send('Formulario de adopción borrado con éxito');
    })
    .catch((error) => {
      console.log(error.message);
      return res.status(500).send('No se ha podido formulario de adopción');
    });
});

module.exports = router;
