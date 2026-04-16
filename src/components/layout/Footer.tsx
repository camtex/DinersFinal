import { Link } from 'react-router-dom';

type FooterProps = {
  logoSrc?: string;
};

export const Footer = ({ logoSrc }: FooterProps) => (
  <footer className="relative overflow-hidden border-t border-diners-lakefront/20 bg-[linear-gradient(180deg,#004C97_0%,#041E42_100%)] py-24 text-white">
    <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-diners-blue-sky/10" />

    <div className="container relative z-10">
      <div className="mb-20 grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="mb-8 flex items-center gap-3">
            {logoSrc ? (
              <img src={logoSrc} alt="Logo Diners Club" className="h-12 w-auto object-contain" />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-lg rotate-3">
                <span className="text-lg font-black text-diners-twilight">D</span>
              </div>
            )}
            <span className="text-2xl font-black tracking-tight">Diners Club <span className="font-light text-diners-blue-sky">Peru</span></span>
          </div>
          <p className="mb-10 max-w-md text-lg font-light leading-relaxed text-diners-gray-1">
            Propuesta visual inspirada en la identidad corporativa de Diners Club Peru: una presencia sobria, confiable y premium, con foco en claridad, servicio y valor de marca.
          </p>
          <div className="flex gap-4">
            {['Facebook', 'LinkedIn', 'Instagram', 'Twitter'].map(social => (
              <a key={social} href="#" className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all hover:border-diners-lakefront hover:bg-diners-lakefront">
                <span className="sr-only">{social}</span>
                <div className="h-5 w-5 rounded-sm bg-diners-gray-4 transition-colors group-hover:bg-white" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12 sm:grid-cols-3 lg:col-span-7">
          <div>
            <h4 className="mb-8 text-xs font-black uppercase tracking-[0.2em] text-diners-blue-sky">Navegacion</h4>
            <ul className="space-y-4 text-sm font-light text-diners-gray-1">
              <li><Link to="/" className="transition-colors hover:text-white">Inicio</Link></li>
              <li><Link to="/ecosistema" className="transition-colors hover:text-white">Propuesta</Link></li>
              <li><Link to="/explora" className="transition-colors hover:text-white">Rutas</Link></li>
              <li><Link to="/postula" className="transition-colors hover:text-white">Postula</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-8 text-xs font-black uppercase tracking-[0.2em] text-diners-blue-sky">Marca</h4>
            <ul className="space-y-4 text-sm font-light text-diners-gray-1">
              <li><span className="transition-colors hover:text-white">Azul profundo</span></li>
              <li><span className="transition-colors hover:text-white">Fondos claros</span></li>
              <li><span className="transition-colors hover:text-white">Transparencias suaves</span></li>
              <li><span className="transition-colors hover:text-white">Acabado premium</span></li>
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h4 className="mb-8 text-xs font-black uppercase tracking-[0.2em] text-diners-blue-sky">Objetivo</h4>
            <ul className="space-y-4 text-sm font-light text-diners-gray-1">
              <li><span className="transition-colors hover:text-white">Captacion de talento</span></li>
              <li><span className="transition-colors hover:text-white">Narrativa corporativa</span></li>
              <li><span className="transition-colors hover:text-white">Experiencia modular</span></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-12 text-[10px] font-black uppercase tracking-widest text-diners-gray-4 md:flex-row">
        <p>© 2024 Diners Club Peru. Todos los derechos reservados.</p>
        <div className="flex gap-8">
          <span>Propuesta visual de marca</span>
          <span>Discover Global Network</span>
        </div>
      </div>
    </div>
  </footer>
);
