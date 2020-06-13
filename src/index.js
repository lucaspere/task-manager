const express = require('express');
const bodyParser = require('body-parser');
require('./db/mongoose');

const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/users', async (req, res) => {

   try {
      const user = await User.find({});

      if(!user) {
         return res.status(404).send("Não há usuários registrados")
      }

      res.status(200).send(user);
   } catch(err) {
      res.status(500).send(err)
   }
})

app.get('/users/:id', async (req, res) => {
   const  _id = req.params.id;

   try {
      const user = await User.findById(_id);

      if(!user) {
         return res.status(404).send("Usuário não encontrado!")
      }

      res.status(200).send(user);
   } catch(err) {
      res.status(500).send(err)
   }

   // User.findById(_id).then((result) => {
   //    if(!result) {
   //       return res.status(404).send("Usuário não encontrado");
   //    }

   //    res.status(200).send(result)
   // }).catch((err) => {
   //    res.status(500).send(err)
   // })
})

app.patch('/users/:id', async (req, res) => {

   const updates = Object.keys(req.body);
   const propertyAllowes = ['name', 'email', 'password', "age"];

   const isAllowed = updates.every((item) => propertyAllowes.includes(item));
   if(!isAllowed) {
      return res.status(400).send("Propriedade não permitida!");
   }

   try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true});

      if(!user) {
         return res.status(404).send()
      }

      res.send(user);
   } catch(err) {
      res.status(400).send(err);
   }
})

app.post('/users', async (req, res) => {
   const user = new User(req.body);

   try {

      await user.save();

      res.status(201).send(user);
   } catch(err) {
      res.status(400).send(err)
   }
   // user.save().then((result) => {
   //    res.status(201).send(result);
   // }).catch((err) => {
   //    res.status(400).send(err)
   // })
})

app.get('/tasks/:id', async (req, res) => {

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

   // Task.findById(_id).then((task) => {
      
   //    if(!task) {
   //       return res.status(404).send("Tarefa não encontrada!");
   //    }

   //    res.status(200).send(task);
   // }).catch((error) => {
   //    res.status(500).send(error)
   // })
})

app.get('/tasks', async (req, res) => {

   try {

      const task = await Task.find({});

      if(!task) {
         return res.status(404).send("Não há tarefas registrados")
      }
      res.status(201).send(task);
   } catch(err) {
      res.status(400).send(err)
   }

   // User.find({}).then((result) => {
      
   //    if(!result) {
   //       return res.status(404).send("Nenhuma tarefa encontrada!");
   //    }

   //    res.status(200).send(result);
   // }).catch((error) => {
   //    res.status(500).send(error)
   // })
})

app.patch('/tasks/:id', async (req, res) => {
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
app.post('/tasks', async (req, res) => {
   const task = new Task(req.body);

   try {

      await task.save();

      res.status(201).send(task);
   } catch(err) {
      res.status(400).send(err)
   }

   // task.save().then((result) => {
   //    res.status(201).send(result)
   // }).catch((err) => {
   //    res.status(400).send(err)
   // })
})

app.listen(port, () => {
   console.log("Server is up on port " + port);
});