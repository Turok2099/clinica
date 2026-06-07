'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, ShieldAlert } from 'lucide-react';

const contactSchema = z.object({
  name: z.string()
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    .max(50, { message: 'El nombre no puede exceder los 50 caracteres' }),
  email: z.string()
    .email({ message: 'Introduce un correo electrónico válido' }),
  phone: z.string()
    .min(10, { message: 'El teléfono debe tener al menos 10 dígitos' })
    .regex(/^[0-9+\s-()]+$/, { message: 'Introduce un número de teléfono válido' }),
  message: z.string()
    .min(10, { message: 'El mensaje debe tener al menos 10 caracteres' })
    .max(500, { message: 'El mensaje no puede exceder los 500 caracteres' }),
  privacyAccepted: z.boolean()
    .refine((val) => val === true, { message: 'Debes aceptar el aviso de privacidad' }),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
      privacyAccepted: false,
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    // Simular envío a API (ej. Server Action)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitSuccess(true);
    reset();
  };

  return (
    <section className="w-full py-24 bg-white relative" id="contacto">
      <div className="container mx-auto px-6 md:px-12 xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Columna Izquierda: Información de Contacto */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div>
              <span className="text-accent font-extrabold text-sm uppercase tracking-widest mb-3 block">
                Comienza Hoy Mismo
              </span>
              <h2 className="text-slate-900 text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
                ¿Listo para iniciar tu transformación?
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed font-medium">
                Déjanos tus datos. Un especialista médico de CIP analizará tu caso y se comunicará contigo para agendar tu consulta de evaluación diagnóstica.
              </p>
            </div>

            <div className="space-y-6 pt-4">
              {/* Email */}
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-sm">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Correo Electrónico</p>
                  <a href="mailto:contacto@cipmetabolico.com" className="text-slate-700 font-bold hover:text-accent transition-colors">
                    contacto@cipmetabolico.com
                  </a>
                </div>
              </div>

              {/* Teléfono */}
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-sm">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Teléfono / WhatsApp</p>
                  <a href="tel:+525512345678" className="text-slate-700 font-bold hover:text-accent transition-colors">
                    +52 (55) 1234 5678
                  </a>
                </div>
              </div>

              {/* Dirección */}
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-sm">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Ubicación</p>
                  <p className="text-slate-700 font-bold">
                    José María Velasco 104, San José Insurgentes, CDMX
                  </p>
                </div>
              </div>
            </div>

            {/* Garantía de Privacidad */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex gap-3 items-start max-w-md">
              <ShieldAlert className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                <strong>Privacidad de Datos:</strong> CIP cumple estrictamente con el resguardo de información clínica. Tus datos serán tratados de manera confidencial y profesional únicamente para fines de tu consulta médica.
              </p>
            </div>
          </div>

          {/* Columna Derecha: Tarjeta de Formulario */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden">
              {submitSuccess ? (
                /* Estado Exitoso */
                <div className="flex flex-col items-center text-center py-8 space-y-6">
                  <div className="w-20 h-20 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shadow-sm animate-bounce">
                    <CheckCircle className="w-10 h-10 text-accent" strokeWidth={2.5} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-slate-900 text-2xl font-extrabold">¡Mensaje Enviado con Éxito!</h3>
                    <p className="text-slate-600 font-medium max-w-md">
                      Gracias por escribirnos. Nuestro equipo médico evaluará tus datos y se pondrá en contacto contigo vía WhatsApp o teléfono en menos de 24 horas hábiles.
                    </p>
                  </div>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="px-6 py-3 bg-primary hover:bg-accent text-white font-extrabold rounded-xl transition-all duration-300 shadow-md shadow-primary/20 hover:shadow-accent/30 text-sm cursor-pointer"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                /* Formulario */
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Nombre */}
                    <div className="space-y-2 text-left">
                      <label htmlFor="name" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                        Nombre Completo
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Ej. Juan Pérez"
                        className={`w-full px-4 py-3 rounded-xl bg-white border ${errors.name ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:border-primary focus:ring-primary/20'} focus:outline-none focus:ring-4 transition-all text-slate-800 font-medium text-sm`}
                        {...register('name')}
                      />
                      {errors.name && (
                        <p className="text-xs text-red-500 font-semibold mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Teléfono */}
                    <div className="space-y-2 text-left">
                      <label htmlFor="phone" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                        Número de Teléfono
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="Ej. 55 1234 5678"
                        className={`w-full px-4 py-3 rounded-xl bg-white border ${errors.phone ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:border-primary focus:ring-primary/20'} focus:outline-none focus:ring-4 transition-all text-slate-800 font-medium text-sm`}
                        {...register('phone')}
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-500 font-semibold mt-1">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Correo Electrónico */}
                  <div className="space-y-2 text-left">
                    <label htmlFor="email" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      Correo Electrónico
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="juan.perez@example.com"
                      className={`w-full px-4 py-3 rounded-xl bg-white border ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:border-primary focus:ring-primary/20'} focus:outline-none focus:ring-4 transition-all text-slate-800 font-medium text-sm`}
                      {...register('email')}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 font-semibold mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Mensaje */}
                  <div className="space-y-2 text-left">
                    <label htmlFor="message" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      Cuéntanos brevemente tu caso u objetivo
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder="Ej. Me interesa agendar una consulta para control metabólico y conocer más sobre el protocolo de pérdida de peso."
                      className={`w-full px-4 py-3 rounded-xl bg-white border ${errors.message ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:border-primary focus:ring-primary/20'} focus:outline-none focus:ring-4 transition-all text-slate-800 font-medium text-sm resize-none`}
                      {...register('message')}
                    />
                    {errors.message && (
                      <p className="text-xs text-red-500 font-semibold mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Checkbox Privacidad */}
                  <div className="space-y-2 text-left">
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        className="mt-1 rounded border-slate-300 text-accent focus:ring-accent w-4 h-4 cursor-pointer"
                        {...register('privacyAccepted')}
                      />
                      <span className="text-xs text-slate-500 font-medium leading-tight">
                        Acepto los términos del <a href="#" className="underline hover:text-primary">Aviso de Privacidad</a> y autorizo el contacto clínico.
                      </span>
                    </label>
                    {errors.privacyAccepted && (
                      <p className="text-xs text-red-500 font-semibold mt-1">{errors.privacyAccepted.message}</p>
                    )}
                  </div>

                  {/* Botón de Enviar */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-primary hover:bg-accent text-white font-extrabold rounded-2xl shadow-lg shadow-primary/20 hover:shadow-accent/30 transition-all duration-300 hover:-translate-y-1 flex justify-center items-center gap-2 cursor-pointer disabled:opacity-75 disabled:pointer-events-none"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Solicitar Evaluación de Caso</span>
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
  );
}
