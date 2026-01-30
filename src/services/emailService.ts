import emailjs from '@emailjs/browser';

// Inicializar EmailJS con la public key
const initializeEmailJS = () => {
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  
  if (!publicKey) {
    console.warn('EmailJS Public Key no configurada');
    return false;
  }
  
  emailjs.init(publicKey);
  return true;
};

// Inicializar al cargar el módulo
initializeEmailJS();

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  subject?: string;
}

// Verificar que todas las variables de entorno estén configuradas
const validateEmailJSConfig = () => {
  const requiredEnvVars = [
    'VITE_EMAILJS_SERVICE_ID',
    'VITE_EMAILJS_TEMPLATE_ID',
    'VITE_EMAILJS_PUBLIC_KEY',
    'VITE_EMAILJS_USER_ID'
  ];

  const missingVars = requiredEnvVars.filter(
    varName => !import.meta.env[varName]
  );

  if (missingVars.length > 0) {
    console.error('Variables de EmailJS faltantes:', missingVars);
    return false;
  }

  return true;
};

export const sendContactEmail = async (
  data: ContactFormData
): Promise<{ success: boolean; error?: string }> => {
  try {
    // Validar configuración
    if (!validateEmailJSConfig()) {
      return {
        success: false,
        error: 'El servicio de email no está configurado correctamente. Por favor, contacta al administrador.'
      };
    }

    // Obtener variables de entorno
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const userId = import.meta.env.VITE_EMAILJS_USER_ID;

    // Preparar parámetros para la plantilla de EmailJS
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      to_name: 'Luis Corales',
      message: data.message,
      subject: data.subject || 'Nuevo mensaje desde el portfolio',
      reply_to: data.email,
      date: new Date().toLocaleDateString('es-ES'),
      time: new Date().toLocaleTimeString('es-ES'),
    };

    console.log('Enviando email con parámetros:', {
      serviceId,
      templateId,
      userId,
      templateParams
    });

    // Enviar el email usando EmailJS
    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      userId
    );

    console.log('✅ Email enviado exitosamente:', response);
    
    return {
      success: true
    };

  } catch (error) {
    console.error('❌ Error al enviar email:', error);
    
    // Manejar errores específicos de EmailJS
    if (error instanceof Error) {
      return {
        success: false,
        error: `Error al enviar el mensaje: ${error.message}`
      };
    }

    return {
      success: false,
      error: 'Ocurrió un error inesperado al enviar el mensaje. Por favor, intenta nuevamente.'
    };
  }
};

// Función para enviar una copia de confirmación al usuario (opcional)
export const sendConfirmationEmail = async (
  userEmail: string,
  userName: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = 'template_confirmacion_id'; // Crea otra plantilla para confirmaciones
    const userId = import.meta.env.VITE_EMAILJS_USER_ID;

    const templateParams = {
      to_name: userName,
      to_email: userEmail,
      date: new Date().toLocaleDateString('es-ES'),
    };

    await emailjs.send(serviceId, templateId, templateParams, userId);
    return { success: true };
  } catch (error) {
    console.error('Error enviando confirmación:', error);
    return { success: false };
  }
};
