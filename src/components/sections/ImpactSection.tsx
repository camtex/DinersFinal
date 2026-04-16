
import { Star, Globe, Clock, Users, MapPin } from 'lucide-react';

export const ImpactSection = () => (
  <section className="py-32 bg-diners-white-sand/30">
    <div className="container mx-auto px-6">
      <div className="grid lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-7">
          <div className="inline-block px-4 py-1.5 bg-diners-lakefront/10 text-diners-lakefront text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-8">
            Nuestra Misión
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-diners-twilight mb-8 leading-tight tracking-tight">
            Compromiso con el <br />
            <span className="text-diners-tidepool">Talento Emergente</span>
          </h2>
          <p className="text-lg font-light text-diners-twilight-65 mb-12 leading-relaxed max-w-2xl">
            En Diners Club Perú, creemos que la innovación nace de la diversidad. Nuestra iniciativa <strong>ELLAS DIGITAL</strong> se enfoca en empoderar a la próxima generación de mujeres líderes en tecnología y finanzas.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-10">
            <div className="group">
              <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center text-diners-blue-sky mb-6 group-hover:scale-110 transition-transform">
                <Star className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-diners-twilight text-lg mb-3">Adolescentes (15-19 años)</h4>
              <p className="text-sm font-light text-diners-twilight-65 leading-relaxed">
                Aliados estratégicos de <strong>+ChicasTec (UNICEF Perú)</strong> para despertar vocaciones digitales tempranas.
              </p>
            </div>
            <div className="group">
              <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center text-diners-lakefront mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-diners-twilight text-lg mb-3">Jóvenes (Hasta 24 años)</h4>
              <p className="text-sm font-light text-diners-twilight-65 leading-relaxed">
                Programas de inserción laboral alineados con la <strong>OIT</strong> para facilitar tu primer paso profesional.
              </p>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-5">
          <div className="bg-diners-twilight rounded-[2rem] p-10 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <h3 className="text-2xl font-black mb-10 relative z-10 text-diners-blue-sky">Diners Club en Cifras</h3>
            <div className="space-y-8 relative z-10">
              {[
                { label: "Años en el Perú", value: "+50", icon: <Clock className="w-5 h-5" /> },
                { label: "Países Presentes", value: "+200", icon: <Globe className="w-5 h-5" /> },
                { label: "Colaboradores", value: "300-500", icon: <Users className="w-5 h-5" /> },
                { label: "Comercios Afiliados", value: "+20k", icon: <MapPin className="w-5 h-5" /> }
              ].map((stat, i) => (
                <div key={i} className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-4">
                    <div className="text-diners-blue-sky">{stat.icon}</div>
                    <span className="text-sm font-light text-white/70">{stat.label}</span>
                  </div>
                  <span className="text-xl font-black text-diners-blue-sky">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
