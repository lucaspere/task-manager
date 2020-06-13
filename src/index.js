const express = require('express');
const bodyParser = require('body-parser');
require('./db/mongoose');

const User = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/users', (req, res) => {
   const user = new User(req.body);

   user.save().then((result) => {
      res.status(201).send(result);
   }).catch((err) => {
      res.send(err)
   })
})

app.listen(port, () => {
   console.log("Server is up on port " + port);
});