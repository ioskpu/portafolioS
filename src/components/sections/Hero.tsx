import React from 'react';
import { ArrowRight, Code, Cpu, Zap } from 'lucide-react';
import BlockchainGrid from '../visuals/BlockchainGrid';

const Hero: React.FC = () => {
  return (
    <section className="py-12 md:py-24 lg:py-32 overflow-hidden relative">
      {/* Fondo gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-base-100 via-base-100 to-base-200"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Columna izquierda - Contenido */}
          <div className="space-y-6 lg:space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  Disponible para nuevos proyectos
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
                <span className="block">Fullstack Developer</span>
                <span className="block mt-2">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500">
                    & Blockchain Enthusiast
                  </span>
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-base-content/80 leading-relaxed max-w-2xl">
                Especializado en crear experiencias digitales modernas con 
                <span className="font-semibold text-primary"> React</span>, 
                <span className="font-semibold text-primary"> TypeScript</span> y tecnologías 
                <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500"> Web3</span>. 
                Enfocado en código limpio, escalable y centrado en el usuario.
              </p>
            </div>
            
            {/* Botones de acción */}
            <div className="flex flex-wrap gap-4">
              <a 
                href="#projects" 
                className="btn btn-primary px-8 gap-3 group"
              >
                <Code className="w-5 h-5" />
                Ver Proyectos
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#contact" 
                className="btn btn-outline px-8 border-2 hover:border-primary hover:bg-primary/5 gap-3"
              >
                <Zap className="w-5 h-5" />
                Contactar ↗
              </a>
            </div>
            
            {/* Stats / Tech Stack */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-base-300">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-blue-500" />
                  <span className="text-2xl font-bold">50+</span>
                </div>
                <div className="text-sm text-base-content/70">Proyectos</div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                  <span className="text-2xl font-bold">3+</span>
                </div>
                <div className="text-sm text-base-content/70">Años Exp</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm text-base-content/70">Fullstack</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold">∞</div>
                <div className="text-sm text-base-content/70">Blockchain</div>
              </div>
            </div>
            
            {/* Tech tags */}
            <div className="flex flex-wrap gap-2 pt-4">
              {[
                { name: 'React', color: 'bg-blue-500/10 text-blue-700 dark:text-blue-300' },
                { name: 'TypeScript', color: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300' },
                { name: 'Node.js', color: 'bg-green-500/10 text-green-700 dark:text-green-300' },
                { name: 'Solidity', color: 'bg-gray-800/10 text-gray-700 dark:text-gray-300' },
                { name: 'Ethereum', color: 'bg-purple-500/10 text-purple-700 dark:text-purple-300' },
                { name: 'Web3.js', color: 'bg-orange-500/10 text-orange-700 dark:text-orange-300' },
              ].map((tech) => (
                <span 
                  key={tech.name}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium ${tech.color}`}
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
          
          {/* Columna derecha - Visualización Blockchain */}
          <div className="relative h-full min-h-[400px] lg:min-h-[500px] flex items-center justify-center">
            <BlockchainGrid />
            
            {/* Código flotante */}
            <div className="absolute -bottom-6 -right-4 md:bottom-auto md:top-8 md:-right-8 bg-base-100/95 backdrop-blur-xl rounded-xl p-4 shadow-2xl border border-base-300 max-w-[220px] md:max-w-[260px]">
              <div className="text-xs md:text-sm font-mono space-y-1">
                <div className="text-purple-600 dark:text-purple-400">// Smart Contract</div>
                <div className="text-blue-600 dark:text-blue-400">contract</div>
                <div className="text-emerald-600 dark:text-emerald-400">Portfolio</div>
                <div className="text-gray-500">{'{'}</div>
                <div className="pl-4">
                  <div className="text-cyan-600 dark:text-cyan-400">address</div>
                  <div className="text-gray-700 dark:text-gray-300">public</div>
                  <div className="text-yellow-600 dark:text-yellow-400">owner</div>
                  <div className="text-gray-700 dark:text-gray-300">=</div>
                  <div className="text-green-600 dark:text-green-400">msg.sender</div>
                  <div className="text-gray-700 dark:text-gray-300">;</div>
                </div>
                <div className="text-gray-500">{'}'}</div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;
