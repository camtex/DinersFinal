type FooterProps = {
  logoSrc?: string;
};

export const Footer = ({ logoSrc }: FooterProps) => (
  <footer className="bg-diners-twilight text-white py-24 border-t border-diners-lakefront/20 relative overflow-hidden">
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-diners-lakefront/5 rounded-full translate-y-1/2 translate-x-1/2 pointer-events-none" />

    <div className="container relative z-10">
      <div className="grid lg:grid-cols-12 gap-16 mb-20">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3 mb-8">
            {logoSrc ? (
              <img src={logoSrc} alt="Logo Diners Club" className="h-12 w-auto object-contain" />
            ) : (
              <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-lg rotate-3">
                <span className="text-diners-twilight font-black text-lg">D</span>
              </div>
            )}
            <span className="font-black tracking-tight text-2xl">Diners Club <span className="font-light text-diners-blue-sky">Peru</span></span>
          </div>
          <p className="text-diners-gray-1 font-light text-lg leading-relaxed max-w-md mb-10">
            Pertenecemos a una red global de excelencia. En Peru, somos lideres en brindar experiencias exclusivas y soluciones financieras de alto valor, impulsando el talento del futuro.
          </p>
          <div className="flex gap-4">
            {['Facebook', 'LinkedIn', 'Instagram', 'Twitter'].map(social => (
              <a key={social} href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-diners-lakefront hover:border-diners-lakefront transition-all group">
                <span className="sr-only">{social}</span>
                <div className="w-5 h-5 bg-diners-gray-4 group-hover:bg-white transition-colors rounded-sm" />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-12">
          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-8 text-diners-blue-sky">Compania</h4>
            <ul className="space-y-4 text-sm font-light text-diners-gray-1">
              <li><a href="#" className="hover:text-white transition-colors">Sobre Nosotros</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sostenibilidad</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Noticias</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-8 text-diners-blue-sky">Legal</h4>
            <ul className="space-y-4 text-sm font-light text-diners-gray-1">
              <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terminos y Condiciones</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Libro de Reclamaciones</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-8 text-diners-blue-sky">Talento</h4>
            <ul className="space-y-4 text-sm font-light text-diners-gray-1">
              <li><a href="#" className="hover:text-white transition-colors">ELLAS DIGITAL</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Vacantes</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Beneficios</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-widest text-diners-gray-4">
        <p>© 2024 Diners Club Peru. Todos los derechos reservados.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Desarrollado con Excelencia</a>
          <a href="#" className="hover:text-white transition-colors">Discover Global Network</a>
        </div>
      </div>
    </div>
  </footer>
);
