import { Link, NavLink } from 'react-router-dom';

type NavbarProps = {
  logoSrc?: string;
};

const navItems = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/ecosistema', label: 'Propuesta' },
  { to: '/beneficios', label: 'Beneficios' },
  { to: '/explora', label: 'Rutas' },
  { to: '/vacantes', label: 'Vacantes' },
];

export const Navbar = ({ logoSrc }: NavbarProps) => {
  const logoPath = logoSrc || "/ColorDC_horizontal.png";

  return (
    // Cambios: bg-white/95 para menos transparencia y shadow-lg más profundo
    <nav className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/86 shadow-[0_4px_20px_rgba(4,30,66,0.08)] backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between gap-6 px-6">
        <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <img
            src={logoPath}
            alt="Logo Diners Club"
            className="h-12 w-auto object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map(item => (
            <NavLink key={item.to} to={item.to} end={item.end}>
              {({ isActive }) => (
                <span
                  className={`group relative inline-flex py-3 text-[11px] uppercase tracking-[0.22em] text-[#041E42] transition-all ${isActive ? 'font-black' : 'font-medium opacity-70 hover:opacity-100'
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

          <NavLink to="/postula">
            {({ isActive }) => (
              <span
                className={`inline-flex items-center justify-center rounded-full px-7 py-2.5 text-[11px] font-black uppercase tracking-[0.2em] transition-all active:scale-95 ${isActive
                  ? 'bg-[#004C97] text-white shadow-[0_8px_20px_rgba(0,76,151,0.3)]'
                  : 'bg-[#041E42] text-white hover:bg-[#004C97] hover:shadow-[0_8px_20px_rgba(4,30,66,0.2)]'
                  }`}
              >
                Iniciar
              </span>
            )}
          </NavLink>
        </div>
      </div>
    </nav>
  );
};