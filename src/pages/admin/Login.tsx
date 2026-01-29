import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, LogIn, ArrowLeft } from 'lucide-react';

const Login = () => {
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple logic: check against hardcoded password and store a "token"
    if (password === 'admin123') {
      const mockToken = btoa('admin:' + Date.now());
      localStorage.setItem('admin_token', mockToken);
      navigate('/admin');
    } else {
      setError('Contraseña incorrecta');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="max-w-md w-full bg-base-100 p-8 rounded-2xl shadow-2xl border border-base-300">
        <div className="text-center mb-8">
          <div className="inline-flex p-4 bg-primary/10 text-primary rounded-full mb-4">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-bold">Panel de Administración</h1>
          <p className="text-base-content/60">Ingresa para gestionar tus proyectos</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Contraseña</span>
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full focus:input-primary" 
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-error text-sm text-center font-medium">{error}</p>}

          <button type="submit" className="btn btn-primary w-full gap-2">
            Entrar <LogIn size={18} />
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-base-200">
          <Link 
            to="/" 
            className="btn btn-ghost btn-sm w-full gap-2 text-base-content/60 hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} /> Regresar al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
