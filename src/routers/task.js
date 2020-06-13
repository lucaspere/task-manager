const express = require('express');
const route = new express.Router();
const Task = require('../models/task');

route.delete('/tasks/:id', async (req, res) => {
    try {
 
       const taskDeleted = await Task.findByIdAndDelete(req.params.id);
 
       if(!taskDeleted) {
          return res.status(404).send("Tarefa não encontrado");
       }
 
       res.send(taskDeleted);
    } catch(err) {
       res.status(500).send(err)
    }
})

route.get('/tasks/:id', async (req, res) => {
 
    const _id = req.params.id;
 
    try {
       const task = await Task.findById(_id);
 
       if(!task) {
          return res.status(404).send("Tarefa não encontrada!");
       }
 
       res.status(200).send(task);
    } catch(err) {
       res.status(500).send(err)
    }
 
})
 
route.get('/tasks', async (req, res) => {
 
    try {
 
       const task = await Task.find({});
 
       if(!task) {
          return res.status(404).send("Não há tarefas registrados")
       }
       res.status(201).send(task);
    } catch(err) {
       res.status(400).send(err)
    }
})
 
route.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const propertyAllowes = ['description', 'completed'];
 
    const isAllowed = updates.every((item) => propertyAllowes.includes(item));
    if(!isAllowed) {
       return res.status(400).send("Propriedades não permitidas!");
    }
 
    try {
       const newTask = await Task.findByIdAndUpdate(req.params.id, req.body);
       
       if(!newTask) {
          return res.status(404).send("Tarefa não atualizada!");
       }
       
       res.send(newTask);
    } catch(err) {
       res.status(500).send(err)
    }
 
})

route.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
 
    try {
 
       await task.save();
 
       res.status(201).send(task);
    } catch(err) {
       res.status(400).send(err)
    }
})
 
module.exports = route