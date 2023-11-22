const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Otros campos que desees para el usuario, como nombre, correo, etc.
});

const User = mongoose.model('User', userSchema);

module.exports = User;
