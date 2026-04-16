
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CATEGORIES } from '../../data/mockData';

export const CategoriesSection = () => (
  <section id="categorias" className="py-20 bg-white">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-diners-twilight mb-4">Nuestras Áreas</h2>
        <p className="text-diners-twilight-65">Explora los diferentes mundos dentro de Diners Club Perú.</p>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {CATEGORIES.map(cat => (
          <Card key={cat.id} className="border-diners-gray-1 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-xl bg-diners-lakefront/5 flex items-center justify-center text-diners-lakefront mb-4">
                {cat.icon}
              </div>
              <CardTitle className="text-lg">{cat.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-diners-twilight-65 leading-relaxed">
                {cat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);
