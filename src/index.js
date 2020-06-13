const express = require('express');
const bodyParser = require('body-parser');
require('./db/mongoose');

const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/users', (req, res) => {

   User.find({}).then((result) => {
      res.status(200).send(result)
   }).catch((err) => {
      res.status(500).send(err)
   })
})

app.get('/users/:id', (req, res) => {
   const  _id = req.params.id;
console.log(req.params)
   User.findById(_id).then((result) => {
      if(!result) {
         return res.status(404).send("Usuário não encontrado");
      }

      res.status(200).send(result)
   }).catch((err) => {
      res.status(500).send(err)
   })
})

app.post('/users', (req, res) => {
   const user = new User(req.body);

   user.save().then((result) => {
      res.status(201).send(result);
   }).catch((err) => {
      res.status(400).send(err)
   })
})

app.get('/tasks/:id', (req, res) => {

   const _id = req.params.id;

   User.findById(_id).then((task) => {
      
      if(!task) {
         return res.status(404).send("Tarefa não encontrada!");
      }

      res.status(200).send(task);
   }).catch((error) => {
      res.status(500).send(error)
   })
})

app.get('/tasks', (req, res) => {

   User.find({}).then((result) => {
      
      if(!result) {
         return res.status(404).send("Nenhuma tarefa encontrada!");
      }

      res.status(200).send(result);
   }).catch((error) => {
      res.status(500).send(error)
   })
})

app.post('/tasks', (req, res) => {
   const task = new Task(req.body);

   task.save().then((result) => {
      res.status(201).send(result)
   }).catch((err) => {
      res.status(400).send(err)
   })
})

app.listen(port, () => {
   console.log("Server is up on port " + port);
});