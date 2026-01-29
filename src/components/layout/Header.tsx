import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, LayoutDashboard, User } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [theme, setTheme] = React.useState(localStorage.getItem('theme') || 'dark');
  const location = useLocation();
  const isAdmin = !!localStorage.getItem('admin_token');

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Proyectos', href: '/#projects' },
    { name: 'Blockchain', href: '/#blockchain' },
    { name: 'Contacto', href: '/#contact' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    if (href.startsWith('/#')) {
      if (location.pathname === '/') {
        e.preventDefault();
        const id = href.replace('/#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
      setIsOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-base-300 bg-base-100/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tighter hover:text-primary transition-colors">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-content text-sm">LC</div>
              <span className="hidden sm:inline">Luis Corales</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="btn btn-ghost btn-sm font-medium"
              >
                {link.name}
              </a>
            ))}
            
            <div className="divider divider-horizontal mx-1"></div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={toggleTheme}
                className="btn btn-ghost btn-sm btn-circle"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {isAdmin && (
                <Link to="/admin" className="btn btn-primary btn-sm gap-2">
                  <LayoutDashboard size={16} />
                  <span>Admin</span>
                </Link>
              )}
            </div>
          </nav>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            <button 
              onClick={toggleTheme}
              className="btn btn-ghost btn-sm btn-circle"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button 
              className="btn btn-ghost btn-sm btn-circle"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-6 pt-2 animate-in fade-in slide-in-from-top-4 duration-300">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="btn btn-ghost justify-start text-lg"
                >
                  {link.name}
                </a>
              ))}
              
              {isAdmin && (
                <Link 
                  to="/admin" 
                  className="btn btn-primary gap-2 mt-2"
                  onClick={() => setIsOpen(false)}
                >
                  <LayoutDashboard size={20} />
                  Admin Dashboard
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
