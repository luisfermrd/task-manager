const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

// Ruta para cerrar la sesión de un usuario y revocar el token
router.post('/logout', (req, res) => {
  res.clearCookie('token'); // Esto elimina la cookie de la sesión
  res.status(200).json({ message: 'Sesión cerrada exitosamente' });
});

//Renderiza las vistas
router.get('/singin', (req, res) => {
  res.render('register');
});
router.get('/access', (req, res) => {
  res.render('login');
});

router.get('/', (req, res) => {
  res.render('login');
});

module.exports = router;
