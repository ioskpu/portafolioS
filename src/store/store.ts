import { configureStore } from '@reduxjs/toolkit'; 
import projectsReducer from './slices/projectsSlice'; 
import adminReducer from './slices/adminSlice'; 

export const store = configureStore({ 
  reducer: { 
    projects: projectsReducer, 
    admin: adminReducer, 
  }, 
}); 

export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch; 
