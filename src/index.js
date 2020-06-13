const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/users', (req, res) => {
   console.log(req.body)
   res.send('Testando')
})

app.listen(port, () => {
   console.log("Server is up on port " + port);
});