import React from 'react';
import { CheckCircle } from 'lucide-react';

export const SecretToast = ({ show }: { show: boolean }) => {
  if (!show) return null;
  
  return (
    <div className="toast toast-top toast-center z-[60]">
      <div className="alert alert-success flex items-center gap-2 shadow-lg animate-fade-in">
        <CheckCircle size={20} />
        <span>¡Acceso admin desbloqueado por 10 segundos!</span>
      </div>
    </div>
  );
};
