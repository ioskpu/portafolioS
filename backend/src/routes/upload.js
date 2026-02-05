import express from 'express';
import { v2 as cloudinary } from 'cloudinary';
import auth from '../middleware/auth.js';

const router = express.Router();

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Subir imagen (protegido)
router.post('/', auth, async (req, res) => {
  try {
    const { image } = req.body; // Base64 string
    
    if (!image) {
      return res.status(400).json({ error: 'No se proporcionó imagen' });
    }

    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: 'portfolio-projects',
      transformation: [
        { width: 1200, height: 630, crop: 'fill' },
        { quality: 'auto' },
        { fetch_format: 'auto' }
      ]
    });

    res.json({
      url: uploadResponse.secure_url,
      publicId: uploadResponse.public_id
    });
  } catch (error) {
    console.error('Error subiendo a Cloudinary:', error);
    res.status(500).json({ error: 'Error al subir imagen' });
  }
});

// Eliminar imagen (protegido)
router.delete('/:publicId', auth, async (req, res) => {
  try {
    await cloudinary.uploader.destroy(req.params.publicId);
    res.json({ message: 'Imagen eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar imagen' });
  }
});

export default router;
