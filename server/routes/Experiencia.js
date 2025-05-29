const express = require('express');
const router = express.Router();
const Experiencia = require('../models/Experiencia');

router.get('/', async (req, res) => {
  try {
    const experiencias = await Experiencia.find();
    res.json(experiencias);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener las experiencias' });
  }
});

router.post('/', async (req, res) => {
  try {
    const nuevaExperiencia = new Experiencia(req.body);
    const experienciaGuardada = await nuevaExperiencia.save();
    res.status(201).json(experienciaGuardada);
  } catch (err) {
    res.status(400).json({ error: 'Error al crear la experiencia' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const experienciaActualizada = await Experiencia.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(experienciaActualizada);
  } catch (err) {
    res.status(400).json({ error: 'Error al actualizar la experiencia' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Experiencia.findByIdAndDelete(req.params.id);
    res.json({ message: 'Experiencia eliminada' });
  } catch (err) {
    res.status(400).json({ error: 'Error al eliminar la experiencia' });
  }
});

module.exports = router;