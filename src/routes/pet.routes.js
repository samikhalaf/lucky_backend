const express = require('express');
const Pet = require('../models/Pet');

const router = express.Router();

//////////// GET PARA VER MASCOTAS /////////////////////////////

router.get('/', (req, res) => {
  Pet.find({})
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
    .then((pet) => {
      return res.json(pet);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

//////////// POST PARA AÑADIR MASCOTAS /////////////////////////////

router.post('/', (req, res) => {
  // Comprobación de que los campos requeridos están en la petición

  if (
    !req.body.name ||
    !req.body.specie ||
    !req.body.race ||
    !req.body.image ||
    !req.body.sex ||
    !req.body.size ||
    !req.body.vaccined ||
    !req.body.dewormed ||
    !req.body.healthy ||
    !req.body.sterilized ||
    !req.body.identified ||
    !req.body.microchip ||
    !req.body.delivery
  ) {
    res
      .status(400)
      .send('Te faltan argumentos compa. No me estás enviando campos requeridos en la BBDD.');
  }
  
  const pet = new Pet();

  // Recogemos del body sus propiedades
  // Se podria hacer con un map pero paso de añadir complejidad

  pet.name = req.body.name;
  pet.specie = req.body.specie;
  pet.race = req.body.race;
  pet.image = req.body.image;
  pet.age = req.body.age;
  pet.birthday = req.body.birthday;
  pet.sex = req.body.sex;
  pet.size = req.body.size;
  pet.weight = req.body.weight;
  pet.history = req.body.history;
  pet.personality = req.body.personality;
  pet.vaccined = req.body.vaccined;
  pet.dewormed = req.body.dewormed;
  pet.healthy = req.body.healthy;
  pet.sterilized = req.body.sterilized;
  pet.identified = req.body.identified;
  pet.microchip = req.body.microchip;
  pet.comments = req.body.comments;
  pet.requeriments = req.body.requeriments;
  pet.fee = req.body.fee;
  pet.delivery = req.body.delivery;
  pet.association = req.body.association;

  // Aquí guardamos la mascota

  pet
    .save()
    .then((storedPet) => {
      console.log('Guardado correctamente.');
      console.log(storedPet);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('ERROR al guardar la mascota: ');
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

  Pet.findByIdAndUpdate(
    id,
    updatePet
      .then((preStoredPet) => {
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
