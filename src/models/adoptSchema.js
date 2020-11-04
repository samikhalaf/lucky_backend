// YA SI ESO YA

const mongoose = require('mongoose');
 

// ficha-adopcion {
//     _id
//     datos personales {
//         name
//         email
//         telefono
//         dni
//     },
//     direccion {
//         direccion
//         cp
//         ciudad
//         eula
//         },
//     Sobre las mascotas {
//         Tienes otros animales S/N
//             Cuales
//             Se llevan bien con otros animales?
//         Por que has elegido adoptar (opc)
//         Conoces las necesidades del animal
//         conoces sus gastos
//         conoces su alimentacion
//         },
//     familia y hogar {
//         Donde vives? S/n
//         Vives de alquiler
//         Tu casero permite animales
//         Crees que te mudaras pronto?
//         Tiene jardin?
//         Vives con otras personas
//         Estan todos de acuerdo con la adopcion
//         Estas de acuerdo con que visitemos tu casa?
//     }
//     date
//     estado de la adopcion


// const userSchema =  new mongoose.Schema(
//     {
//     username: { 
//         type: String, 
//         required: true, 
//         minlegth: 3, 
//         maxlength: 20 
//         },
//     email: {
//         type: String,
//         trim: true,
//         lowercase: true,
//         unique: true,
//         required: 'Email address is required',
//         validate: [validateEmail, 'Please fill a valid email address'],
//         match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
//         },
//     password: { type: String, required: true, minlength: 8 },
//     city: { type: String, required: true, maxlength: 20 },
//     zipCode: { type: String,required: true, minlength: 5, maxlength: 5 },
//     avatar: { type: String },
    
//     address: { type: String, minlength: 5},
//     contactPhone: { type: String, minlength: 9 },

//     role: {type: String, enum: ['basic', 'association'], required: true},
//     },
//     {
//     timestamps: true,
//     }
// ) 


const Adopt = mongoose.model('Adopt', adoptSchema);

module.exports = Adopt;

