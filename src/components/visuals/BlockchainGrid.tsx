import React, { useEffect, useState } from 'react';

const BlockchainGrid: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    
    // Efecto de rotación 3D con mouse
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      setRotation({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const blocks = [
    { id: 1, symbol: 'ETH', color: 'from-blue-500/40 to-cyan-500/40', delay: 0 },
    { id: 2, symbol: '◉', color: 'from-purple-500/40 to-pink-500/40', delay: 0.3 },
    { id: 3, symbol: 'λ', color: 'from-emerald-500/40 to-green-500/40', delay: 0.6 },
    { id: 4, symbol: 'SOL', color: 'from-yellow-500/40 to-amber-500/40', delay: 0.9 },
    { id: 5, symbol: '◊', color: 'from-indigo-500/40 to-blue-500/40', delay: 1.2 },
    { id: 6, symbol: '⚡', color: 'from-rose-500/40 to-red-500/40', delay: 1.5 },
    { id: 7, symbol: 'Δ', color: 'from-teal-500/40 to-emerald-500/40', delay: 1.8 },
    { id: 8, symbol: '0x', color: 'from-violet-500/40 to-purple-500/40', delay: 2.1 },
    { id: 9, symbol: '◈', color: 'from-cyan-500/40 to-blue-500/40', delay: 2.4 },
  ];

  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center">
      {/* Contenedor principal con perspectiva 3D */}
      <div 
        className="relative transform-gpu transition-transform duration-300"
        style={{
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Grid de bloques 3D */}
        <div className="grid grid-cols-3 grid-rows-3 gap-4 md:gap-6 relative">
          {blocks.map((block, index) => {
            const row = Math.floor(index / 3);
            const col = index % 3;
            const zOffset = (row - 1) * 20 + (col - 1) * 20;
            
            return (
              <div
                key={block.id}
                className={`
                  relative aspect-square rounded-xl md:rounded-2xl
                  bg-gradient-to-br ${block.color}
                  border border-white/20 backdrop-blur-sm
                  shadow-lg hover:shadow-2xl
                  transition-all duration-500
                  hover:scale-110 hover:z-50
                  flex items-center justify-center
                  ${mounted ? 'opacity-100' : 'opacity-0'}
                `}
                style={{
                  animation: `float 6s ease-in-out ${block.delay}s infinite alternate`,
                  transform: `translateZ(${zOffset}px)`,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                {/* Texto del bloque */}
                <div className="text-2xl md:text-3xl font-bold text-white/90">
                  {block.symbol}
                </div>
                
                {/* Brillo interior */}
                <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-tr from-white/5 to-transparent"></div>
                
                {/* Borde brillante en hover */}
                <div className="absolute inset-0 rounded-xl md:rounded-2xl border-2 border-transparent group-hover:border-white/30 transition-all duration-300"></div>
              </div>
            );
          })}
        </div>

        {/* Líneas de conexión SVG */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="glow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          
          {/* Conexiones principales */}
          {blocks.map((_, index) => {
            if (index === 4) return null; // Saltar el centro
            
            const row1 = Math.floor(index / 3);
            const col1 = index % 3;
            const x1 = (col1 * 33.33) + 16.665;
            const y1 = (row1 * 33.33) + 16.665;
            
            return (
              <line
                key={`line-${index}`}
                x1={`${x1}%`}
                y1={`${y1}%`}
                x2="50%"
                y2="50%"
                stroke="url(#line-gradient)"
                strokeWidth="1"
                strokeDasharray="4 4"
                strokeOpacity="0.4"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="8"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </line>
            );
          })}
          
          {/* Efecto de pulso central */}
          <circle cx="50%" cy="50%" r="15%" fill="url(#glow-gradient)">
            <animate
              attributeName="r"
              values="15%;17%;15%"
              dur="3s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.3;0.5;0.3"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>

        {/* Partículas flotantes */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 md:w-1.5 md:h-1.5 bg-cyan-400/50 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 2}s infinite alternate`,
              opacity: 0.5 + Math.random() * 0.5,
            }}
          />
        ))}
      </div>

      {/* Glow background */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent blur-3xl"></div>
      
      {/* Tooltip informativo */}
      <div className="absolute -bottom-4 md:-bottom-8 left-1/2 transform -translate-x-1/2 bg-base-100/90 backdrop-blur-md rounded-lg px-4 py-2 text-xs md:text-sm text-center border border-base-300 shadow-lg">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="font-medium">Live Blockchain Network</span>
        </div>
        <div className="text-base-content/70 mt-1">Interactive 3D Visualization</div>
      </div>
    </div>
  );
};

export default BlockchainGrid;
