const express = require('express');
const Pet = require('../models/Pet');

const router = express.Router();

const pets = [ // CUTRERIO
    {
        name: "Sami",
        species: "langosta",
        legs: 12
    },
    {
        name: "Alfredo",
        species: "Pulpo",
        legs: 8
    },
    {
        name: "Rosendo",
        species: "Rosendo",
        legs: 1
    }
]

router.get('/', (req, res) => {
          res.status(200).send(pets);
          console.log(req)
 });

router.post('/', (req, res) => {
    console.log('Body', req.body);
    pets.push(req.body) // CUTRADA SUPREME

    // const newPet = new Pet({ name: req.body.name });
    // newPet.save()
    // .then(() => {

    //     res.sendStatus(201); // 201 es que ok y creado
    // })
    // .catch( (error) => {
    //     console.log(error.message)
    // });
})
 

module.exports = router;