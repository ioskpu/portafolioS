import React from 'react';
import { ExternalLink, Github, Loader2 } from 'lucide-react';
import { Project } from '../../types/project';
import { ResponsiveGrid } from '../layout/ResponsiveGrid';

const Projects = () => {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/projects.json')
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading projects:', err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="projects" className="py-20 bg-base-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Proyectos Destacados</h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Una selección de mis trabajos más recientes en desarrollo web y blockchain.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={48} />
          </div>
        ) : (
          <ResponsiveGrid minWidth="300px">
            {projects.map((project) => (
              <div key={project.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <figure className="relative overflow-hidden h-48">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    {project.projectUrl && (
                      <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="btn btn-circle btn-sm bg-white text-black hover:bg-primary hover:text-white border-none">
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </figure>
                <div className="card-body">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="card-title text-xl">{project.title}</h3>
                    <div className={`badge badge-sm ${
                      project.category === 'blockchain' ? 'badge-secondary' : 
                      project.category === 'tool' ? 'badge-accent' : 'badge-primary'
                    }`}>
                      {project.category}
                    </div>
                  </div>
                  <p className="text-base-content/70 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="card-actions justify-start">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs font-semibold px-2 py-1 bg-base-300 rounded text-base-content/80">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </ResponsiveGrid>
        )}
      </div>
    </section>
  );
};

export default Projects;
