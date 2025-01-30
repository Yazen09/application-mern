const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Assure l'unicité de l'email
    lowercase: true, 
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // SOIT ADMIN SOIT USER 
    default: 'user',         // PAR DEFAUT UTILISATEUR NORMAL 
  },
}, {
  timestamps: true,
});


module.exports = User = model("user", UserSchema);