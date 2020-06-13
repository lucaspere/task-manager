const express = require('express');
const route = new express.Router();

const User = require('../models/user');

route.delete('/users/:id', async (req, res) => {
    try {
 
       const userDeleted = await User.findByIdAndDelete(req.params.id);
 
       if(!userDeleted) {
          return res.status(404).send("Usuário não encontrado");
       }
 
       res.send(userDeleted);
    } catch(err) {
       res.status(500).send(err)
    }
 })
 route.get('/users', async (req, res) => {
 
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
 
 route.get('/users/:id', async (req, res) => {
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
 
 route.patch('/users/:id', async (req, res) => {
 
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
 
 route.post('/users', async (req, res) => {
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
 

module.exports = route