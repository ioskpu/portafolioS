const getApiUrl = () => {
  const url = import.meta.env.VITE_API_URL || 'http://localhost:3001';
  // Asegurar que termine en /api
  return url.endsWith('/api') ? url : `${url}/api`;
};

const API_BASE_URL = getApiUrl(); 
 
 const getAuthToken = () => { 
   return localStorage.getItem('adminToken'); 
 }; 
 
 const apiRequest = async (endpoint: string, options: RequestInit = {}) => { 
   const token = getAuthToken(); 
   
   const headers = { 
     'Content-Type': 'application/json', 
     ...(token && { 'Authorization': `Bearer ${token}` }), 
     ...options.headers, 
   }; 
 
   try { 
     const response = await fetch(`${API_BASE_URL}${endpoint}`, { 
       ...options, 
       headers, 
     }); 
 
     if (!response.ok) { 
       const error = await response.json(); 
       throw new Error(error.error || 'Error en la solicitud'); 
     } 
 
     return await response.json(); 
   } catch (error) { 
     console.error(`Error en ${endpoint}:`, error); 
     throw error; 
   } 
 }; 
 
 // Servicios de proyectos 
 export const projectService = { 
   getAll: () => apiRequest('/projects'), 
   getById: (id: string) => apiRequest(`/projects/${id}`), 
   create: (projectData: any) => 
     apiRequest('/projects', { method: 'POST', body: JSON.stringify(projectData) }), 
   update: (id: string, projectData: any) => 
     apiRequest(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(projectData) }), 
   delete: (id: string) => 
     apiRequest(`/projects/${id}`, { method: 'DELETE' }), 
 }; 
 
 // Servicio de upload 
 export const uploadService = { 
   uploadImage: async (base64Image: string) => { 
     const response = await fetch(`${API_BASE_URL}/upload`, { 
       method: 'POST', 
       headers: { 
         'Authorization': `Bearer ${getAuthToken()}`, 
         'Content-Type': 'application/json', 
       }, 
       body: JSON.stringify({ image: base64Image }), 
     }); 
 
     if (!response.ok) { 
       throw new Error('Error al subir imagen'); 
     } 
 
     return await response.json(); 
   }, 
 }; 
 
 // Servicio de autenticación 
 export const authService = { 
   login: (password: string) => 
     apiRequest('/auth/login', { 
       method: 'POST', 
       body: JSON.stringify({ password }) 
     }), 
   
   verifyToken: () => 
     apiRequest('/auth/verify', { method: 'POST' }), 
 };
