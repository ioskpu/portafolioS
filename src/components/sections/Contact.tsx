import React, { useState } from 'react';
import { Mail, MessageSquare, Send } from 'lucide-react';
import { FloatingLabelInput } from '../ui/FloatingLabelInput';

const Contact = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  return (
    <section id="contact" className="py-20 bg-base-200">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-primary">¿Tienes un proyecto en mente?</h2>
            <p className="text-base-content/70">
              Siempre abierto a nuevas oportunidades y colaboraciones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center p-6 bg-base-100 rounded-2xl shadow-sm border border-base-300">
              <div className="p-4 bg-primary/10 text-primary rounded-full mb-4">
                <Mail size={24} />
              </div>
              <h4 className="font-bold mb-1">Email</h4>
              <p className="text-sm text-base-content/60">lrcorales@gmail.com</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-base-100 rounded-2xl shadow-sm border border-base-300">
              <div className="p-4 bg-secondary/10 text-secondary rounded-full mb-4">
                <MessageSquare size={24} />
              </div>
              <h4 className="font-bold mb-1">Social</h4>
              <p className="text-sm text-base-content/60">@luiscorales</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-base-100 rounded-2xl shadow-sm border border-base-300">
              <div className="p-4 bg-accent/10 text-accent rounded-full mb-4">
                <Send size={24} />
              </div>
              <h4 className="font-bold mb-1">Telegram</h4>
              <p className="text-sm text-base-content/60">t.me/lrcorales</p>
            </div>
          </div>

          <form className="bg-base-100 p-8 rounded-3xl shadow-xl border border-base-300 transition-all duration-200 hover:shadow-md">
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-6">
              <FloatingLabelInput 
                label="Nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              />
              
              <FloatingLabelInput 
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              
              <div className="xs:col-span-2 relative">
                <textarea 
                  className="textarea textarea-bordered w-full h-32 pt-6 pb-2 px-4 transition-all duration-200 focus:ring-2 focus:ring-primary focus:outline-none" 
                  placeholder=" "
                  value={formData.mensaje}
                  onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                />
                <label className={`absolute left-4 transition-all duration-200 pointer-events-none ${formData.mensaje ? 'top-2 text-xs text-primary font-bold' : 'top-4 text-base-content/50'}`}>
                  Cuéntame sobre tu proyecto...
                </label>
              </div>
              
              <div className="xs:col-span-2">
                <button className="btn btn-primary w-full md:w-auto gap-2 transition-all duration-200 shadow-sm hover:shadow-md">
                  Enviar Mensaje <Send size={18} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
