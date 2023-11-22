const express = require('express'); //Importar express
const db = require('./db'); // Importa la configuración de la base de datos
const path = require('path'); // Importa el módulo 'path'
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");

const app = express();

// Usar cookie-parser
app.use(cookieParser());

app.use(bodyParser.json()); // Para analizar datos JSON en el cuerpo de la solicitud
app.use(bodyParser.urlencoded({ extended: true })); // Para analizar datos codificados en el cuerpo de la solicitud

// Configurar el motor de vistas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Hacer publica la carpeta public para los estilos
app.use(express.static(path.join(__dirname, 'public')));


// Definir rutas para usuarios y tareas 
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use('/users', userRoutes); 
app.use('/tasks', taskRoutes);


app.listen(3000, () => {
  console.log(`La aplicación está escuchando en el puerto 3000`);
});
