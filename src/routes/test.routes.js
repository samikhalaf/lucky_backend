const express = require('express');

const Test = require('../models/Test');
// const fileMiddlewares = require('../middlewares/file.middleware')

const validateData = (req, res, next) => {
  // Comprobación de que los campos requeridos están en la petición

  console.log('Soy un middleware que comprueba que todo entre OK');

  if (!req.body.name || !req.body.email || !req.body.ultimaCaca) {
    res
      .status(400)
      .send('Te faltan argumentos compa. No me estás enviando campos requeridos en la BBDD.');
    return;
  }
  next();
};

const router = express.Router();

//////////// GET PARA VER MASCOTAS /////////////////////////////

router.get('/', (req, res) => {
  Test.find({})
    .then((tests) => {
      return res.json(tests);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

//////////// GET PARA VER MASCOTA (POR ID) /////////////////////////////

router.get('/:id', (req, res) => {
  const id = req.params.id;

  Test.findById(id)
    .then((test) => {
      return res.json(test);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

//////////// POST PARA AÑADIR MASCOTAS /////////////////////////////

router.post('/', validateData, (req, res) => {
  const test = new Test();

  test.name = req.body.name;
  test.specie = req.body.specie;
  test.race = req.body.race;

  // Recogemos del body sus propiedades
  // Se podria hacer con un map pero paso de añadir complejidad

  // Aquí guardamos la mascota

  test
    .save()
    .then((storedTest) => {
      console.log('Guardado correctamente.');
      console.log(storedTest);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('ERROR al guardar la mascota: ');
      console.log(error.message);
    });
});

//////////// PUT PARA ACTUALIZAR MASCOTAS /////////////////////////////

router.put('/id', (req, res) => {
  const id = req.params.id;

  const updateTest = {
    name: req.body.name,
    email: req.body.email,
    ultimaCaca: req.body.ultimaCaca,
  };

  Test.findByIdAndUpdate(
    id,
    updateTest
      .then((preStoredTest) => {
        res.status(201).send('Todo actualizado correctamente.');
      })
      .catch((error) => {
        console.log(error.message);
        res.status(500).send('Error al actualizar la mascota.');
      }),
  );
});

//////////// DELETE PARA BORRAR MASCOTAS /////////////////////////////

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  Test.findByIdAndDelete(id)
    .then(() => {
      return res.send('Mascota borrada con éxito');
    })
    .catch((error) => {
      console.log(error.message);
      return res.status(500).send('No se ha podido borrar la mascota');
    });
});

module.exports = router;
