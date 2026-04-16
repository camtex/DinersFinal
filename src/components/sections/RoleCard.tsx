import { motion } from 'framer-motion'
import { Briefcase, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { Role } from '@/types'
import { CATEGORIES } from '@/data/mockData'

export const RoleCard = ({ role, onSelect }: { role: Role, onSelect: (r: Role) => void }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="h-full flex flex-col bg-white rounded-[2rem] border border-diners-gray-1 shadow-sm hover:shadow-xl hover:border-diners-lakefront transition-all group cursor-pointer overflow-hidden"
    onClick={() => onSelect(role)}
  >
    <div className="p-8 flex flex-col h-full">
      <div className="flex justify-between items-start mb-6">
        <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest border-diners-gray-4 text-diners-twilight-65 px-3 py-1 rounded-full">
          {CATEGORIES.find(c => c.id === role.category)?.name}
        </Badge>
        <div className="w-10 h-10 rounded-xl bg-diners-white-sand flex items-center justify-center text-diners-gray-4 group-hover:bg-diners-lakefront group-hover:text-white transition-all">
          <Briefcase className="w-5 h-5" />
        </div>
      </div>
      <h3 className="text-xl font-bold text-diners-twilight group-hover:text-diners-lakefront transition-colors mb-4 leading-tight">{role.title}</h3>
      <p className="text-sm font-light text-diners-twilight-65 line-clamp-3 mb-6 leading-relaxed flex-grow">
        {role.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-8">
        {role.skills.slice(0, 3).map(s => (
          <span key={s} className="text-[10px] font-bold bg-diners-white-sand px-3 py-1 rounded-full text-diners-twilight-65 border border-diners-gray-1">{s}</span>
        ))}
        {role.skills.length > 3 && <span className="text-[10px] font-bold text-diners-lakefront self-center">+{role.skills.length - 3}</span>}
      </div>
      <div className="pt-6 border-t border-diners-gray-1 flex items-center justify-between text-diners-lakefront font-black text-xs uppercase tracking-widest">
        Ver Ruta de Postulación
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </motion.div>
);
