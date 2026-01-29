import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, LogOut, Settings, LayoutDashboard, RefreshCw } from 'lucide-react';
import ProjectTable from '../../components/admin/ProjectTable';
import ProjectForm from '../../components/admin/ProjectForm';
import { Project } from '../../types/project';
import { updateProjectsFile, getProjects } from '../../services/github';

const Dashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingProject, setEditingProject] = React.useState<Project | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    
    const loadProjects = async () => {
      setIsLoading(true);
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error('Failed to load projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      let newProjects;
      if (editingProject) {
        newProjects = projects.map(p => p.id === editingProject.id ? { ...data, id: p.id, createdAt: p.createdAt } : p);
      } else {
        const newProject = {
          ...data,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString()
        };
        newProjects = [...projects, newProject];
      }
      
      await updateProjectsFile(newProjects);
      setProjects(newProjects);
      setIsFormOpen(false);
      setEditingProject(null);
    } catch (error) {
      alert('Error al actualizar en GitHub. Verifica tu VITE_GITHUB_TOKEN en las variables de entorno de Vercel');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar este proyecto?')) {
      setIsLoading(true);
      try {
        const newProjects = projects.filter(p => p.id !== id);
        await updateProjectsFile(newProjects);
        setProjects(newProjects);
      } catch (error) {
        alert('Error al eliminar en GitHub.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const stats = {
    total: projects.length,
    featured: projects.filter(p => p.featured).length,
    blockchain: projects.filter(p => p.category === 'blockchain').length,
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Sidebar/Header */}
      <header className="bg-base-100 border-b border-base-300 sticky top-0 z-30">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="text-primary" />
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            {isLoading && <RefreshCw size={20} className="animate-spin text-primary" />}
            <button 
              onClick={async () => {
                setIsLoading(true);
                try {
                  const data = await getProjects();
                  setProjects(data);
                } finally {
                  setIsLoading(false);
                }
              }}
              className="btn btn-ghost btn-sm gap-2"
              title="Sincronizar con GitHub"
            >
              <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
              <span className="hidden sm:inline">Sincronizar</span>
            </button>
            <button onClick={handleLogout} className="btn btn-error btn-sm btn-outline gap-2">
              <LogOut size={16} /> Salir
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="stats shadow bg-base-100">
            <div className="stat">
              <div className="stat-title">Total Proyectos</div>
              <div className="stat-value text-primary">{stats.total}</div>
              <div className="stat-desc">En projects.json</div>
            </div>
          </div>
          <div className="stats shadow bg-base-100">
            <div className="stat">
              <div className="stat-title">Destacados</div>
              <div className="stat-value text-secondary">{stats.featured}</div>
              <div className="stat-desc">Visibles en Hero</div>
            </div>
          </div>
          <div className="stats shadow bg-base-100">
            <div className="stat">
              <div className="stat-title">Blockchain</div>
              <div className="stat-value text-accent">{stats.blockchain}</div>
              <div className="stat-desc">Proyectos Web3</div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-1">Mis Proyectos</h2>
            <p className="text-base-content/60">Gestiona el contenido de tu portafolio</p>
          </div>
          <button 
            onClick={() => { setEditingProject(null); setIsFormOpen(true); }} 
            className="btn btn-primary gap-2"
          >
            <Plus size={20} /> Nuevo Proyecto
          </button>
        </div>

        {isFormOpen ? (
          <div className="max-w-4xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <ProjectForm 
              project={editingProject} 
              onSubmit={handleSubmit} 
              onCancel={() => { setIsFormOpen(false); setEditingProject(null); }} 
            />
          </div>
        ) : (
          <ProjectTable 
            projects={projects} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
