const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  nombre: { type: String },
  edad: { type: Number },
});

const Estudiantes = mongoose.model('info', schema);

module.exports = Estudiantes;
