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
  async (_, { rejectWithValue }) => { 
    try {
      return await projectService.getAll(); 
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  } 
); 

export const deleteProjectAsync = createAsyncThunk(
  'projects/deleteProject',
  async (id: string, { rejectWithValue }) => {
    try {
      await projectService.delete(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const projectsSlice = createSlice({ 
  name: 'projects', 
  initialState, 
  reducers: { 
    addProject: (state, action: PayloadAction<Project>) => { 
      state.projects.push(action.payload); 
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
      .addCase(fetchProjects.rejected, (state, action: any) => { 
        state.loading = false; 
        state.error = action.payload || 'Error loading projects'; 
      })
      .addCase(deleteProjectAsync.fulfilled, (state, action: PayloadAction<string>) => {
        state.projects = state.projects.filter(p => p.id !== action.payload);
      }); 
  }, 
}); 

export const { addProject } = projectsSlice.actions; 
export default projectsSlice.reducer; 
