import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { RoleCard } from './RoleCard'
import { RouteDetails } from './RouteDetails'
import type { Role } from '../../types'

interface ResultsSectionProps {
  selectedRole: Role | null;
  setSelectedRole: (role: Role | null) => void;
  filteredRoles: Role[];
  setShowResults: (show: boolean) => void;
  setSelectedSkills: (skills: string[]) => void;
  setSelectedInterests: (interests: string[]) => void;
  scrollToExploration: () => void;
}

export const ResultsSection = ({
  selectedRole,
  setSelectedRole,
  filteredRoles,
  setShowResults,
  setSelectedSkills,
  setSelectedInterests,
  scrollToExploration
}: ResultsSectionProps) => {
  return (
    <div className="container mx-auto px-4">
      {!selectedRole ? (
        <>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-bold text-diners-twilight mb-2">Oportunidades para ti</h2>
              <p className="text-diners-twilight-65">Basado en tu perfil y preferencias seleccionadas.</p>
            </div>
            <Button variant="outline" onClick={() => {
              setShowResults(false);
              setSelectedSkills([]);
              setSelectedInterests([]);
            }} className="rounded-full">
              Reiniciar búsqueda
            </Button>
          </div>

          {filteredRoles.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRoles.map(role => (
                <motion.div
                  key={role.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <RoleCard role={role} onSelect={setSelectedRole} />
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center border-dashed border-2 border-diners-gray-4 bg-transparent">
              <div className="w-16 h-16 bg-diners-gray-1 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-diners-gray-4" />
              </div>
              <h3 className="text-xl font-bold text-diners-twilight mb-2">No encontramos un match exacto</h3>
              <p className="text-diners-twilight-65 mb-6">Intenta seleccionar más habilidades o intereses para ampliar la búsqueda.</p>
              <Button onClick={scrollToExploration} variant="secondary">Ajustar Selección</Button>
            </Card>
          )}
        </>
      ) : (
        <RouteDetails role={selectedRole} onClose={() => setSelectedRole(null)} />
      )}
    </div>
  );
};
