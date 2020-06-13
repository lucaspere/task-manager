const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/tasks-manager-api', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true
})

const User = mongoose.model('User', {
   name: {
      type: String
   },
   age: {
      type: Number
   }
})


const lucas = new User({ name: "Lucas Pereira", age: 23 })

lucas.save().then((result) => {
   console.log(result)
}).catch((err) => {
   console.log(err)
})