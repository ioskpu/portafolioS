import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Project } from '../../types/project';
import { X, Save, Search, ImageIcon } from 'lucide-react';
import { FloatingLabelInput } from '../ui/FloatingLabelInput';
import ImageUploader from './ImageUploader';

const projectSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  imageUrl: z.string().url('Debe ser una URL válida o subir una imagen'),
  projectUrl: z.string().url('Debe ser una URL válida'),
  category: z.enum(['web', 'blockchain', 'tool']),
  tags: z.string(),
  featured: z.boolean(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  project?: Project | null;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const SUGGESTED_TAGS = ['React', 'TypeScript', 'Solidity', 'Node.js', 'Ethereum', 'Vue', 'Next.js', 'Tailwind', 'GraphQL', 'Ethers.js', 'Web3'];

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onSubmit, onCancel }) => {
  const [tagInput, setTagInput] = useState('');
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);

  const {
    register,
    handleSubmit: handleFormSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: project ? {
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl,
      projectUrl: project.projectUrl,
      category: project.category,
      tags: project.tags.join(', '),
      featured: project.featured,
    } : {
      title: '',
      description: '',
      imageUrl: '',
      projectUrl: '',
      category: 'web',
      tags: '',
      featured: false,
    },
  });

  const currentTags = watch('tags');

  const onFormSubmit = (data: ProjectFormData) => {
    const formattedData = {
      ...data,
      tags: data.tags ? data.tags.split(',').map(t => t.trim()).filter(t => t !== '') : [],
    };
    onSubmit(formattedData);
  };

  const handleTagSuggestionClick = (tag: string) => {
    const tagsArr = currentTags ? currentTags.split(',').map(t => t.trim()) : [];
    if (!tagsArr.includes(tag)) {
      const newTags = [...tagsArr.filter(t => t !== ''), tag].join(', ');
      setValue('tags', newTags);
    }
    setTagInput('');
    setSuggestedTags([]);
  };

  const handleTagInputChange = (val: string) => {
    setTagInput(val);
    if (val.trim()) {
      const filtered = SUGGESTED_TAGS.filter(t => 
        t.toLowerCase().includes(val.toLowerCase()) && 
        !(currentTags || '').toLowerCase().includes(t.toLowerCase())
      );
      setSuggestedTags(filtered);
    } else {
      setSuggestedTags([]);
    }
  };

  return (
    <div className="bg-base-100 p-6 rounded-2xl border border-base-300 shadow-xl transition-all duration-200 hover:shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">{project ? 'Editar Proyecto' : 'Nuevo Proyecto'}</h3>
        <button onClick={onCancel} className="btn btn-ghost btn-circle btn-sm transition-all duration-200">
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleFormSubmit(onFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Columna izquierda */}
          <div className="space-y-6">
            <FloatingLabelInput 
              label="Título del Proyecto"
              {...register('title')}
              error={errors.title?.message}
            />
            
            <div className="relative">
              <textarea 
                {...register('description')} 
                className={`textarea textarea-bordered w-full h-32 pt-6 pb-2 px-4 transition-all duration-200 focus:ring-2 focus:ring-primary focus:outline-none ${errors.description ? 'textarea-error' : ''}`} 
                placeholder=" " 
              />
              <label className={`absolute left-4 transition-all duration-200 pointer-events-none ${watch('description') ? 'top-2 text-xs text-primary font-bold' : 'top-4 text-base-content/50'}`}>
                Descripción
              </label>
              {errors.description && <span className="text-error text-xs mt-1 block font-medium">{errors.description.message}</span>}
            </div>
            
            <div className="space-y-2 relative">
              <FloatingLabelInput 
                label="Tags (separados por coma)"
                {...register('tags')}
                onChange={(e) => {
                  register('tags').onChange(e);
                  handleTagInputChange(e.target.value);
                }}
              />
              {suggestedTags.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-base-100 border border-base-300 rounded-lg shadow-xl overflow-hidden animate-fade-in">
                  <div className="p-2 bg-base-200 text-xs font-bold flex items-center gap-2">
                    <Search size={12} /> Sugerencias
                  </div>
                  <div className="flex flex-wrap gap-2 p-3">
                    {suggestedTags.map(tag => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleTagSuggestionClick(tag)}
                        className="btn btn-xs btn-outline btn-primary transition-all duration-200"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Columna derecha */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary flex items-center gap-2">
                <ImageIcon size={16} /> Imagen del Proyecto
              </label>
              <ImageUploader 
                onImageUploaded={(url) => setValue('imageUrl', url, { shouldValidate: true })}
                currentImage={project?.imageUrl}
              />
              {errors.imageUrl && <span className="text-error text-xs block">{errors.imageUrl.message}</span>}
              <input type="hidden" {...register('imageUrl')} />
            </div>
            
            <FloatingLabelInput 
              label="URL del Proyecto (GitHub/Demo)"
              {...register('projectUrl')}
              error={errors.projectUrl?.message}
            />
            
            <div className="relative">
              <select 
                {...register('category')} 
                className="select select-bordered w-full pt-6 pb-2 px-4 h-14 transition-all duration-200 focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="web">Web Development</option>
                <option value="blockchain">Blockchain</option>
                <option value="tool">Herramienta</option>
              </select>
              <label className="absolute left-4 top-2 text-xs text-primary font-bold pointer-events-none">
                Categoría
              </label>
            </div>
            
            <div className="form-control bg-base-200/50 p-4 rounded-xl border border-base-300 transition-all duration-200 hover:bg-base-200">
              <label className="label cursor-pointer p-0">
                <span className="label-text font-bold">Proyecto Destacado</span>
                <input 
                  type="checkbox" 
                  {...register('featured')} 
                  className="toggle toggle-primary transition-all duration-200" 
                />
              </label>
              <p className="text-[10px] text-base-content/50 mt-1">Aparecerá en la sección principal del portafolio.</p>
            </div>
          </div>
        </div>
        
        {/* Botones */}
        <div className="flex justify-end gap-3 pt-4 border-t border-base-300">
          <button 
            type="button" 
            onClick={onCancel} 
            className="btn btn-ghost transition-all duration-200"
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            className="btn btn-primary px-8 gap-2 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Save size={18} /> {project ? 'Actualizar Proyecto' : 'Crear Proyecto'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
