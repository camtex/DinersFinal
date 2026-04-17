import { motion } from 'framer-motion'
import { X, CheckCircle2, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { Role } from '@/types'
import {
  isUserRegistered,
  savePendingVacancyApplication,
  setPostLoginRedirect,
} from '@/lib/dashboardStorage'

export const RouteDetails = ({ role, onClose }: { role: Role, onClose: () => void }) => {
  const navigate = useNavigate();

  const handleApply = () => {
    savePendingVacancyApplication({
      vacancyId: `role-${role.id}`,
      vacancyTitle: role.title,
      area: 'Ruta recomendada',
      type: 'Proceso guiado',
      description: role.description,
    });
    setPostLoginRedirect('/dashboard');
    onClose();
    navigate(isUserRegistered() ? '/dashboard' : '/postula');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#041E42]/80 p-4 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-[4rem] bg-[#F7F7F7] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/20"
        onClick={e => e.stopPropagation()}
      >
        {/* HEADER: AZUL OSCURO PROFUNDO */}
        <div className="relative overflow-hidden bg-[#041E42] px-8 py-12 md:px-16 md:py-16 text-white">
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <Badge className="mb-6 border-none bg-[#00A3E0] px-4 py-1 text-[10px] font-black uppercase tracking-[0.3em] text-white">
                Career Path Selection
              </Badge>
              <h3 className="text-4xl font-black tracking-tighter md:text-6xl lg:text-7xl leading-[0.9]">
                {role.title}
              </h3>
              <p className="mt-6 text-lg font-light text-white/50 leading-relaxed">
                Diseñamos esta ruta para potenciar tu perfil hacia el estándar más alto de nuestra banca digital.
              </p>
            </div>

            <button
              onClick={onClose}
              className="group flex h-16 w-16 items-center justify-center rounded-full bg-white/5 border border-white/10 transition-all hover:bg-white/20"
            >
              <X className="h-6 w-6 text-white transition-transform group-hover:rotate-90" />
            </button>
          </div>

          {/* Decoración de fondo del header */}
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[#00A3E0]/10 blur-[100px]" />
          <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-[#004C97]/20 blur-[80px]" />
        </div>

        {/* CONTENIDO: GRIS CLARO EDITORIAL */}
        <div className="custom-scrollbar flex-grow overflow-y-auto bg-[#F7F7F7] p-8 md:p-16">
          <div className="grid gap-16 lg:grid-cols-12">

            {/* IZQUIERDA: LINEA DE TIEMPO */}
            <div className="lg:col-span-7 space-y-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] flex-grow bg-slate-200" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Tu Hoja de Ruta</span>
                <div className="h-[1px] flex-grow bg-slate-200" />
              </div>

              {role.route.map((step, index) => (
                <div key={index} className="flex gap-8 group">
                  <div className="flex flex-col items-center">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white border border-slate-200 shadow-sm transition-all group-hover:bg-[#00A3E0] group-hover:border-[#00A3E0]">
                      <span className="text-xl font-black text-[#041E42] group-hover:text-white">{index + 1}</span>
                    </div>
                    {index !== role.route.length - 1 && (
                      <div className="h-full w-[2px] bg-slate-200 my-2" />
                    )}
                  </div>
                  <div className="pb-10">
                    <h4 className="text-2xl font-black text-[#041E42] tracking-tight mb-2 uppercase text-xs tracking-[0.2em] opacity-40">Etapa {index + 1}</h4>
                    <h5 className="text-2xl font-black text-[#041E42] mb-4">{step}</h5>
                    <p className="text-slate-500 font-light leading-relaxed max-w-md">
                      {index === 0 ? "Inicia tu proceso conectando tu visión con la nuestra. Buscamos perfiles que desafíen el status quo."
                        : index === role.route.length - 1 ? "Comienza tu entrenamiento de alto nivel y despliega tu potencial en la red global."
                          : "Evaluaciones dinámicas centradas en tus habilidades core y adaptabilidad cultural."}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* DERECHA: SIDEBAR DE ACCIÓN OSCURO */}
            <div className="lg:col-span-5 space-y-8">
              <div className="sticky top-0 space-y-6">

                {/* CARD DE ACCIÓN */}
                <div className="rounded-[3rem] bg-white p-10 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.05)] border border-white">
                  <h4 className="text-2xl font-black text-[#041E42] mb-6 tracking-tight italic">Consolida tu postulación</h4>
                  <div className="space-y-4 mb-10">
                    {[
                      { icon: ShieldCheck, text: "Garantía de Feedback real" },
                      { icon: Sparkles, text: "Seguimiento personalizado" },
                      { icon: CheckCircle2, text: "Cultura 100% colaborativa" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 text-sm font-bold text-slate-600">
                        <item.icon className="h-5 w-5 text-[#00A3E0]" />
                        {item.text}
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={handleApply}
                    className="h-16 w-full rounded-full bg-[#00A3E0] text-xs font-black uppercase tracking-[0.3em] text-white transition-all hover:bg-[#041E42] hover:scale-[1.02] shadow-xl shadow-[#00A3E0]/20"
                  >
                    Postular Ahora <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                {/* DATO EXTRA: AZUL DINERS */}
                <div className="rounded-[3rem] bg-[#004C97] p-10 text-white shadow-2xl relative overflow-hidden">
                  <div className="relative z-10">
                    <Sparkles className="mb-4 h-8 w-8 text-[#00A3E0]" />
                    <p className="text-lg font-light leading-relaxed">
                      "En Diners Club, valoramos el <strong>pensamiento disruptivo</strong>. El 80% de nuestros proyectos de IA nacen de iniciativas de nuestros colaboradores."
                    </p>
                  </div>
                  {/* Círculo decorativo */}
                  <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/5" />
                </div>

              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};