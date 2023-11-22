const mongoose = require('mongoose');

// URL de conexión a tu base de datos MongoDB
const dbURL = 'mongodb://localhost:27017/gestor-tareas';

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión a la base de datos exitosa');
  })
  .catch((err) => {
    console.error('Error al conectar a la base de datos:', err);
  });
