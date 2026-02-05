import React, { useState } from 'react'; 
 import { Upload, X } from 'lucide-react'; 
 import { uploadService } from '../../services/apiService'; 
 
 interface ImageUploaderProps { 
   onImageUploaded: (url: string) => void; 
   currentImage?: string; 
 } 
 
 const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUploaded, currentImage }) => { 
   const [uploading, setUploading] = useState(false); 
   const [preview, setPreview] = useState(currentImage || ''); 
 
   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => { 
     const file = e.target.files?.[0]; 
     if (!file) return; 
 
     // Validar tipo y tamaño 
     if (!file.type.startsWith('image/')) { 
       alert('Por favor, selecciona una imagen'); 
       return; 
     } 
 
     if (file.size > 5 * 1024 * 1024) { // 5MB 
       alert('La imagen no debe exceder 5MB'); 
       return; 
     } 
 
     // Crear preview 
     const reader = new FileReader(); 
     reader.onloadend = () => { 
       setPreview(reader.result as string); 
     }; 
     reader.readAsDataURL(file); 
 
     // Subir a Cloudinary 
     setUploading(true); 
     try { 
       const base64 = await convertToBase64(file); 
       const result = await uploadService.uploadImage(base64); 
       onImageUploaded(result.url); 
       alert('Imagen subida exitosamente'); 
     } catch (error) { 
       console.error('Error subiendo imagen:', error); 
       alert('Error al subir imagen'); 
     } finally { 
       setUploading(false); 
     } 
   }; 
 
   const convertToBase64 = (file: File): Promise<string> => { 
     return new Promise((resolve, reject) => { 
       const reader = new FileReader(); 
       reader.readAsDataURL(file); 
       reader.onload = () => resolve(reader.result as string); 
       reader.onerror = error => reject(error); 
     }); 
   }; 
 
   return ( 
     <div className="space-y-4"> 
       <div className="border-2 border-dashed border-base-300 rounded-lg p-6 text-center"> 
         <input 
           type="file" 
           accept="image/*" 
           onChange={handleFileChange} 
           disabled={uploading} 
           className="hidden" 
           id="image-upload" 
         /> 
         <label htmlFor="image-upload" className="cursor-pointer"> 
           <Upload className="w-12 h-12 mx-auto text-base-content/50 mb-2" /> 
           <p className="font-medium">Subir imagen</p> 
           <p className="text-sm text-base-content/70">PNG, JPG, WEBP hasta 5MB</p> 
           {uploading && ( 
             <div className="mt-2"> 
               <div className="loading loading-spinner loading-sm"></div> 
               <p className="text-xs mt-1">Subiendo...</p> 
             </div> 
           )} 
         </label> 
       </div> 
       
       {preview && ( 
         <div className="relative"> 
           <img 
             src={preview} 
             alt="Preview" 
             className="w-full h-48 object-cover rounded-lg" 
           /> 
           <button 
             type="button"
             onClick={() => { 
               setPreview(''); 
               onImageUploaded(''); 
             }} 
             className="absolute top-2 right-2 btn btn-circle btn-sm btn-error" 
           > 
             <X className="w-4 h-4" /> 
           </button> 
         </div> 
       )} 
     </div> 
   ); 
 }; 
 
 export default ImageUploader;
