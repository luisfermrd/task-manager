const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Manejar el registro de usuarios
const registerUser = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    // Si falta alguna variable, responde con un mensaje de error
    return res.status(400).json({ message: "Faltan datos de usuario" });
  }
  const { username, password } = req.body;

  // Verificar si el usuario ya existe en la base de datos
  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return res.status(400).json({ message: 'El nombre de usuario ya está en uso.' });
  }

  // Generar una sal para el hash
  const salt = await bcrypt.genSalt(10);

  // Hashear la contraseña con la sal generada
  const hashedPassword = await bcrypt.hash(password, salt);

  // Crear un nuevo usuario
  const newUser = new User({ username, password: hashedPassword });

  try {
    await newUser.save();
    return res.status(201).json({ message: 'Registro exitoso' });
  } catch (error) {
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Manejar el inicio de sesión de usuarios
const loginUser = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    // Si falta alguna variable, responde con un mensaje de error
    return res.status(400).json({ message: "Faltan datos de usuario" });
  }
  const { username, password } = req.body;

  // Buscar al usuario en la base de datos
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  // Comparar la contraseña ingresada con la contraseña almacenada
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ message: 'Contraseña incorrecta' });
  }

  // Generar un token de autenticación
  const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });

  //Se guarda el token en las cookie
  res.cookie("token", token, { httpOnly: true });

  return res.status(200).json({ token });
};

module.exports = {
  registerUser,
  loginUser,
};
