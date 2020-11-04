const express = require('express');

const router = express.Router();

const pets = [
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
 

module.exports = router;