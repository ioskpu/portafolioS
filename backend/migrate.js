// Ejecutar una vez para migrar proyectos existentes a MongoDB 
import mongoose from 'mongoose'; 
import Project from './src/models/Project.js'; 
import fs from 'fs'; 
import dotenv from 'dotenv';

dotenv.config();

const migrate = async () => {
  try {
    console.log('⏳ Conectando a MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI); 
    console.log('✅ Conectado a MongoDB');

    const projectsData = JSON.parse(fs.readFileSync('projects-backup.json', 'utf8')); 
    console.log(`📦 Cargados ${projectsData.length} proyectos desde el backup`);

    await Project.deleteMany({}); // Limpiar colección 
    console.log('🗑️ Colección de proyectos limpiada');

    await Project.insertMany(projectsData); 
    console.log('✅ Datos migrados exitosamente'); 
    process.exit(0); 
  } catch (error) { 
    console.error('❌ Error migrando datos:', error); 
    process.exit(1); 
  } 
};

migrate();
