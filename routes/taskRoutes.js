const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');


// Middleware de autenticación: Asegura que el usuario esté autenticado antes de acceder a estas rutas
router.use(authMiddleware.requireAuth);


//Renderiza las vistas
router.get('/', (req, res) => {
  res.render('taskList');
});

router.get('/home', (req, res) => {
  res.render('taskList');
});

router.get('/new', (req, res) => {
  res.render('taskForm');
});

router.get('/edit/:taskId', (req, res) => {
  const taskId = req.params.taskId;
  res.render('editTask', { taskId });
});



// Ruta para obtener todas las tareas del usuario logueado
router.get('/tasks', taskController.getAllTasks);

// Ruta para crear una nueva tarea
router.post('/tasks', taskController.createTask);

// Ruta para obtener una tarea en particular por su ID
router.get('/tasks/:id', taskController.getTaskById);

// Ruta para actualizar una tarea
router.put('/tasks/:id', taskController.updateTask);

// Ruta para marcar una tarea como completada
router.patch('/tasks/:id/complete', taskController.completeTask);

// Ruta para eliminar una tarea
router.delete('/tasks/:id', taskController.deleteTask);

// Ruta para obtener tareas ordenadas por categoría
router.get('/tasks/order/category', taskController.getAllTasksSortedByCategory);

// Ruta para obtener tareas por categoría
router.get('/tasks/category/:category', taskController.getTasksByCategory);

module.exports = router;
