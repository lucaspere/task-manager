const express = require('express');
const bodyParser = require('body-parser');
require('./db/mongoose');
const useRoute = require('./routers/user');
const taskRoute = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(useRoute);
app.use(taskRoute);

app.listen(port, () => {
   console.log("Server is up on port " + port);
});