import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  projectUrl: { type: String, required: true },
  tags: [{ type: String }],
  category: {
    type: String,
    enum: ['web', 'blockchain', 'tool'],
    default: 'web'
  },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual para 'id' para mantener compatibilidad con el frontend actual
projectSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
