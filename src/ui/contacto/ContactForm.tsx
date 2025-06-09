'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaUser, FaComment, FaCheck, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { MdWork, MdError } from 'react-icons/md';
import emailjs from '@emailjs/browser';
import SubmitButton from './SubmitButton';
import SuccessMessage from './SuccessMessage';
import { EMAILJS_CONFIG } from '@/config/emailjs';

interface ContactFormProps {
  setFormStep: React.Dispatch<React.SetStateAction<number>>;
}

const ContactForm: React.FC<ContactFormProps> = ({ setFormStep }) => {
  // Estado para el formulario de múltiples pasos
  const [paso, setPaso] = useState(1);
  const [datosFormulario, setDatosFormulario] = useState({
    nombre: '',
    email: '',
    asunto: '',
    presupuesto: '',
    mensaje: ''
  });
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');
  const [errores, setErrores] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  // Actualizar el paso del formulario para el componente padre
  useEffect(() => {
    setFormStep(paso - 1);
  }, [paso, setFormStep]);

  // Validar email
  const validarEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Validar formulario para el paso actual
  const validarPaso = () => {
    let valido = true;
    const nuevosErrores = { ...errores };

    if (paso === 1) {
      if (!datosFormulario.nombre.trim()) {
        nuevosErrores.nombre = 'El nombre es obligatorio';
        valido = false;
      } else {
        nuevosErrores.nombre = '';
      }

      if (!datosFormulario.email) {
        nuevosErrores.email = 'El email es obligatorio';
        valido = false;
      } else if (!validarEmail(datosFormulario.email)) {
        nuevosErrores.email = 'Ingresa un email válido';
        valido = false;
      } else {
        nuevosErrores.email = '';
      }
    }

    if (paso === 3) {
      if (!datosFormulario.mensaje.trim()) {
        nuevosErrores.mensaje = 'El mensaje es obligatorio';
        valido = false;
      } else if (datosFormulario.mensaje.trim().length < 10) {
        nuevosErrores.mensaje = 'El mensaje debe tener al menos 10 caracteres';
        valido = false;
      } else {
        nuevosErrores.mensaje = '';
      }
    }

    setErrores(nuevosErrores);
    return valido;
  };

  // Manejar cambios en los campos del formulario
  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDatosFormulario(prevDatos => ({
      ...prevDatos,
      [name]: value
    }));
  };

  // Manejar navegación entre pasos
  const siguientePaso = () => {
    if (validarPaso()) {
      setPaso(p => Math.min(p + 1, 3));
    }
  };

  const pasoAnterior = () => {
    setPaso(p => Math.max(p - 1, 1));
  };

  // Manejar envío del formulario
  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validarPaso()) return;

    // Verificación temporal de las variables de entorno
    console.log('EmailJS Config:', {
      serviceId: EMAILJS_CONFIG.SERVICE_ID,
      templateId: EMAILJS_CONFIG.TEMPLATE_ID,
      publicKey: EMAILJS_CONFIG.PUBLIC_KEY
    });

    // Validar que las variables de entorno estén configuradas
    if (!EMAILJS_CONFIG.SERVICE_ID || !EMAILJS_CONFIG.TEMPLATE_ID || !EMAILJS_CONFIG.PUBLIC_KEY) {
      setError('Error de configuración: Las credenciales de EmailJS no están configuradas correctamente.');
      return;
    }
    
    setEnviando(true);
    setError('');
    
    try {
      const templateParams = {
        from_name: datosFormulario.nombre,
        from_email: datosFormulario.email,
        subject: datosFormulario.asunto || 'Nuevo mensaje de contacto',
        budget: datosFormulario.presupuesto || 'No especificado',
        message: datosFormulario.mensaje,
      };

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      setEnviado(true);
      setDatosFormulario({ nombre: '', email: '', asunto: '', presupuesto: '', mensaje: '' });
      setPaso(1);
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      setError('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente o usa los datos de contacto directos.');
    } finally {
      setEnviando(false);
    }
  };

  // Opciones para el presupuesto
  const opcionesPresupuesto = [
    'Menos de $500',
    '$500 - $1,000',
    '$1,000 - $2,500',
    '$2,500 - $5,000',
    'Más de $5,000',
    'Por definir'
  ];

  // Variantes de animación para transiciones de pasos
  const variantesPaso = {
    inicial: { opacity: 0, x: 50 },
    entrada: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        duration: 0.5
      }
    },
    salida: { 
      opacity: 0, 
      x: -50,
      transition: {
        duration: 0.3
      }
    }
  };

  // Mostrar el título del paso actual
  const mostrarTituloPaso = () => {
    switch (paso) {
      case 1:
        return (
          <div className="flex items-center gap-2 text-2xl font-bold text-white mb-6">
            <FaUser className="text-emerald-300" />
            <span>Información básica</span>
          </div>
        );
      case 2:
        return (
          <div className="flex items-center gap-2 text-2xl font-bold text-white mb-6">
            <MdWork className="text-emerald-300" />
            <span>Detalles del proyecto</span>
          </div>
        );
      case 3:
        return (
          <div className="flex items-center gap-2 text-2xl font-bold text-white mb-6">
            <FaComment className="text-emerald-300" />
            <span>Tu mensaje</span>
          </div>
        );
      default:
        return null;
    }
  };

  // Mostrar el contenido del paso actual
  const mostrarPasoActual = () => {
    switch (paso) {
      case 1:
        return (
          <motion.div
            key="paso1"
            variants={variantesPaso}
            initial="inicial"
            animate="entrada"
            exit="salida"
            className="space-y-6"
          >
            <div>
              <label htmlFor="nombre" className="block text-gray-300 mb-2 font-medium">
                Nombre <span className="text-emerald-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={datosFormulario.nombre}
                  onChange={manejarCambio}
                  className={`w-full pl-12 pr-4 py-3 bg-neutral-700 border ${
                    errores.nombre ? 'border-red-500' : 'border-neutral-600'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent text-white transition-all duration-300`}
                  placeholder="Tu nombre completo"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-300">
                  <FaUser />
                </span>
                {datosFormulario.nombre && !errores.nombre && (
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400">
                    <FaCheck />
                  </span>
                )}
              </div>
              {errores.nombre && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <MdError />
                  {errores.nombre}
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-gray-300 mb-2 font-medium">
                Email <span className="text-emerald-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={datosFormulario.email}
                  onChange={manejarCambio}
                  className={`w-full pl-12 pr-4 py-3 bg-neutral-700 border ${
                    errores.email ? 'border-red-500' : 'border-neutral-600'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent text-white transition-all duration-300`}
                  placeholder="tu-email@ejemplo.com"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-300">
                  <FaEnvelope />
                </span>
                {datosFormulario.email && !errores.email && validarEmail(datosFormulario.email) && (
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400">
                    <FaCheck />
                  </span>
                )}
              </div>
              {errores.email && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <MdError />
                  {errores.email}
                </p>
              )}
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key="paso2"
            variants={variantesPaso}
            initial="inicial"
            animate="entrada"
            exit="salida"
            className="space-y-6"
          >
            <div>
              <label htmlFor="asunto" className="block text-gray-300 mb-2 font-medium">
                Asunto del proyecto
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="asunto"
                  name="asunto"
                  value={datosFormulario.asunto}
                  onChange={manejarCambio}
                  className="w-full pl-12 pr-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent text-white transition-all duration-300"
                  placeholder="Ej: Desarrollo de sitio web"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-300">
                  <MdWork />
                </span>
              </div>
            </div>
            
            <div>
              <label htmlFor="presupuesto" className="block text-gray-300 mb-2 font-medium">
                Presupuesto estimado
              </label>
              <select
                id="presupuesto"
                name="presupuesto"
                value={datosFormulario.presupuesto}
                onChange={manejarCambio}
                className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent text-white transition-all duration-300 appearance-none"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", backgroundPosition: "right 0.5rem center", backgroundRepeat: "no-repeat", backgroundSize: "1.5em 1.5em", paddingRight: "2.5rem" }}
              >
                <option value="" disabled>Selecciona un rango</option>
                {opcionesPresupuesto.map((opcion) => (
                  <option key={opcion} value={opcion}>
                    {opcion}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 text-emerald-300">
              <div className="flex items-start gap-2">
                <div className="mt-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm">La información de presupuesto es opcional pero ayuda a entender mejor el alcance de tu proyecto.</p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            key="paso3"
            variants={variantesPaso}
            initial="inicial"
            animate="entrada"
            exit="salida"
            className="space-y-6"
          >
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="mensaje" className="block text-gray-300 font-medium">
                  Mensaje <span className="text-emerald-400">*</span>
                </label>
                <span className="text-xs text-gray-400">
                  {datosFormulario.mensaje.length}/500 caracteres
                </span>
              </div>
              <textarea
                id="mensaje"
                name="mensaje"
                value={datosFormulario.mensaje}
                onChange={manejarCambio}
                maxLength={500}
                rows={6}
                className={`w-full px-4 py-3 bg-neutral-700 border ${
                  errores.mensaje ? 'border-red-500' : 'border-neutral-600'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent text-white transition-all duration-300 resize-none`}
                placeholder="Describe tu proyecto o consulta en detalle..."
              ></textarea>
              {errores.mensaje && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <MdError />
                  {errores.mensaje}
                </p>
              )}
            </div>
            
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 text-emerald-300">
              <div className="flex items-start gap-2">
                <div className="mt-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm">Tu mensaje será enviado directamente a mi correo electrónico y te responderé en un plazo máximo de 24 horas.</p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {mostrarTituloPaso()}
      
      <AnimatePresence mode="wait">
        {enviado ? (
          <SuccessMessage setEnviado={setEnviado} />
        ) : (
          <motion.form 
            key="formularioContacto"
            onSubmit={manejarEnvio} 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Contenido del paso actual */}
            <AnimatePresence mode="wait">
              {mostrarPasoActual()}
            </AnimatePresence>
            
            {/* Mensajes de error */}
            {error && (
              <motion.div 
                className="bg-red-500/20 border border-red-500 rounded-lg p-3 text-red-300"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  {error}
                </div>
              </motion.div>
            )}
            
            {/* Navegación de pasos */}
            <div className="flex justify-between mt-8 flex-wrap gap-4">
              {paso > 1 && (
                <button
                  type="button"
                  onClick={pasoAnterior}
                  className="px-6 py-2.5 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg transition-all duration-300 flex items-center gap-2"
                >
                  <FaArrowLeft size={14} />
                  Anterior
                </button>
              )}
              
              <div className="flex-grow"></div>
              
              {paso < 3 ? (
                <button
                  type="button"
                  onClick={siguientePaso}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg shadow-lg shadow-emerald-600/30 transition-all duration-300 flex items-center gap-2"
                >
                  Siguiente
                  <FaArrowRight size={14} />
                </button>
              ) : (
                <SubmitButton enviando={enviando} />
              )}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </>
  );
};

export default ContactForm;