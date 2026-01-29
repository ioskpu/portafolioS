import { useEffect, useState } from 'react';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a'
];

export const useKonamiCode = () => {
  const [code, setCode] = useState<string[]>([]);
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newCode = [...code, e.key].slice(-KONAMI_CODE.length);
      setCode(newCode);
      
      if (newCode.join(',') === KONAMI_CODE.join(',')) {
        setActivated(true);
        // Mostrar por 10 segundos
        setTimeout(() => setActivated(false), 10000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [code]);

  return { activated };
};
