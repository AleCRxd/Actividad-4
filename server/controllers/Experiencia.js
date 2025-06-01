const Experiencia = require('../models/Experiencia');

exports.obtenerExperiencias = async (req, res) => {
  try {
    const experiencias = await Experiencia.find();
    res.status(200).json(experiencias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerExperiencia = async (req, res) => {
  try {
    const experiencia = await Experiencia.findById(req.params.id);
    if (!experiencia) {
      return res.status(404).json({ message: 'Experiencia no encontrada' });
    }
    res.status(200).json(experiencia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.crearExperiencia = async (req, res) => {
  try {
    const nuevaExperiencia = new Experiencia(req.body);
    const experienciaGuardada = await nuevaExperiencia.save();
    res.status(201).json(experienciaGuardada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.actualizarExperiencia = async (req, res) => {
  try {
    const experienciaActualizada = await Experiencia.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!experienciaActualizada) {
      return res.status(404).json({ message: 'Experiencia no encontrada' });
    }
    res.status(200).json(experienciaActualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.eliminarExperiencia = async (req, res) => {
  try {
    const experienciaEliminada = await Experiencia.findByIdAndDelete(req.params.id);
    if (!experienciaEliminada) {
      return res.status(404).json({ message: 'Experiencia no encontrada' });
    }
    res.status(200).json({ message: 'Experiencia eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
