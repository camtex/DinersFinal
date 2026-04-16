import { Button } from '@/components/ui/button';

type NavbarProps = {
  logoSrc?: string;
};

export const Navbar = ({ logoSrc }: NavbarProps) => (
  <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b border-diners-gray-1">
    <div className="container h-20 flex items-center justify-between gap-6">
      <div className="flex items-center gap-3">
        {logoSrc ? (
          <img src="ColorDC_horizontal.png" alt="Logo Diners Club" className="h-11 w-auto object-contain" />
        ) : (
          <div className="w-10 h-10 bg-diners-twilight rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white font-black text-sm">D</span>
          </div>
        )}
        <div className="flex flex-col">
          <span className="font-black text-diners-twilight tracking-tight text-lg leading-none">Diners Club</span>
          <span className="font-light text-diners-lakefront text-xs uppercase tracking-[0.2em]">Peru</span>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-8 lg:gap-10">
        <a href="#inicio" className="text-xs font-bold uppercase tracking-widest text-diners-twilight hover:text-diners-lakefront transition-all">Inicio</a>
        <a href="#explorar" className="text-xs font-bold uppercase tracking-widest text-diners-twilight hover:text-diners-lakefront transition-all">Explorar</a>
        <a href="#rutas" className="text-xs font-bold uppercase tracking-widest text-diners-twilight hover:text-diners-lakefront transition-all">Rutas</a>
        <Button variant="default" className="bg-diners-twilight hover:bg-diners-lakefront text-white rounded-full px-8 h-11 font-bold shadow-md hover:shadow-lg transition-all">
          Ver Vacantes
        </Button>
      </div>
    </div>
  </nav>
);
