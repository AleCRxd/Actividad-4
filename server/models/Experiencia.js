const mongoose = require('mongoose');

const experienciaSchema = new mongoose.Schema({
  empresa: { type: String, required: true },
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  fechaInicio: { type: Date, required: true },
  fechaFin: { type: Date, required: true },
});

module.exports = mongoose.model('Experiencia', experienciaSchema);
