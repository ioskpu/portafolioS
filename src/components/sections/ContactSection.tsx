import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, XCircle, Mail, MapPin, Clock } from 'lucide-react';
import { sendContactEmail, ContactFormData } from '../../services/emailService';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  
  const [characterCount, setCharacterCount] = useState(0);
  const [emailValid, setEmailValid] = useState(true);

  // Efecto para contar caracteres del mensaje
  useEffect(() => {
    setCharacterCount(formData.message.length);
  }, [formData.message]);

  // Validar email en tiempo real
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    // Validación de email en tiempo real
    if (name === 'email') {
      setEmailValid(validateEmail(value) || value === '');
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });

    // Validaciones
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({
        type: 'error',
        message: 'Por favor completa todos los campos requeridos.'
      });
      setLoading(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      setStatus({
        type: 'error',
        message: 'Por favor ingresa un email válido.'
      });
      setLoading(false);
      return;
    }

    if (formData.message.length < 10) {
      setStatus({
        type: 'error',
        message: 'El mensaje debe tener al menos 10 caracteres.'
      });
      setLoading(false);
      return;
    }

    if (formData.message.length > 2000) {
      setStatus({
        type: 'error',
        message: 'El mensaje no puede exceder los 2000 caracteres.'
      });
      setLoading(false);
      return;
    }

    try {
      const result = await sendContactEmail(formData);
      
      if (result.success) {
        setStatus({
          type: 'success',
          message: '¡Mensaje enviado con éxito! Te responderé lo antes posible.'
        });
        
        // Resetear formulario
        setFormData({ name: '', email: '', message: '' });
        setCharacterCount(0);
        setEmailValid(true);
        
        // Ocultar mensaje después de 8 segundos
        setTimeout(() => {
          setStatus({ type: null, message: '' });
        }, 8000);
        
        // Scroll suave al top del formulario
        document.getElementById('contact-form')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        
      } else {
        setStatus({
          type: 'error',
          message: result.error || 'Error al enviar el mensaje. Por favor, intenta de nuevo.'
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Error inesperado. Por favor intenta más tarde o contáctame directamente por email.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', message: '' });
    setCharacterCount(0);
    setEmailValid(true);
    setStatus({ type: null, message: '' });
  };

  return (
    <section id="contact" className="py-12 md:py-24 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-4">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                Disponible para colaboraciones
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500">
                Hablemos de tu proyecto
              </span>
            </h2>
            <p className="text-base-content/80 max-w-2xl mx-auto text-lg">
              ¿Tienes una idea interesante? Contáctame y discutamos cómo puedo ayudarte a hacerla realidad.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Información de contacto */}
            <div className="lg:col-span-1 space-y-6">
              <div className="card bg-base-200 shadow-lg">
                <div className="card-body">
                  <h3 className="card-title text-xl mb-4">Información de contacto</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Email</h4>
                        <a 
                          href="mailto:lrcorales@gmail.com" 
                          className="text-primary hover:underline block mt-1"
                        >
                          lrcorales@gmail.com
                        </a>
                        <p className="text-sm text-base-content/70 mt-1">
                          Responde normalmente en 24 horas
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-secondary/10 text-secondary">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Ubicación</h4>
                        <p className="text-base-content/80 mt-1">
                          Remoto (Colombia)
                        </p>
                        <p className="text-sm text-base-content/70 mt-1">
                          Disponible para trabajar en cualquier zona horaria
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-accent/10 text-accent">
                        <Clock className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Disponibilidad</h4>
                        <p className="text-base-content/80 mt-1">
                          Abierto a nuevos proyectos
                        </p>
                        <p className="text-sm text-base-content/70 mt-1">
                          Tiempo completo • Freelance • Contrato
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/20">
                <div className="card-body">
                  <h4 className="font-bold text-lg mb-2">¿Qué pasa después?</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-sm">Recibirás confirmación inmediata</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="text-sm">Te responderé en 24-48 horas</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      <span className="text-sm">Discutiremos tu proyecto en detalle</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                      <span className="text-sm">Recibirás una propuesta personalizada</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Formulario de contacto */}
            <div className="lg:col-span-2">
              <div className="card shadow-2xl" id="contact-form">
                <div className="card-body p-6 md:p-8">
                  <h3 className="text-2xl font-bold mb-6">Envíame un mensaje</h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium">
                          Nombre completo *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="input input-bordered w-full focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Tu nombre"
                          disabled={loading}
                          minLength={2}
                          maxLength={100}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className={`input input-bordered w-full focus:ring-2 focus:ring-primary focus:border-transparent ${
                            !emailValid && formData.email ? 'input-error' : ''
                          }`}
                          placeholder="tu@email.com"
                          disabled={loading}
                        />
                        {!emailValid && formData.email && (
                          <div className="text-error text-xs mt-1">
                            Por favor ingresa un email válido
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label htmlFor="message" className="block text-sm font-medium">
                          Mensaje *
                        </label>
                        <span className={`text-xs ${
                          characterCount > 2000 ? 'text-error' : 'text-base-content/70'
                        }`}>
                          {characterCount}/2000
                        </span>
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="textarea textarea-bordered w-full focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Cuéntame sobre tu proyecto, objetivos, presupuesto y timeline..."
                        disabled={loading}
                        minLength={10}
                        maxLength={2000}
                      />
                      <div className="text-xs text-base-content/70">
                        Incluye detalles como: tipo de proyecto, tecnologías preferidas, timeline y presupuesto.
                      </div>
                    </div>
                    
                    {/* Status Message */}
                    {status.type && (
                      <div className={`alert ${
                        status.type === 'success' ? 'alert-success' : 'alert-error'
                      } shadow-lg animate-fade-in`}>
                        <div className="flex items-start gap-3">
                          {status.type === 'success' ? (
                            <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                          ) : (
                            <XCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                          )}
                          <div>
                            <span className="font-medium">{status.message}</span>
                            {status.type === 'success' && (
                              <div className="text-sm opacity-90 mt-1">
                                Revisa tu email (incluida la carpeta de spam) por si acaso.
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-between pt-4">
                      <button
                        type="button"
                        onClick={handleReset}
                        disabled={loading}
                        className="btn btn-ghost gap-2"
                      >
                        <XCircle className="w-4 h-4" />
                        Limpiar formulario
                      </button>
                      
                      <button
                        type="submit"
                        disabled={loading || !emailValid || formData.message.length > 2000}
                        className={`btn btn-primary gap-2 px-8 ${
                          loading ? 'loading' : ''
                        }`}
                      >
                        {!loading && <Send className="w-4 h-4" />}
                        {loading ? 'Enviando...' : 'Enviar Mensaje'}
                      </button>
                    </div>
                    
                    <div className="text-center text-xs text-base-content/50 pt-4 border-t border-base-300">
                      <p>
                        Al enviar este formulario, aceptas que te contacte por email para discutir tu proyecto.
                        No compartiré tu información con terceros.
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
