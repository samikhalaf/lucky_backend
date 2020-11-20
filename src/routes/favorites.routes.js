const express = require('express');
const Favorites = require('../models/Favorites');
const cleanPayload = require('../utils/clean-payload');

// Validación de datos antes de escribirse en la DB

const validateData = (req, res, next) => {
  if (typeof req.body.user === 'undefined' || typeof req.body.pet === 'undefined') {
    res
      .status(400)
      .send('Faltan argumentos compa. No me estás enviando campos requeridos en la BBDD.');
    return;
  }
  next();
};

const router = express.Router();

//////////// GET PARA VER FAVORITOS \\\\\\\\\\\\\\\\\\\\\\\\\\

router.get('/', (req, res) => {
  Favorites.find({})
    // .populate({
    //   // deep populate
    //   path: 'petID',
    //   populate: 'association',
    // })
    .then((favorite) => {
      return res.json(favorite);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

//////////// GET PARA VER EL FAVORITO (POR ID) \\\\\\\\\\\\\\\\\\

router.get('/:id', (req, res) => {
  const id = req.params.id;

  Favorites.findById(id)
    .then((favorite) => {
      return res.json(favorite);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

//////////// POST PARA AÑADIR FAVORITOS \\\\\\\\\\\\\\\\\\\\\\

router.post('/', validateData, (req, res) => {
  // Asignamos a cada valor su clave

  const favoriteProps = {
    user: req.body.user,
    pet: req.body.pet,
  };

  const favorite = new Favorites(favoriteProps);

  // Aquí guardamos la mascota

  favorite
    .save()
    .then((storedFavorite) => {
      console.log('Guardado correctamente.');
      console.log(storedFavorite);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('Error al guardar favorito: ');
      console.log(error.message);
    });
});

//////////// PUT PARA ACTUALIZAR USUARIOS \\\\\\\\\\\\\\\\\\\\

router.put('/id', (req, res) => {
  const id = req.params.id;

  const updateFavorite = cleanPayload({
    user: req.body.user,
    pet: req.body.pet,
  });

  Favorites.findByIdAndUpdate(id, updateFavorite)
    .then((preStoredFavorite) => {
      console.log(preStoredFavorite);
      res.status(200).send('Todo actualizado correctamente.');
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).send('Error al actualizar el favorito.');
    });
});

//////////// DELETE PARA BORRAR FAVORITOS \\\\\\\\\\\\\\\\\\\\\

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  Favorites.findByIdAndDelete(id)
    .then(() => {
      return res.send('Favorito borrado con éxito');
    })
    .catch((error) => {
      console.log(error.message);
      return res.status(500).send('No se ha podido favorito');
    });
});

module.exports = router;
