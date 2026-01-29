PASO 4: Añadir estilos CSS personalizados
Añade en src/index.css después de Tailwind:

css
@layer utilities {
  .perspective-1000 {
    perspective: 1000px;
  }
  
  .transform-gpu {
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
  }
  
  .bg-gradient-radial {
    background-image: radial-gradient(var(--tw-gradient-stops));
  }
  
  .text-shadow-glow {
    text-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
  }
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: hsl(var(--b1));
}

::-webkit-scrollbar-thumb {
  background: hsl(var(--p));
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--pf));
}