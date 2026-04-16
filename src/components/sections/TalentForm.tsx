import React, { useState } from 'react';
import { motion } from 'framer-motion'
import { Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CATEGORIES } from '../../data/mockData';

export const TalentForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="registro" className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto bg-diners-white-sand/50 rounded-[3rem] overflow-hidden shadow-2xl border border-diners-gray-1 flex flex-col lg:flex-row">
          <div className="lg:w-2/5 bg-diners-twilight p-12 lg:p-16 text-white flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-diners-lakefront/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <h2 className="text-4xl font-black mb-8 leading-tight">Sé parte de nuestro <span className="text-diners-blue-sky">Ecosistema</span></h2>
              <p className="text-lg font-light text-diners-gray-1 mb-10 leading-relaxed">
                Regístrate para recibir información exclusiva sobre vacantes, mentorías y eventos de Diners Club Perú.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-diners-blue-sky" />
                  </div>
                  <span className="text-sm font-medium">Acceso prioritario a vacantes</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-diners-blue-sky" />
                  </div>
                  <span className="text-sm font-medium">Invitaciones a Masterclasses</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-3/5 p-12 lg:p-16 bg-white">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center"
              >
                <div className="w-20 h-20 bg-diners-lakefront/10 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-diners-lakefront" />
                </div>
                <h3 className="text-3xl font-black text-diners-twilight mb-4">¡Registro Exitoso!</h3>
                <p className="text-lg font-light text-diners-twilight-65 max-w-md">
                  Gracias por tu interés. Pronto nos pondremos en contacto contigo para iniciar tu camino en Diners.
                </p>
                <Button variant="outline" onClick={() => setSubmitted(false)} className="mt-10 rounded-full px-8">
                  Volver al formulario
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-diners-twilight">Nombre Completo</Label>
                    <Input id="name" placeholder="Ej. Ana García" required className="rounded-xl border-diners-gray-4 h-14 focus:ring-diners-lakefront/20" />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-diners-twilight">Correo Electrónico</Label>
                    <Input id="email" type="email" placeholder="ana@ejemplo.com" required className="rounded-xl border-diners-gray-4 h-14 focus:ring-diners-lakefront/20" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label htmlFor="area" className="text-[10px] font-black uppercase tracking-widest text-diners-twilight">Área de Interés</Label>
                    <select id="area" className="w-full h-14 px-4 rounded-xl border border-diners-gray-4 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-diners-lakefront/20">
                      {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="program" className="text-[10px] font-black uppercase tracking-widest text-diners-twilight">Programa de Origen</Label>
                    <select id="program" className="w-full h-14 px-4 rounded-xl border border-diners-gray-4 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-diners-lakefront/20">
                      <option value="none">Ninguno</option>
                      <option value="chicastec">+ChicasTec (UNICEF)</option>
                      <option value="oit">Programa OIT</option>
                      <option value="other">Otro programa</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="linkedin" className="text-[10px] font-black uppercase tracking-widest text-diners-twilight">LinkedIn (Opcional)</Label>
                  <Input id="linkedin" placeholder="linkedin.com/in/tuperfil" className="rounded-xl border-diners-gray-4 h-14 focus:ring-diners-lakefront/20" />
                </div>
                <Button type="submit" className="w-full bg-diners-twilight hover:bg-diners-lakefront text-white h-16 rounded-2xl font-black text-lg shadow-xl hover:shadow-diners-lakefront/20 transition-all mt-4">
                  Registrar mi Talento
                  <Send className="ml-3 w-5 h-5" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
