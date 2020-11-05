const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlegth: 2,
      maxlength: 20,
    },
    specie: {
      type: String,
      enum: [
        "perro",
        "gato",
        "cobaya",
        "conejo",
        "pez",
        "ave",
        "reptil",
        "mamifero pequeño",
        "insectos",
        "hurón",
        "anfibio",
      ],
    },
    race: { type: String, required: true },
    img: { type: Array, required: true },
    age: { type: String, enum: ["cría", "joven", "adulto", "anciano"] },
    birthdate: { type: Date },
    sex: { type: String, enum: ["macho", "hembra"], required: true },
    size: {
      type: String,
      enum: ["pequeño", "mediano", "grande"],
      required: true,
    },
    weight: { type: String },
    history: { type: String, minlength: 30, maxlength: 280 },
    personality: {
      type: String,
      enum: [
        "juguetón",
        "timido",
        "cariñoso",
        "miedoso",
        "inquieto",
        "tranquilo",
        "familiar",
        "sociable con otros animales",
      ],
    },
    vaccined: { type: Boolean, required: true },
    dewormed: { type: Boolean, required: true },
    healthy: { type: Boolean, required: true },
    sterilized: { type: Boolean, required: true },
    identified: { type: Boolean, required: true },
    microchip: { type: Boolean },
    comments: { type: String, maxlength: 140 },
    requeriments: { type: String },
    fee: { type: String },
    envío: { type: String, required: true },
    entry: { dateAdded: new Date() },
    association: { type: mongoose.Schema.Type.ObjectId, ref: "User" }, //PREGUNTAR
  },
  {
    timestamps: true,
  }
);

const Pets = mongoose.model("Pets", petsSchema);

module.exports = Pets;


// POPULATE PARA METERLO EN EL GET DE LA PETICION

// app.get("/libros", function (req, res) {
//   Libro.find({}, function (err, libros) {
//     Autor.populate(libros, { path: "autor" }, function (err, libros) {
//       res.status(200).send(libros);
//     });
//   });
// });
