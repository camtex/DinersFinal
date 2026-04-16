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
      <div className="container">
        <div className="mx-auto flex max-w-6xl flex-col overflow-hidden rounded-[3rem] border border-diners-gray-1 bg-diners-white-sand/50 shadow-2xl lg:flex-row">
          <div className="relative flex flex-col justify-center overflow-hidden bg-diners-twilight p-12 text-white lg:w-2/5 lg:p-16">
            <div className="absolute top-0 right-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-diners-lakefront/10" />
            <div className="relative z-10">
              <h2 className="mb-8 text-4xl font-black leading-tight">Se parte de nuestro <span className="text-diners-blue-sky">Ecosistema</span></h2>
              <p className="mb-10 text-lg font-light leading-relaxed text-diners-gray-1">
                Registrate para recibir informacion exclusiva sobre vacantes, mentorias y eventos de Diners Club Peru.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                    <CheckCircle2 className="w-5 h-5 text-diners-blue-sky" />
                  </div>
                  <span className="text-sm font-medium">Acceso prioritario a vacantes</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                    <CheckCircle2 className="w-5 h-5 text-diners-blue-sky" />
                  </div>
                  <span className="text-sm font-medium">Invitaciones a Masterclasses</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-12 lg:w-3/5 lg:p-16">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex h-full flex-col items-center justify-center text-center"
              >
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-diners-lakefront/10">
                  <CheckCircle2 className="w-10 h-10 text-diners-lakefront" />
                </div>
                <h3 className="mb-4 text-3xl font-black text-diners-twilight">Registro Exitoso</h3>
                <p className="max-w-md text-lg font-light text-diners-twilight-65">
                  Gracias por tu interes. Pronto nos pondremos en contacto contigo para iniciar tu camino en Diners.
                </p>
                <Button variant="outline" onClick={() => setSubmitted(false)} className="mt-10 rounded-full px-8">
                  Volver al formulario
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid gap-8 sm:grid-cols-2">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-diners-twilight">Nombre Completo</Label>
                    <Input id="name" placeholder="Ej. Ana Garcia" required className="h-14 rounded-xl border-diners-gray-4 focus:ring-diners-lakefront/20" />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-diners-twilight">Correo Electronico</Label>
                    <Input id="email" type="email" placeholder="ana@ejemplo.com" required className="h-14 rounded-xl border-diners-gray-4 focus:ring-diners-lakefront/20" />
                  </div>
                </div>
                <div className="grid gap-8 sm:grid-cols-2">
                  <div className="space-y-3">
                    <Label htmlFor="area" className="text-[10px] font-black uppercase tracking-widest text-diners-twilight">Area de Interes</Label>
                    <select id="area" className="h-14 w-full rounded-xl border border-diners-gray-4 bg-white px-4 text-sm focus:outline-none focus:ring-2 focus:ring-diners-lakefront/20">
                      {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="program" className="text-[10px] font-black uppercase tracking-widest text-diners-twilight">Programa de Origen</Label>
                    <select id="program" className="h-14 w-full rounded-xl border border-diners-gray-4 bg-white px-4 text-sm focus:outline-none focus:ring-2 focus:ring-diners-lakefront/20">
                      <option value="none">Ninguno</option>
                      <option value="chicastec">+ChicasTec (UNICEF)</option>
                      <option value="oit">Programa OIT</option>
                      <option value="other">Otro programa</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="linkedin" className="text-[10px] font-black uppercase tracking-widest text-diners-twilight">LinkedIn (Opcional)</Label>
                  <Input id="linkedin" placeholder="linkedin.com/in/tuperfil" className="h-14 rounded-xl border-diners-gray-4 focus:ring-diners-lakefront/20" />
                </div>
                <Button type="submit" className="mt-4 h-16 w-full rounded-full bg-diners-blue-sky text-lg font-black text-white shadow-xl transition-all hover:bg-diners-hover">
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
