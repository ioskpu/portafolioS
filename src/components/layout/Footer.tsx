import React from 'react';
import { Heart, Github, Linkedin, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <Github size={20} />, href: 'https://github.com/LuisCorales', label: 'GitHub' },
    { icon: <Linkedin size={20} />, href: 'https://linkedin.com/in/luiscorales', label: 'LinkedIn' },
    { icon: <Twitter size={20} />, href: 'https://twitter.com/luiscorales', label: 'Twitter' },
    { icon: <Mail size={20} />, href: 'mailto:lrcorales@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="bg-base-200 pt-16 pb-8 border-t border-base-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand/About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xl font-bold tracking-tighter">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-content text-sm">LC</div>
              <span>Luis Corales</span>
            </div>
            <p className="text-base-content/70 max-w-xs leading-relaxed">
              Desarrollador Blockchain Full Stack por crear experiencias digitales excepcionales 
              y explorar el futuro de la Web3.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Navegación</h4>
            <ul className="space-y-3">
              <li><a href="/" className="link link-hover text-base-content/70 hover:text-primary transition-colors">Inicio</a></li>
              <li><a href="#projects" className="link link-hover text-base-content/70 hover:text-primary transition-colors">Proyectos</a></li>
              <li><a href="#blockchain" className="link link-hover text-base-content/70 hover:text-primary transition-colors">Blockchain</a></li>
              <li><a href="#contact" className="link link-hover text-base-content/70 hover:text-primary transition-colors">Contacto</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Conectar</h4>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-circle btn-md bg-base-300 hover:bg-primary hover:text-primary-content transition-all"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-base-300 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-base-content/60">
            © {currentYear} Luis Corales. Todos los derechos reservados.
          </p>
          <p className="flex items-center gap-2 text-sm text-base-content/60">
            Hecho con <Heart size={14} className="text-error fill-current animate-pulse" /> usando React & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
