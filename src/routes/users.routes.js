const express = require('express');

const router = express.Router();

const users = [
    {
        name: "judit",
        species: "persona",
        legs: 2
    },
    {
        name: "edu",
        species: "persona",
        legs: 2
    },
    {
        name: "rosa",
        species: "valenciana",
        legs: 2
    }
]

router.get('/', (req, res) => {
          res.status(200).send(users);
 });
 

module.exports = router;