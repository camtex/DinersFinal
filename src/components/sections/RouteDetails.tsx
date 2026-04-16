import { motion } from 'framer-motion'
import { X, CheckCircle2, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { Role } from '@/types'

export const RouteDetails = ({ role, onClose }: { role: Role, onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="fixed inset-0 z-[60] flex items-center justify-center bg-diners-twilight/40 p-6 backdrop-blur-md"
    onClick={onClose}
  >
    <motion.div
      className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-[3rem] bg-white shadow-2xl"
      onClick={e => e.stopPropagation()}
    >
      <div className="flex items-center justify-between border-b border-diners-gray-1 bg-diners-white-sand/50 p-10">
        <div>
          <Badge className="mb-2 rounded-full bg-diners-blue-sky px-4 py-1 text-[10px] font-black uppercase tracking-widest text-white">Ruta de Postulacion</Badge>
          <h3 className="text-3xl font-black tracking-tight text-diners-twilight">{role.title}</h3>
        </div>
        <Button variant="outline" size="icon" onClick={onClose} className="rounded-full border-diners-gray-4 hover:bg-diners-blue-sky hover:text-white transition-all">
          <X className="w-5 h-5" />
        </Button>
      </div>

      <div className="custom-scrollbar flex-grow overflow-y-auto p-10">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="relative space-y-10 before:absolute before:left-[23px] before:top-4 before:bottom-4 before:w-[1px] before:bg-diners-gray-1 lg:col-span-2">
            {role.route.map((step, index) => (
              <div key={index} className="group relative pl-16">
                <div className="absolute left-0 top-0 z-10 flex h-12 w-12 items-center justify-center rounded-2xl border border-diners-gray-1 bg-white shadow-sm transition-colors group-hover:border-diners-lakefront">
                  <span className="text-lg font-black text-diners-lakefront">{index + 1}</span>
                </div>
                <div>
                  <h4 className="mb-2 text-xl font-bold text-diners-twilight">{step}</h4>
                  <p className="text-sm font-light leading-relaxed text-diners-twilight-65">
                    {index === 0 ? "Envia tu perfil actualizado a traves de nuestro portal oficial de talento."
                      : index === role.route.length - 1 ? "Bienvenida a bordo. Comienza tu viaje de transformacion con nosotros."
                        : "Evaluamos tus competencias tecnicas y culturales para asegurar el mejor match con nuestro ADN."}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-8">
            <div className="relative overflow-hidden rounded-[2rem] bg-diners-twilight p-8 text-white shadow-xl">
              <div className="absolute top-0 right-0 h-24 w-24 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5" />
              <h4 className="relative z-10 mb-6 text-xl font-black">Lista para aplicar?</h4>
              <ul className="relative z-10 mb-8 space-y-4">
                {[
                  "Proceso 100% transparente",
                  "Feedback en cada etapa",
                  "Acompanamiento de Talento"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-light">
                    <CheckCircle2 className="w-4 h-4 text-diners-blue-sky" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button className="relative z-10 h-14 w-full rounded-full bg-diners-blue-sky text-sm font-black uppercase tracking-widest text-white shadow-lg transition-all hover:bg-diners-hover">
                Postular Ahora
              </Button>
            </div>

            <div className="rounded-[2rem] border border-diners-gray-1 bg-diners-white-sand/50 p-8">
              <div className="mb-4 flex items-center gap-3 text-diners-lakefront">
                <Info className="w-5 h-5" />
                <span className="text-xs font-black uppercase tracking-widest">Dato Diners</span>
              </div>
              <p className="text-sm font-light leading-relaxed text-diners-twilight-65">
                El 85% de nuestros lideres actuales comenzaron en posiciones junior. En Diners Club, valoramos y premiamos el crecimiento interno constante.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);
