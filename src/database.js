const mongoose = require('mongoose');
const URI = 'mongodb+srv://elkin:12345@mern-task.womyq.mongodb.net/tareas?retryWrites=true&w=majority';

mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", function() {
  console.log('DB Conectada !!!')
});

module.exports = mongoose;