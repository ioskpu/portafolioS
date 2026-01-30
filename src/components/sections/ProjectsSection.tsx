import React, { useState } from 'react';
import { ExternalLink, Github, Star, Filter, Grid, List } from 'lucide-react';
import { Project } from '../../types/project';
import { useAppSelector } from '../../store/hooks';

const ProjectsSection: React.FC = () => {
  const { projects, loading } = useAppSelector(state => state.projects);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<'all' | 'web' | 'blockchain' | 'tool'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = projects.filter(project => {
    if (filter !== 'all' && project.category !== filter) return false;
    if (searchTerm && !project.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) {
      return false;
    }
    return true;
  });

  if (loading) {
    return (
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4 text-base-content/70">Cargando proyectos...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-12 md:py-24">
      <div className="container mx-auto px-4">
        {/* Encabezado con controles */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Mis <span className="text-primary">Proyectos</span>
            </h2>
            <p className="text-base-content/80">
              Una colección de mis trabajos más recientes en desarrollo web y blockchain.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {/* Barra de búsqueda */}
            <div className="join">
              <input
                type="text"
                placeholder="Buscar proyectos..."
                className="input input-bordered join-item w-full max-w-[200px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn join-item">
                <Filter className="w-4 h-4" />
              </button>
            </div>
            
            {/* Controles de vista */}
            <div className="flex items-center gap-2">
              <div className="join">
                <button 
                  className={`btn join-item ${viewMode === 'grid' ? 'btn-primary' : 'btn-ghost'}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button 
                  className={`btn join-item ${viewMode === 'list' ? 'btn-primary' : 'btn-ghost'}`}
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Filtros por categoría */}
        <div className="flex flex-wrap gap-3 mb-8">
          {['all', 'web', 'blockchain', 'tool'].map((cat) => (
            <button
              key={cat}
              className={`btn btn-sm capitalize ${filter === cat ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setFilter(cat as any)}
            >
              {cat === 'all' ? 'Todos' : cat}
              <span className="badge badge-sm ml-2">
                {cat === 'all' ? projects.length : projects.filter(p => p.category === cat).length}
              </span>
            </button>
          ))}
        </div>
        
        {/* Grid o Lista de proyectos */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProjects.map((project) => (
              <ProjectListItem key={project.id} project={project} />
            ))}
          </div>
        )}
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No se encontraron proyectos</h3>
            <p className="text-base-content/70">Intenta con otros filtros o términos de búsqueda.</p>
          </div>
        )}
      </div>
    </section>
  );
};

// Componente de tarjeta para vista grid
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="card card-compact bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
      <figure className="relative overflow-hidden aspect-video">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          {project.featured && (
            <span className="badge badge-primary gap-1">
              <Star className="w-3 h-3" />
              Destacado
            </span>
          )}
          <span className={`badge ${
            project.category === 'blockchain' ? 'badge-secondary' :
            project.category === 'web' ? 'badge-primary' : 'badge-accent'
          }`}>
            {project.category}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-base-100/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </figure>
      <div className="card-body">
        <h3 className="card-title text-lg">{project.title}</h3>
        <p className="text-base-content/70 text-sm line-clamp-2">{project.description}</p>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="badge badge-outline badge-sm">
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="badge badge-ghost badge-sm">+{project.tags.length - 3}</span>
          )}
        </div>
        
        <div className="card-actions justify-between items-center mt-4">
          <div className="text-xs text-base-content/50">
            {new Date(project.createdAt).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'short'
            })}
          </div>
          <a
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Ver
          </a>
        </div>
      </div>
    </div>
  );
};

// Componente para vista lista
const ProjectListItem: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="card card-side bg-base-100 shadow hover:shadow-lg transition-shadow duration-300">
      <figure className="relative w-32 md:w-48">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        {project.featured && (
          <div className="absolute top-2 right-2">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          </div>
        )}
      </figure>
      <div className="card-body flex-1">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <h3 className="card-title">{project.title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`badge badge-xs ${
                project.category === 'blockchain' ? 'badge-secondary' :
                project.category === 'web' ? 'badge-primary' : 'badge-accent'
              }`}>
                {project.category}
              </span>
              <span className="text-xs text-base-content/50">
                {new Date(project.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="card-actions">
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Ver proyecto
            </a>
            {project.category === 'blockchain' && (
              <button className="btn btn-ghost btn-sm gap-2">
                <Github className="w-4 h-4" />
                Código
              </button>
            )}
          </div>
        </div>
        <p className="text-base-content/70 text-sm mt-2">{project.description}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {project.tags.map((tag) => (
            <span key={tag} className="badge badge-outline badge-xs">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;
