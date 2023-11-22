const Task = require('../models/task'); //Modelo de la tabla Tareas

// Controlador para crear una nueva tarea
const createTask = async (req, res) => {
    try {
        const { title, description, category, dueDate } = req.body;
        const createdBy = req.user.userId; // ID del usuario actualmente autenticado

        const task = new Task({
            title,
            description,
            category,
            dueDate,
            createdBy,
        });

        const newTask = await task.save();

        return res.status(201).json({ newTask, message: 'Tarea registrada' });
    } catch (error) {
        return res.status(500).json({ message: 'No se pudo crear la tarea' });
    }
};

// Controlador para actualizar una tarea existente
const updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const updates = req.body;

        const updatedTask = await Task.findByIdAndUpdate(taskId, updates, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        return res.status(200).json({ updatedTask, message: 'Tarea actualizada' });
    } catch (error) {
        return res.status(500).json({ message: 'No se pudo actualizar la tarea', error });
    }
};

// Controlador para marcar una tarea como completada
const completeTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        const updatedTask = await Task.findByIdAndUpdate(taskId, { completed: true }, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        return res.status(200).json({ updatedTask, message: 'Se marco la tarea como completa' });
    } catch (error) {
        return res.status(500).json({ message: 'No se pudo marcar la tarea como completada' });
    }
};

// Controlador para obtener todas las tareas del usuario logueado
const getAllTasks = async (req, res) => {
    try {
        const createdBy = req.user.userId; // ID del usuario actualmente autenticado
        const tasks = await Task.find({ createdBy });
        /* 
                if (tasks.length === 0) {
                    return res.status(200).json([]); // Respuesta vacía cuando no se encuentran tareas
                } */

        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).json({ error: 'No se pudieron obtener las tareas' });
    }
};

// Controlador para eliminar una tarea
const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        return res.status(200).json({ message: 'Tarea eliminada' });
    } catch (error) {
        return res.status(500).json({ message: 'No se pudo eliminar la tarea' });
    }
};

// Controlador para obtener tareas por categoría
const getTasksByCategory = async (req, res) => {
    try {
        const createdBy = req.user.userId; // ID del usuario actualmente autenticado
        const category = req.params.category;

        const tasks = await Task.find({ createdBy, category });

        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).json({ message: 'No se pudieron obtener las tareas por categoría' });
    }
};

// Método para obtener todas las tareas ordenadas por categoría de mayor a menor
const getAllTasksSortedByCategory = async (req, res) => {
    try {
        const createdBy = req.user.userId; // ID del usuario actualmente autenticado
        const tasks = await Task.find({ createdBy }).sort({ category: 1 }); // Ordenar de mayor a menor por la categoría

        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).json({ message: 'No se pudieron obtener las tareas' });
    }
};

// Controlador para obtener una tarea en particular
const getTaskById = async (req, res) => {
    try {
        const taskId = req.params.id;
        const createdBy = req.user.userId; // ID del usuario actualmente autenticado

        const task = await Task.findOne({ _id: taskId, createdBy });

        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        return res.status(200).json(task);
    } catch (error) {
        return res.status(500).json({ message: 'No se pudo obtener la tarea' });
    }
};

module.exports = {
    createTask,
    updateTask,
    completeTask,
    getAllTasks,
    deleteTask,
    getTasksByCategory,
    getAllTasksSortedByCategory,
    getTaskById,
};

