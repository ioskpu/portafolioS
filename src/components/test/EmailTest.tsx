import React, { useState } from 'react';
import { sendContactEmail } from '../../services/emailService';

const EmailTest: React.FC = () => {
  const [testResult, setTestResult] = useState<string>('');

  const runTest = async () => {
    setTestResult('Enviando email de prueba...');
    
    const result = await sendContactEmail({
      name: 'Test User',
      email: 'test@example.com',
      message: 'Esta es una prueba del formulario de contacto.',
      subject: 'Prueba de EmailJS'
    });
    
    if (result.success) {
      setTestResult('✅ ¡Prueba exitosa! Revisa tu email.');
    } else {
      setTestResult(`❌ Error: ${result.error}`);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-bold mb-2">Prueba de EmailJS</h3>
      <button 
        onClick={runTest}
        className="btn btn-sm btn-primary mb-2"
      >
        Probar envío de email
      </button>
      <div className="text-sm">{testResult}</div>
    </div>
  );
};

export default EmailTest;
