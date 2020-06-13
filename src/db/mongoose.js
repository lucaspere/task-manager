const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/tasks-manager-api', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true
})


const Task = mongoose.model('Task', {
   description: {
      type: String,
      trim: true,
      required: true
   },
   completed: {
      type: Boolean,
      default: false
   }
})

const estudar = new Task({
   description: "Revisar os conceitos de nodejs apis",
   completed: false
})
