const express = require('express');
const Pet = require('../models/Pet');

// Validación de datos antes de escribirse en la DB

const validateData = (req, res, next) => {
  if (
    typeof req.body.name === 'undefined' ||
    typeof req.body.specie === 'undefined' ||
    typeof req.body.race === 'undefined' ||
    typeof req.body.image === 'undefined' ||
    typeof req.body.sex === 'undefined' ||
    typeof req.body.size === 'undefined' ||
    typeof req.body.vaccined === 'undefined' ||
    typeof req.body.dewormed === 'undefined' ||
    typeof req.body.healthy === 'undefined' ||
    typeof req.body.sterilized === 'undefined' ||
    typeof req.body.identified === 'undefined' ||
    typeof req.body.microchip === 'undefined' ||
    typeof req.body.delivery === 'undefined'
  ) {
    res
      .status(400)
      .send('Faltan argumentos compa. No me estás enviando campos requeridos en la BBDD.');
    return;
  }

  next();
};

const router = express.Router();

//////////// GET PARA VER MASCOTAS /////////////////////////////

router.get('/', (req, res) => {
  Pet.find({})
    .populate('association')
    .then((pets) => {
      return res.json(pets);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

//////////// GET PARA VER MASCOTA (POR ID) /////////////////////////////

router.get('/:id', (req, res) => {
  const id = req.params.id;

  Pet.findById(id)
    .populate('association')
    .then((pet) => {
      return res.json(pet);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

//////////// POST PARA AÑADIR MASCOTAS /////////////////////////////

router.post('/', validateData, (req, res) => {
  // Asignamos a cada valor su clave

  const petProps = {
    name: req.body.name,
    specie: req.body.specie,
    race: req.body.race,
    image: req.body.image,
    age: req.body.age,
    birthday: req.body.birthday,
    sex: req.body.sex,
    size: req.body.size,
    weight: req.body.weight,
    history: req.body.history,
    personality: req.body.personality,
    vaccined: req.body.vaccined,
    dewormed: req.body.dewormed,
    healthy: req.body.healthy,
    sterilized: req.body.sterilized,
    identified: req.body.identified,
    microchip: req.body.microchip,
    comments: req.body.comments,
    requeriments: req.body.requeriments,
    fee: req.body.fee,
    delivery: req.body.delivery,
    association: req.body.association,
  };

  const pet = new Pet(petProps);

  // Aquí guardamos la mascota

  pet
    .save()
    .then((storedPet) => {
      console.log('Guardado correctamente.');
      console.log(storedPet);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('Error al guardar la mascota: ');
      console.log(error.message);
    });
});

//////////// PUT PARA ACTUALIZAR MASCOTAS /////////////////////////////

router.put('/:id', (req, res) => {
  const id = req.params.id;

  const updatePet = {
    name: req.body.name,
    specie: req.body.specie,
    race: req.body.race,
    image: req.body.image,
    sex: req.body.sex,
    size: req.body.size,
    vaccined: req.body.vaccined,
    dewormed: req.body.dewormed,
    healthy: req.body.healthy,
    sterilized: req.body.sterilized,
    identified: req.body.identified,
    microchip: req.body.microchip,
    delivery: req.body.delivery,
  };

  Pet.findByIdAndUpdate(id, updatePet)
    .then((preStoredPet) => {
      console.log(preStoredPet);
      res.status(200).send('Todo actualizado correctamente.');
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).send('Error al actualizar la mascota.');
    });
});

//////////// DELETE PARA BORRAR MASCOTAS /////////////////////////////

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  Pet.findByIdAndDelete(id)
    .then(() => {
      return res.send('Mascota borrada con éxito');
    })
    .catch((error) => {
      console.log(error.message);
      return res.status(500).send('No se ha podido borrar la mascota');
    });
});

module.exports = router;
