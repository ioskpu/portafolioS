import express from 'express';
import Project from '../models/Project.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// GET todos los proyectos (público)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener proyectos' });
  }
});

// GET proyecto por ID (público)
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Proyecto no encontrado' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener proyecto' });
  }
});

// POST crear proyecto (protegido)
router.post('/', auth, async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear proyecto' });
  }
});

// PUT actualizar proyecto (protegido)
router.put('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!project) return res.status(404).json({ error: 'Proyecto no encontrado' });
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar proyecto' });
  }
});

// DELETE eliminar proyecto (protegido)
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ error: 'Proyecto no encontrado' });
    res.json({ message: 'Proyecto eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar proyecto' });
  }
});

export default router;
