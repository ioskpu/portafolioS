import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, Plus, Upload, Edit, Trash2, 
  Search, BarChart3,
  FolderOpen, Clock, TrendingUp, RefreshCw, LayoutDashboard
} from 'lucide-react';
import ProjectTable from '../../components/admin/ProjectTable';
import ProjectForm from '../../components/admin/ProjectForm';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { fetchProjects, deleteProjectAsync } from '../../store/slices/projectsSlice';
import { projectService } from '../../services/apiService';
import { Project } from '../../types/project';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { projects, loading } = useAppSelector(state => state.projects);
  
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    featured: 0,
    blockchain: 0,
    lastUpdated: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken') || localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    dispatch(fetchProjects());
  }, [dispatch, navigate]);

  useEffect(() => {
    if (projects.length > 0) {
      const featured = projects.filter(p => p.featured).length;
      const blockchain = projects.filter(p => p.category === 'blockchain').length;
      
      const dates = projects
        .map(p => new Date(p.createdAt).getTime())
        .filter(t => !isNaN(t));
      
      const lastUpdated = dates.length > 0 
        ? new Date(Math.max(...dates)).toLocaleDateString()
        : 'N/A';
      
      setStats({
        total: projects.length,
        featured,
        blockchain,
        lastUpdated
      });
    }
  }, [projects]);

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar este proyecto?')) {
      setIsSyncing(true);
      try {
        await dispatch(deleteProjectAsync(id)).unwrap();
      } catch (error: any) {
        alert(`Error al eliminar el proyecto: ${error}`);
      } finally {
        setIsSyncing(false);
      }
    }
  };

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      await dispatch(fetchProjects()).unwrap();
    } finally {
      setIsSyncing(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  const handleFormSubmit = async (data: any) => {
    setIsSyncing(true);
    try {
      if (editingProject) {
        await projectService.update(editingProject.id, data);
      } else {
        await projectService.create(data);
      }
      
      await dispatch(fetchProjects()).unwrap();
      setShowForm(false);
      setEditingProject(null);
    } catch (error: any) {
      console.error('API Error:', error.message);
      alert(`Error al guardar el proyecto: ${error.message}`);
    } finally {
      setIsSyncing(false);
    }
  };

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading && projects.length === 0) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header del Dashboard */}
      <header className="sticky top-0 z-50 bg-base-100/95 backdrop-blur border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <LayoutDashboard className="text-primary" />
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
              <div className="text-sm badge badge-ghost">v1.1</div>
            </div>
            
            <div className="flex items-center gap-4">
              {isSyncing && <RefreshCw size={20} className="animate-spin text-primary" />}
              <button 
                onClick={handleSync}
                className="btn btn-ghost btn-sm gap-2"
                title="Sincronizar con la API"
                disabled={isSyncing}
              >
                <RefreshCw size={16} className={isSyncing ? 'animate-spin' : ''} />
                <span className="hidden sm:inline">Sincronizar</span>
              </button>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} className="avatar placeholder cursor-pointer">
                  <div className="bg-neutral text-neutral-content rounded-full w-8">
                    <span className="text-xs">LC</span>
                  </div>
                </div>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-4 border border-base-200">
                  <li><a>Configuración</a></li>
                  <li><a>Perfil</a></li>
                  <li onClick={handleLogout} className="text-error">
                    <div className="flex items-center gap-2">
                      <LogOut className="w-4 h-4" />
                      Cerrar sesión
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card bg-base-100 shadow border border-base-200">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{stats.total}</div>
                  <div className="text-sm text-base-content/70">Proyectos Totales</div>
                </div>
                <FolderOpen className="w-8 h-8 text-primary" />
              </div>
            </div>
          </div>
          
          <div className="card bg-base-100 shadow border border-base-200">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{stats.featured}</div>
                  <div className="text-sm text-base-content/70">Destacados</div>
                </div>
                <TrendingUp className="w-8 h-8 text-secondary" />
              </div>
            </div>
          </div>
          
          <div className="card bg-base-100 shadow border border-base-200">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{stats.blockchain}</div>
                  <div className="text-sm text-base-content/70">Blockchain</div>
                </div>
                <BarChart3 className="w-8 h-8 text-accent" />
              </div>
            </div>
          </div>
          
          <div className="card bg-base-100 shadow border border-base-200">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{stats.lastUpdated}</div>
                  <div className="text-sm text-base-content/70">Última actualización</div>
                </div>
                <Clock className="w-8 h-8 text-info" />
              </div>
            </div>
          </div>
        </div>

        {/* Controles principales */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold">Gestión de Proyectos</h2>
            <p className="text-base-content/70">Administra y actualiza los proyectos de tu portfolio</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <div className="join shadow-sm">
              <input
                type="text"
                placeholder="Buscar proyectos..."
                className="input input-bordered join-item"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn join-item">
                <Search className="w-4 h-4" />
              </button>
            </div>
            
            <button className="btn btn-primary gap-2 shadow-sm" onClick={() => { setEditingProject(null); setShowForm(true); }}>
              <Plus className="w-4 h-4" />
              Nuevo Proyecto
            </button>
            
            <div className="dropdown dropdown-end">
              <button className="btn btn-outline gap-2 shadow-sm">
                <Upload className="w-4 h-4" />
                Exportar
              </button>
              <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-2 border border-base-200">
                <li><a>Exportar a JSON</a></li>
                <li><a>Exportar a CSV</a></li>
                <li><a>Backup completo</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tabla de proyectos */}
        <div className="card bg-base-100 shadow-lg border border-base-200 overflow-hidden">
          <div className="card-body p-0">
            <ProjectTable 
              projects={filteredProjects}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>

        {/* Modal de formulario */}
        {showForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4 animate-in fade-in duration-200">
            <div className="bg-base-100 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
              <div className="p-6 border-b border-base-200 flex justify-between items-center bg-base-100">
                <h3 className="text-xl font-bold">
                  {editingProject ? 'Editar Proyecto' : 'Nuevo Proyecto'}
                </h3>
                <button 
                  className="btn btn-ghost btn-circle btn-sm"
                  onClick={() => {
                    setShowForm(false);
                    setEditingProject(null);
                  }}
                >
                  ✕
                </button>
              </div>
              <div className="p-6 overflow-y-auto bg-base-50/30">
                <ProjectForm 
                  project={editingProject}
                  onSubmit={handleFormSubmit}
                  onCancel={() => {
                    setShowForm(false);
                    setEditingProject(null);
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
