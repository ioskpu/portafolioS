import React, { useState } from 'react';
import { useKonamiCode } from '../../hooks/useKonamiCode';
import { LockOpen } from 'lucide-react';

export const EasterEggButton = () => {
  const { activated } = useKonamiCode();
  const [visible, setVisible] = useState(false);
  
  if (!activated) return null;
  
  return (
    <div 
      className="fixed bottom-6 right-6 z-50 animate-fade-in" 
      onMouseEnter={() => setVisible(true)} 
      onMouseLeave={() => setVisible(false)}
    >
      <div className="relative">
        <a 
          href="/admin" 
          className="btn btn-circle btn-primary shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <LockOpen size={20} />
        </a>
        
        {visible && (
          <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2">
            <div className="bg-base-100 text-xs px-3 py-2 rounded-lg shadow-lg whitespace-nowrap border border-base-300">
              ¡Acceso admin desbloqueado!
            </div>
            <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-base-100 border-r border-t border-base-300"></div>
          </div>
        )}
      </div>
    </div>
  );
};
