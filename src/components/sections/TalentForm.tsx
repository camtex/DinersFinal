import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CATEGORIES } from '../../data/mockData';

import { db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";
import { loginWithGoogle } from "@/auth";

export const TalentForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    area: "",
    program: "",
    linkedin: ""
  });

  // 🔄 manejar inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  // 🔥 submit normal
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "talent"), {
        ...formData,
        createdAt: new Date()
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  // 🔐 login con Google
  const handleGoogleLogin = async () => {
    try {
      const user = await loginWithGoogle();

      // guardar en Firestore
      await addDoc(collection(db, "talent"), {
        name: user.displayName,
        email: user.email,
        uid: user.uid,
        createdAt: new Date()
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Error con Google:", error);
    }
  };

  return (
    <section id="registro" className="py-40 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(4,30,66,0.15)] ring-1 ring-diners-gray-1">

          {/* LEFT */}
          <div className="lg:w-[45%] bg-diners-twilight p-14 md:p-20 text-white flex flex-col justify-center">
            <div>
              <h2 className="text-5xl font-black mb-6">
                Sé parte de nuestro <span className="text-accent">Ecosistema.</span>
              </h2>
              <p className="text-lg text-white/60">
                Accede a oportunidades exclusivas y networking profesional.
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:w-[55%] p-14 md:p-20 bg-white flex flex-col">

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center"
              >
                <CheckCircle2 className="w-16 h-16 text-accent mb-6" />
                <h3 className="text-3xl font-bold mb-4">¡Registro exitoso!</h3>

                <Button onClick={() => setSubmitted(false)}>
                  Volver
                </Button>
              </motion.div>
            ) : (

              <div className="space-y-6">

                {/* 🔐 BOTÓN GOOGLE */}
                <Button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full bg-white text-black border border-gray-300 hover:bg-gray-100 h-14 rounded-xl font-semibold flex items-center justify-center gap-3"
                >
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    className="w-5 h-5"
                  />
                  Continuar con Google
                </Button>

                {/* separador */}
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-xs text-gray-400">o</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-6">

                  <div>
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="area">Especialidad</Label>
                    <select
                      id="area"
                      value={formData.area}
                      onChange={handleChange}
                      className="w-full border p-3 rounded-lg"
                    >
                      <option value="">Seleccionar</option>
                      {CATEGORIES.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="program">Programa</Label>
                    <select
                      id="program"
                      value={formData.program}
                      onChange={handleChange}
                      className="w-full border p-3 rounded-lg"
                    >
                      <option value="">Seleccionar</option>
                      <option value="chicastec">+ChicasTec</option>
                      <option value="oit">OIT</option>
                      <option value="other">Referido</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Confirmar Registro
                    <Send className="ml-2 w-4 h-4" />
                  </Button>

                </form>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};