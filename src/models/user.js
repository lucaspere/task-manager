const mongoose = require('mongoose');
const validator = require('validator');

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

module.exports = User;