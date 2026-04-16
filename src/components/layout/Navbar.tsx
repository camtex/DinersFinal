import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';

type NavbarProps = {
  logoSrc?: string;
};

const navItems = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/ecosistema', label: 'Propuesta' },
  { to: '/explora', label: 'Rutas' },
  { to: '/postula', label: 'Postula' },
];

export const Navbar = ({ logoSrc }: NavbarProps) => (
  <nav className="sticky top-0 z-50 w-full border-b border-white/35 bg-white/58 shadow-[0_10px_35px_rgba(4,30,66,0.06)] backdrop-blur-xl">
    <div className="container flex h-20 items-center justify-between gap-6">
      <Link to="/" className="flex items-center gap-3">
        {logoSrc ? (
          <img src={logoSrc} alt="Logo Diners Club" className="h-11 w-auto object-contain" />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-diners-twilight shadow-sm">
            <span className="text-sm font-black text-white">D</span>
          </div>
        )}
        <div className="flex flex-col">
          <span className="text-lg font-black leading-none tracking-tight text-diners-twilight">Diners Club</span>
          <span className="text-xs font-medium uppercase tracking-[0.22em] text-diners-lakefront">Peru</span>
        </div>
      </Link>

      <div className="hidden items-center gap-3 md:flex">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] transition-all ${
                isActive
                  ? 'bg-diners-blue-sky text-white shadow-md'
                  : 'text-diners-twilight hover:bg-diners-blue-sky/10 hover:text-diners-hover'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}

        <Button asChild variant="default" className="ml-2 h-11 rounded-full bg-diners-blue-sky px-8 font-bold text-white shadow-md transition-all hover:bg-diners-hover hover:shadow-lg">
          <Link to="/postula">Quiero participar</Link>
        </Button>
      </div>
    </div>
  </nav>
);
