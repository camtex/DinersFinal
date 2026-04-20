import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/ecosistema', label: 'Propuesta' },
  { to: '/beneficios', label: 'Beneficios' },
  { to: '/explora', label: 'Rutas' },
  { to: '/vacantes', label: 'Vacantes' },
];

export const Navbar = ({ logoSrc, isLoggedIn = false }: { logoSrc?: string; isLoggedIn?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const logoPath = isOpen
    ? "/TDC_horizontal.png"
    : (logoSrc || "/ColorDC_horizontal.png");

  const ctaPath = isLoggedIn ? '/dashboard' : '/postula';
  const ctaLabel = isLoggedIn ? 'Perfil' : '¡Unete!';

  // Cerrar menú al cambiar de ruta
  useEffect(() => setIsOpen(false), [location]);

  // Bloquear scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white shadow-[0_4px_20px_rgba(4,30,66,0.08)]">
      <div className="container mx-auto flex h-20 items-center justify-between gap-6 px-6">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 relative z-[80]">
          <img
            src={logoPath}
            alt="Diners Club"
            className="h-13 w-auto object-contain transition-all duration-300"
          />
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map(item => (
            <NavLink key={item.to} to={item.to} end={item.end}>
              {({ isActive }) => (
                <span className={`relative py-3 text-[11px] uppercase tracking-[0.22em] text-[#041E42] transition-all ${isActive ? 'font-black' : 'font-medium opacity-70 hover:opacity-100'}`}>
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="underline"
                      className="absolute bottom-0 left-0 h-[2px] w-full bg-[#041E42]"
                    />
                  )}
                </span>
              )}
            </NavLink>
          ))}

          <Link
            to={ctaPath}
            className="ml-4 rounded-full bg-diners-blue-sky px-7 py-2.5 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-lg"
          >
            {ctaLabel}
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button onClick={() => setIsOpen(true)} className="md:hidden text-[#041E42]">
          <Menu size={28} />
        </button>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* OVERLAY (sin blur) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 z-[60] bg-black/40"
              />

              {/* DRAWER FULL SOLID */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed inset-0 z-[70] bg-[#0A2540] text-white"
              >
                <div className="flex flex-col h-full p-8 bg-[#0A2540]">

                  {/* CLOSE */}
                  <div className="flex justify-end mb-8 pt-4">
                    <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white">
                      <X size={26} />
                    </button>
                  </div>

                  {/* CTA */}
                  <div className="mb-10">
                    <Link
                      to={ctaPath}
                      className="flex h-12 w-full items-center justify-center rounded-full bg-diners-blue-sky text-[13px] font-black uppercase tracking-widest text-white"
                    >
                      {ctaLabel}
                    </Link>
                  </div>

                  {/* LINKS */}
                  <div className="flex flex-col">
                    {navItems.map((item) => (
                      <NavLink key={item.to} to={item.to} end={item.end}>
                        {({ isActive }) => (
                          <div className={`flex items-center justify-between border-b border-white/10 py-5 ${isActive ? 'text-diners-blue-sky' : 'text-white/80'}`}>
                            <span className={`text-[13px] uppercase tracking-[0.2em] ${isActive ? 'font-black' : 'font-light'}`}>
                              {item.label}
                            </span>
                            <ChevronRight size={16} className={isActive ? 'text-diners-blue-sky' : 'opacity-30'} />
                          </div>
                        )}
                      </NavLink>
                    ))}
                  </div>

                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </nav>
  );
};
