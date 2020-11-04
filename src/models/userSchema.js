const mongoose = require('mongoose');
 

const userSchema =  new mongoose.Schema(
    {
    username: { 
        type: String, 
        required: true, 
        minlegth: 3, 
        maxlength: 20 
        },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
    password: { type: String, required: true, minlength: 8 },
    city: { type: String, required: true, maxlength: 20 },
    zipCode: { type: String,required: true, minlength: 5, maxlength: 5 },
    avatar: { type: String },
    entry: { dateAdded: new Date() },
    
    address: { type: String, minlength: 5},
    contactPhone: { type: String, minlength: 9 },

    role: {type: String, enum: ['basic', 'association'], required: true},
    },
    {
    timestamps: true,
    }
) 


const User = mongoose.model('User', petsSchema);

module.exports = User;

