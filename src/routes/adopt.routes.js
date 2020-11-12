const express = require('express');
const Adopt = require('../models/Adopt');
const cleanPayload = require('../utils/clean-payload');

// Validación de datos antes de escribirse en la DB

const validateData = (req, res, next) => {
  if (
    typeof req.body.name === 'undefined' ||
    typeof req.body.surname === 'undefined' ||
    typeof req.body.email === 'undefined' ||
    typeof req.body.contactPhone === 'undefined' ||
    typeof req.body.dni === 'undefined' ||
    typeof req.body.address === 'undefined' ||
    typeof req.body.zipCode === 'undefined' ||
    typeof req.body.city === 'undefined' ||
    typeof req.body.eula === 'undefined' ||
    typeof req.body.morePetsInHome === 'undefined' ||
    typeof req.body.whyAdopting === 'undefined' ||
    typeof req.body.petNeeds === 'undefined' ||
    typeof req.body.petExpenses === 'undefined' ||
    typeof req.body.petFeeding === 'undefined' ||
    typeof req.body.garden === 'undefined' ||
    typeof req.body.movingSoon === 'undefined' ||
    typeof req.body.flatmates === 'undefined' ||
    typeof req.body.flatmatesOK === 'undefined' ||
    typeof req.body.pet === 'undefined'
  ) {
    res
      .status(400)
      .send('Faltan argumentos compa. No me estás enviando campos requeridos en la BBDD.');
    return;
  }

  next();
};

const router = express.Router();

//////////// GET PARA VER USUARIOS \\\\\\\\\\\\\\\\\\\\\\\\\\

router.get('/', (req, res) => {
  Adopt.find({})
    .populate({
      // deep populate
      path: 'petID',
      populate: 'association',
    })

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

router.post('/', validateData, (req, res) => {
  // Asignamos a cada valor su clave

  const adoptProps = {
    name: req.body.name,
    surname: req.body.name,
    email: req.body.email,
    contactPhone: req.body.contactPhone,
    dni: req.body.dni,
    address: req.body.address,
    zipCode: req.body.zipCode,
    city: req.body.city,
    eula: req.body.eula,
    morePetsInHome: req.body.morePetsInHome,
    whichPetsInHome: req.body.whichPetsInHome,
    areTheyFriendly: req.body.areTheyFriendly,
    whyAdopting: req.body.whyAdopting,
    petNeeds: req.body.petNeeds,
    petExpenses: req.body.petExpenses,
    petFeeding: req.body.petFeeding,
    homeType: req.body.homeType,
    rentHome: req.body.rentHome,
    landlordOK: req.body.landlordOK,
    garden: req.body.garden,
    movingSoon: req.body.movingSoon,
    flatmates: req.body.flatmates,
    flatmatesOK: req.body.flatmatesOK,
    visit: req.body.visit,
    adoptionStatus: req.body.adoptionStatus,
    pet: req.body.pet,
  };

  const adopt = new Adopt(adoptProps);

  // Aquí guardamos la mascota

  adopt
    .save()
    .then((storedAdopt) => {
      console.log('Guardado correctamente.');
      console.log(storedAdopt);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('Error al guardar formulario de adopción: ');
      console.log(error.message);
    });
});

//////////// PUT PARA ACTUALIZAR USUARIOS \\\\\\\\\\\\\\\\\\\\

router.put('/id', (req, res) => {
  const id = req.params.id;

  const updateAdopt = cleanPayload({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    dni: req.body.dni,
    address: req.body.address,
    zipCode: req.body.zipCode,
    city: req.body.city,
    eula: req.body.eula,
    morePetsInHome: req.body.morePetsInHome,
    whichPetsInHome: req.body.whichPetsInHome,
    areTheyFriendly: req.body.areTheyFriendly,
    whyAdopting: req.body.whyAdopting,
    petNeeds: req.body.petNeeds,
    petExpenses: req.body.petExpenses,
    petFeeding: req.body.petFeeding,
    homeType: req.body.homeType,
    rentHome: req.body.rentHome,
    landlordOK: req.body.landlordOK,
    garden: req.body.garden,
    movingSoon: req.body.movingSoon,
    flatmates: req.body.flatmates,
    flatmatesOK: req.body.flatmatesOK,
    visit: req.body.visit,
    adoptionStatus: req.body.adoptionStatus,
  });

  Adopt.findByIdAndUpdate(id, updateAdopt)
    .then((preStoredAdopt) => {
      console.log(preStoredAdopt);
      res.status(200).send('Todo actualizado correctamente.');
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).send('Error al actualizar el formulario de adopción.');
    });
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
