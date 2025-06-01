const express = require('express');
const router = express.Router();
const Experiencia = require('../models/Experiencia'); 

router.get('/', async (req, res) => {
  try {
    const experiencias = await Experiencia.find();
    res.json(experiencias);
  } catch (err) {
    console.error('Error al obtener experiencias:', err);
    res.status(500).json({ error: 'Error al obtener experiencias' });
  }
});

router.post('/', async (req, res) => {
  try {
    const nuevaExperiencia = new Experiencia(req.body);
    const experienciaGuardada = await nuevaExperiencia.save();
    res.status(201).json(experienciaGuardada);
  } catch (err) {
    console.error('Error al guardar experiencia:', err);
    res.status(500).json({ error: 'Error al guardar experiencia' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const experienciaActualizada = await Experiencia.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(experienciaActualizada);
  } catch (err) {
    console.error('Error al actualizar experiencia:', err);
    res.status(500).json({ error: 'Error al actualizar experiencia' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Experiencia.findByIdAndDelete(req.params.id);
    res.json({ message: 'Experiencia eliminada' });
  } catch (err) {
    console.error('Error al eliminar experiencia:', err);
    res.status(500).json({ error: 'Error al eliminar experiencia' });
  }
});

module.exports = router;
