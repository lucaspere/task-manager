const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/tasks-manager-api', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true
})

const User = mongoose.model('User', {
   name: {
      type: String,
      required: true,
      trim: true
   },
   password: {
      type: String,
      required: true,
      trim: true,
      minLength: 7,
      validate(value) {
         if(value.toLowerCase().includes('password')) {
            throw new Error("Senha inválida!")
         }
      }
   },
   email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
         if(!validator.isEmail(value)) {
            throw new Error("Email inválido")
         }
      }
   },
   age: {
      type: Number,
      default: 0,
      validate(value) {
         if(value < 0) {
            throw new Error('Idade tem que ser um número positivo');
         }
      }
   },

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

const lucas = new User({
   name: 'Lucas Pereira',
   age: 23,
   email: 'lucas@gmail.com',
   password: '96465479'
})

const estudar = new Task({
   description: "Revisar os conceitos de nodejs apis",
   completed: false
})

lucas.save().then((result) => {
   console.log(result)
}).catch((erro) => {
   console.log(erro)
})

estudar.save().then((result) => {
   console.log(result)
}).catch((erro) => {
   console.log(erro)
})