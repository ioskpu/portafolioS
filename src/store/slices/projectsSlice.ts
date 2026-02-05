import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'; 
import { Project } from '../../types/project'; 
import { projectService } from '../../services/apiService';

interface ProjectsState { 
  projects: Project[]; 
  loading: boolean; 
  error: string | null; 
} 

const initialState: ProjectsState = { 
  projects: [], 
  loading: false, 
  error: null, 
}; 

export const fetchProjects = createAsyncThunk( 
  'projects/fetchProjects', 
  async () => { 
    return await projectService.getAll(); 
  } 
); 

export const updateProject = createAsyncThunk( 
  'projects/updateProject', 
  async (project: Project) => { 
    // En producción, aquí iría la llamada a la API de GitHub 
    return project; 
  } 
); 

const projectsSlice = createSlice({ 
  name: 'projects', 
  initialState, 
  reducers: { 
    addProject: (state, action: PayloadAction<Project>) => { 
      state.projects.push(action.payload); 
    }, 
    deleteProject: (state, action: PayloadAction<string>) => { 
      state.projects = state.projects.filter(p => p.id !== action.payload); 
    }, 
  }, 
  extraReducers: (builder) => { 
    builder 
      .addCase(fetchProjects.pending, (state) => { 
        state.loading = true; 
      }) 
      .addCase(fetchProjects.fulfilled, (state, action: PayloadAction<Project[]>) => { 
        state.loading = false; 
        state.projects = action.payload; 
      }) 
      .addCase(fetchProjects.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.error.message || 'Error loading projects'; 
      }); 
  }, 
}); 

export const { addProject, deleteProject } = projectsSlice.actions; 
export default projectsSlice.reducer; 
