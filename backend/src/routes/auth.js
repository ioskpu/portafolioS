import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// Login
router.post('/login', (req, res) => {
  const { password } = req.body;
  
  if (password === ADMIN_PASSWORD) {
    const token = jwt.sign(
      { role: 'admin' },
      process.env.JWT_SECRET || 'secret-key',
      { expiresIn: '7d' }
    );
    
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Contraseña incorrecta' });
  }
});

// Verificar token
router.post('/verify', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ valid: false });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret-key');
    res.json({ valid: true, user: decoded });
  } catch (error) {
    res.status(401).json({ valid: false });
  }
});

export default router;
