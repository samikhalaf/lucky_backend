const mongoose = require('mongoose');
const Pet = require('../models/Pet');

const Pets = require('../models/Pet');

const seedPets = [
  {
    name: 'bnito',
    specie: 'gato',
    race: 'común europeo',
    image: [
      'https://mascotas-static.hola.com/elminizoo/files/2014/04/20140121_001208.jpg',
      'https://pbs.twimg.com/media/BgIjHgfIQAARUZE.jpg',
      'https://i.pinimg.com/736x/0b/3b/1b/0b3b1b5c9c1df53afbad73ccf90604d7.jpg',
    ],
    age: 'joven',
    // "birthdate": "hace 6 años",
    sex: 'macho',
    size: 'mediano',
    weight: 4,
    history:
      'Recogido de una protectora de Alcorcón, originalmente se llamaba Kiwi. Ahora vive con Sami',
    personality: "'cariñoso', 'tranquilo'",
    vaccined: true,
    dewormed: true,
    healthy: true,
    sterilized: true,
    identified: true,
    microchip: false,
    comments:
      'Es un gato tranquilo y cariñoso. Solo maulla cuando le falta algo. Le gusta subirse a las personas y olerles el pelo',
    requeriments: '',
    fee: 0,
    delivery: false,
    // "association": { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
];

const uri =
  'mongodb+srv://lucky_app:RosendoChas1234@lucky-cluster.zjrqk.mongodb.net/luckydb?retryWrites=true&w=majority';
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })

  .then(async () => {
    console.log('Conectados a Mongo Atlas ⚡');

    // Aquí se guardan las cosas en la BBDD
    const petInstances = seedPets.map((pet) => {
      return new Pet(pet);
    });

    await Pet.insertMany(petInstances);
    console.log('Pets insertados en la BBDD');
  })
  .catch((error) => {
    console.log(`Error connecting to DB: ${error.message}`);
  }) // Este ultimo cacho es buena práctica pero no es necesario 100%
  .finally(() => {
    process.exit(0);
  });
