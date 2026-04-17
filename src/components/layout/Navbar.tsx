import { Link, NavLink } from 'react-router-dom';

type NavbarProps = {
  logoSrc?: string;
};

const navItems = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/ecosistema', label: 'Propuesta' },
  { to: '/explora', label: 'Rutas' },
  { to: '/postula', label: 'Postula' },
];

export const Navbar = ({ logoSrc }: NavbarProps) => {
  const logoPath = logoSrc || "/ColorDC_horizontal.png";

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/35 bg-white/58 shadow-[0_10px_35px_rgba(4,30,66,0.06)] backdrop-blur-xl">
      <div className="container flex h-20 items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logoPath}
            alt="Logo Diners Club"
            className="h-14 w-auto object-contain"
            onError={(e) => {
              // Fallback por si la imagen no existe en public
              e.currentTarget.style.display = 'none';
            }}
          />
          {/*
          <div className="flex flex-col">
            <span className="text-lg font-black leading-none tracking-tight text-diners-twilight">Diners Club</span>
            <span className="text-xs font-medium uppercase tracking-[0.22em] text-diners-lakefront">Peru</span>
          </div>*/}
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map(item => (
            <NavLink key={item.to} to={item.to} end={item.end}>
              {({ isActive }) => (
                <span
                  className={`group relative inline-flex py-3 text-[11px] uppercase tracking-[0.22em] text-[#041E42] transition-all ${isActive ? 'font-black' : 'font-medium'
                    }`}
                >
                  <span>{item.label}</span>
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] w-full origin-left bg-[#041E42] transition-transform duration-300 ease-out ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    aria-hidden="true"
                  />
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};