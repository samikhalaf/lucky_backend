const express = require('express');

const router = express.Router();

const users = [ // CUTRERIO
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

 router.post('/', (req, res) => {
    console.log('Body', req.body);
    users.push(req.body); //CUTRADA SUPREME
    res.sendStatus(200);
})
 

module.exports = router;