
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
    className="fixed inset-0 z-[60] bg-diners-twilight/40 backdrop-blur-md flex items-center justify-center p-6"
    onClick={onClose}
  >
    <motion.div 
      className="bg-white w-full max-w-5xl max-h-[90vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col"
      onClick={e => e.stopPropagation()}
    >
      <div className="p-10 border-b border-diners-gray-1 flex items-center justify-between bg-diners-white-sand/50">
        <div>
          <Badge className="bg-diners-lakefront text-white mb-2 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Ruta de Postulación</Badge>
          <h3 className="text-3xl font-black text-diners-twilight tracking-tight">{role.title}</h3>
        </div>
        <Button variant="outline" size="icon" onClick={onClose} className="rounded-full border-diners-gray-4 hover:bg-diners-twilight hover:text-white transition-all">
          <X className="w-5 h-5" />
        </Button>
      </div>

      <div className="p-10 overflow-y-auto custom-scrollbar flex-grow">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10 relative before:absolute before:left-[23px] before:top-4 before:bottom-4 before:w-[1px] before:bg-diners-gray-1">
            {role.route.map((step, index) => (
              <div key={index} className="relative pl-16 group">
                <div className="absolute left-0 top-0 w-12 h-12 rounded-2xl bg-white border border-diners-gray-1 shadow-sm flex items-center justify-center z-10 group-hover:border-diners-lakefront transition-colors">
                  <span className="text-diners-lakefront font-black text-lg">{index + 1}</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-diners-twilight mb-2">{step}</h4>
                  <p className="text-sm font-light text-diners-twilight-65 leading-relaxed">
                    {index === 0 ? "Envía tu perfil actualizado a través de nuestro portal oficial de talento." : 
                     index === role.route.length - 1 ? "¡Bienvenida a bordo! Comienza tu viaje de transformación con nosotros." :
                     "Evaluamos tus competencias técnicas y culturales para asegurar el mejor match con nuestro ADN."}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-8">
            <div className="p-8 rounded-[2rem] bg-diners-twilight text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <h4 className="text-xl font-black mb-6 relative z-10">¿Lista para aplicar?</h4>
              <ul className="space-y-4 mb-8 relative z-10">
                {[
                  "Proceso 100% transparente",
                  "Feedback en cada etapa",
                  "Acompañamiento de Talento"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-light">
                    <CheckCircle2 className="w-4 h-4 text-diners-blue-sky" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-diners-lakefront hover:bg-diners-blue-sky text-white h-14 rounded-xl font-black text-sm uppercase tracking-widest shadow-lg transition-all relative z-10">
                Postular Ahora
              </Button>
            </div>

            <div className="p-8 rounded-[2rem] bg-diners-white-sand/50 border border-diners-gray-1">
              <div className="flex items-center gap-3 mb-4 text-diners-lakefront">
                <Info className="w-5 h-5" />
                <span className="text-xs font-black uppercase tracking-widest">Dato Diners</span>
              </div>
              <p className="text-sm font-light text-diners-twilight-65 leading-relaxed">
                El 85% de nuestros líderes actuales comenzaron en posiciones junior. En Diners Club, valoramos y premiamos el crecimiento interno constante.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);
