import React, { useState } from 'react'
import { Send, Loader2, Mail, Phone, MapPin, CheckCircle, AlertCircle } from 'lucide-react'

// Webhook URL configurable (se puede sobreescribir con variables de entorno de Vercel/Netlify)
const WEBHOOK_URL = import.meta.env.VITE_CONTACT_WEBHOOK_URL || 'https://hook.us1.make.com/example-webhook-id';

function ContactSection() {
  const [formData, setFormData] = useState({
    nombre: '',
    clinica: '',
    sector: '',
    telefono: '',
    dolor: ''
  });

  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!formData.nombre.trim()) tempErrors.nombre = 'El nombre es obligatorio.';
    if (!formData.clinica.trim()) tempErrors.clinica = 'El nombre de la clínica es obligatorio.';
    if (!formData.sector) tempErrors.sector = 'Selecciona un sector.';
    if (!formData.telefono.trim()) {
      tempErrors.telefono = 'El teléfono es obligatorio.';
    } else if (!/^\+?[0-9\s-]{9,15}$/.test(formData.telefono)) {
      tempErrors.telefono = 'El formato del teléfono no es válido.';
    }
    if (!formData.dolor.trim()) tempErrors.dolor = 'Cuéntanos brevemente cuál es tu dolor de cabeza actual.';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
          origin: window.location.hostname
        })
      });

      // Nota: Si Make/n8n devuelve 200/204 o texto plano, lo manejamos correctamente.
      if (response.ok) {
        setStatus('success');
        setFormData({
          nombre: '',
          clinica: '',
          sector: '',
          telefono: '',
          dolor: ''
        });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error al enviar el formulario al webhook:', error);
      // fallback a éxito para pruebas locales si el webhook no está configurado todavía,
      // pero en producción mostraremos error si falla la red.
      // Para simular y evitar bloqueos en el test inicial, dejamos que falle o muestre error técnico.
      setStatus('error');
    }
  };

  return (
    <section id="contacto" className="relative py-24 z-20 bg-brand-dark/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cobalt/20 border border-brand-electric/30 text-brand-accent text-xs font-semibold">
              <span>Contacto Directo</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-white leading-tight">
              ¿Listo para multiplicar las citas de tu clínica?
            </h2>
            <p className="text-brand-silver font-light leading-relaxed">
              Completa el formulario y analizaremos tu caso de forma personalizada. Si lo prefieres, puedes escribirnos o llamarnos directamente por WhatsApp para agendar una llamada.
            </p>

            <div className="border-t border-white/5 pt-8 space-y-6">
              
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-accent">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-brand-silver uppercase tracking-wider">WhatsApp / Teléfono</div>
                  <a href="https://wa.me/34694262425" className="text-base font-semibold text-white hover:text-brand-accent transition-colors duration-200">
                    +34 694 26 24 25
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-accent">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-brand-silver uppercase tracking-wider">Correo Electrónico</div>
                  <a href="mailto:medeliteia@gmail.com" className="text-base font-semibold text-white hover:text-brand-accent transition-colors duration-200">
                    medeliteia@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-accent">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-brand-silver uppercase tracking-wider">Ubicación</div>
                  <div className="text-base font-semibold text-white">
                    España
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-2xl p-8 border border-white/5">
              
              {status === 'success' ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-serif text-white">¡Solicitud Recibida!</h3>
                  <p className="text-sm text-brand-silver font-light max-w-md mx-auto leading-relaxed">
                    Hemos registrado los datos de tu clínica con éxito. Nos pondremos en contacto contigo a través de WhatsApp o teléfono en menos de 24 horas para coordinar tu análisis inicial.
                  </p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-xs text-brand-accent hover:underline focus:outline-none"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {status === 'error' && (
                    <div className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/25 flex items-start gap-3 text-rose-200 text-xs">
                      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-semibold">Error al enviar:</span> En estos momentos el webhook de pruebas no está conectado. Por favor, haz clic directamente en los botones de <a href="https://wa.me/34694262425" className="underline hover:text-white font-medium">WhatsApp (+34 694 26 24 25)</a> para agendar directamente.
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Nombre */}
                    <div>
                      <label htmlFor="nombre" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Nombre completo</label>
                      <input
                        type="text"
                        name="nombre"
                        id="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        className={`w-full bg-white/5 border rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-brand-electric focus:ring-1 focus:ring-brand-electric transition-all ${
                          errors.nombre ? 'border-rose-500/50' : 'border-white/10'
                        }`}
                        placeholder="Ej. Rafael José"
                      />
                      {errors.nombre && <p className="text-rose-400 text-[10px] mt-1.5">{errors.nombre}</p>}
                    </div>

                    {/* Clínica */}
                    <div>
                      <label htmlFor="clinica" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Nombre de la clínica</label>
                      <input
                        type="text"
                        name="clinica"
                        id="clinica"
                        value={formData.clinica}
                        onChange={handleChange}
                        className={`w-full bg-white/5 border rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-brand-electric focus:ring-1 focus:ring-brand-electric transition-all ${
                          errors.clinica ? 'border-rose-500/50' : 'border-white/10'
                        }`}
                        placeholder="Ej. Clínica Dental MedElite"
                      />
                      {errors.clinica && <p className="text-rose-400 text-[10px] mt-1.5">{errors.clinica}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Sector */}
                    <div>
                      <label htmlFor="sector" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Sector de actividad</label>
                      <select
                        name="sector"
                        id="sector"
                        value={formData.sector}
                        onChange={handleChange}
                        className={`w-full bg-slate-900 border rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-brand-electric focus:ring-1 focus:ring-brand-electric transition-all ${
                          errors.sector ? 'border-rose-500/50' : 'border-white/10'
                        }`}
                      >
                        <option value="">Selecciona una opción</option>
                        <option value="dental">Clínica Dental</option>
                        <option value="veterinaria">Clínica Veterinaria</option>
                        <option value="estetica">Centro de Estética</option>
                        <option value="belleza">Salón de Belleza</option>
                      </select>
                      {errors.sector && <p className="text-rose-400 text-[10px] mt-1.5">{errors.sector}</p>}
                    </div>

                    {/* Teléfono */}
                    <div>
                      <label htmlFor="telefono" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Teléfono / WhatsApp</label>
                      <input
                        type="text"
                        name="telefono"
                        id="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        className={`w-full bg-white/5 border rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-brand-electric focus:ring-1 focus:ring-brand-electric transition-all ${
                          errors.telefono ? 'border-rose-500/50' : 'border-white/10'
                        }`}
                        placeholder="+34 694 26 24 25"
                      />
                      {errors.telefono && <p className="text-rose-400 text-[10px] mt-1.5">{errors.telefono}</p>}
                    </div>
                  </div>

                  {/* Mayor dolor de cabeza */}
                  <div>
                    <label htmlFor="dolor" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">¿Cuál es tu mayor dolor de cabeza actual?</label>
                    <textarea
                      name="dolor"
                      id="dolor"
                      rows="4"
                      value={formData.dolor}
                      onChange={handleChange}
                      className={`w-full bg-white/5 border rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-brand-electric focus:ring-1 focus:ring-brand-electric transition-all resize-none ${
                        errors.dolor ? 'border-rose-500/50' : 'border-white/10'
                      }`}
                      placeholder="Ej. Se nos escapan pacientes fuera de horario porque no podemos contestar llamadas al instante o tenemos muchos no-shows..."
                    />
                    {errors.dolor && <p className="text-rose-400 text-[10px] mt-1.5">{errors.dolor}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl text-white font-semibold bg-gradient-to-r from-brand-cobalt to-brand-electric shadow-lg shadow-brand-cobalt/20 hover:shadow-brand-electric/30 disabled:opacity-50 transition-all duration-300"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Enviando información...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Enviar Solicitud y Agendar Análisis</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default ContactSection
