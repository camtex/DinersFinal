type LinkItem = {
  name: string;
  url: string;
};

type Section = {
  title: string;
  links: LinkItem[];
  extra?: string[];
};

type FooterProps = {
  logoSrc?: string;
};

export const Footer = ({ logoSrc }: FooterProps) => {
  const finalLogo = logoSrc || "/TDC_horizontal.png";

  const topSections: Section[] = [
    {
      title: "Nosotros",
      links: [
        { name: "Historia", url: "https://dinersclub.pe/nuestra-historia" },
        { name: "Misión, Visión y Valores", url: "https://dinersclub.pe/nuestro-club" },
        { name: "Trabaja con Nosotros", url: "https://dinersclub.pe/trabaja-con-nosotros" },
        { name: "Sostenibilidad", url: "https://dinersclub.pe/home-sostenibilidad" }
      ],
      extra: [
        "Agencias: Lunes - Viernes 9am - 6pm",
        "Sábado 9am - 1pm",
        "Atención tlf: Lunes - Domingo 9am - 6pm"
      ]
    },
    {
      title: "Para usted",
      links: [
        { name: "Tarjetas", url: "https://dinersclub.pe/tarjetas" },
        { name: "Estado de Cuenta", url: "https://files.dinersclub.com.pe/EECC-DC-explicativo[2021].pdf" },
        { name: "Servicios Financieros", url: "https://dinersclub.pe/todos-los-servicios-financieros" },
        { name: "Atención al Socio", url: "https://dinersclub.pe/atencion-al-socio" },
        { name: "Soluciones", url: "https://dinersclub.pe/todas-las-soluciones" },
        { name: "Seguros", url: "https://www.dinersclubcare.pe/" },
        { name: "Reprogramación", url: "https://dinersclub.pe/reprogramacion" },
        { name: "Consejos de Seguridad", url: "https://dinersclub.pe/tips-de-seguridad" }
      ]
    },
    {
      title: "Privilegios",
      links: [
        { name: "Cuotas Sin Intereses", url: "https://dinersclub.pe/misprivilegios/home?store_type=promotions" },
        { name: "ClubMiles", url: "https://dinersclub.pe/clubmiles" },
        { name: "Asistencia Club", url: "https://dinersclub.pe/club-assistance" },
        { name: "Salas VIP", url: "https://dinersclub.pe/salas-vip-internacionales" }
      ]
    },
    {
      title: "Canales Digitales",
      links: [
        { name: "App Diners Club Perú", url: "https://dinersclub.pe/dinersclubperuapp" },
        { name: "Política + Términos", url: "https://files.dinersclub.com.pe/Politica_de_Privacidad_DCP_27.2.24_APP.pdf" },
        { name: "Envío de Comunicaciones", url: "https://dinersclub.pe/envio-de-comunicaciones-con-fines-comerciales" }
      ]
    }
  ];

  const legales: LinkItem[] = [
    { name: "Tasas y tarifas", url: "https://dinersclub.pe/informacion-contractual" },
    { name: "Consentimiento", url: "https://files.dinersclub.com.pe/Consentimiento_para_usos_adicionales.pdf" },
    { name: "Listado de Terceros", url: "https://files.dinersclub.com.pe/LISTADO%20DE%20TERCEROS%20VF%20LEGAL1911.pdf" },
    { name: "Privacidad de Datos", url: "https://files.dinersclub.com.pe/Politica_de_Privacidad.pdf" },
    { name: "Gobierno Corporativo", url: "https://dinersclub.pe/buen-gobierno-corporativo" },
    { name: "Transparencia", url: "https://dinersclub.pe/soluciones/transparencia-diners" }
  ];

  return (
    <footer className="bg-[linear-gradient(180deg,#041E42_0%,#021126_100%)] text-white pt-24 pb-12">

      <div className="max-w-[1400px] mx-auto px-6">

        {/* TOP */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 mb-20">

          {/* LOGO */}
          <div>
            <img
              src={finalLogo}
              alt="Logo"
              className="h-14 mb-6 brightness-0 invert"
            />

            <p className="text-sm text-white/70 leading-relaxed max-w-xs">
              Diners Club Perú — experiencia financiera de alto nivel con beneficios exclusivos.
            </p>
          </div>

          {/* COLUMNAS */}
          <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-12">

            {topSections.map((section, i) => (
              <div key={i}>
                <h4 className="mb-6 text-xs font-black uppercase tracking-[0.2em] text-diners-blue-sky">
                  {section.title}
                </h4>

                <ul className="space-y-3 text-sm text-white/70">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>

                {section.extra && (
                  <div className="mt-6 text-xs text-white/40 space-y-1">
                    {section.extra.map((text, k) => (
                      <p key={k}>{text}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}

          </div>
        </div>

        {/* LEGALES */}
        <div className="mb-16">
          <h4 className="mb-6 text-xs font-black uppercase tracking-[0.2em] text-diners-blue-sky">
            Legales
          </h4>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-sm text-white/70">
            {legales.map((item, i) => (
              <a key={i} href={item.url} target="_blank" className="hover:text-white transition">
                {item.name}
              </a>
            ))}
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between text-xs text-white/40">
          <p>© {new Date().getFullYear()} Diners Club Perú</p>
          <span>Términos y condiciones legales</span>
        </div>

      </div>
    </footer>
  );
};
