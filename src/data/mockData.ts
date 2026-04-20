import React from 'react';
import {
  Cpu,
  TrendingUp,
  Target,
  Shield,
  Globe,
  Zap
} from 'lucide-react';
import type { Role, Category, QuizQuestion, LearningPath, Challenge, Vacancy } from '../types'

export const CATEGORIES: Category[] = [
  {
    id: 'dev',
    name: 'Desarrollo de Software',
    icon: React.createElement(Cpu, { className: "w-6 h-6" }),
    description: 'Crea las aplicaciones y sistemas que impulsan nuestra banca digital.'
  },
  {
    id: 'data',
    name: 'Datos y analitica',
    icon: React.createElement(TrendingUp, { className: "w-6 h-6" }),
    description: 'Transforma datos en decisiones estrategicas y modelos predictivos.'
  },
  {
    id: 'uxui',
    name: 'Experiencia y producto digital',
    icon: React.createElement(Target, { className: "w-6 h-6" }),
    description: 'Disena experiencias centradas en el usuario y productos innovadores.'
  },
  {
    id: 'cyber',
    name: 'Ciberseguridad',
    icon: React.createElement(Shield, { className: "w-6 h-6" }),
    description: 'Protege la integridad y privacidad de la informacion de nuestros socios.'
  },
  {
    id: 'infra',
    name: 'Infraestructura y soporte',
    icon: React.createElement(Globe, { className: "w-6 h-6" }),
    description: 'Manten la base tecnologica solida y disponible 24/7.'
  },
];

export const ROLES: Role[] = [
  {
    id: '1',
    title: 'Gerente de Tecnologia',
    category: 'dev',
    description: 'Lidera la vision tecnologica global y la estrategia de innovacion de Diners Club Peru.',
    skills: ['Vision estrategica', 'Liderazgo ejecutivo', 'Gestion de portafolio', 'Innovacion'],
    interests: ['Estrategia', 'Transformacion digital', 'Liderazgo'],
    route: ['Evaluacion ejecutiva', 'Entrevista con directorio', 'Plan estrategico', 'Integracion']
  },
  {
    id: '2',
    title: 'Subgerente de Desarrollo',
    category: 'dev',
    description: 'Supervisa los equipos de ingenieria y asegura la calidad tecnica de todas las soluciones.',
    skills: ['Arquitectura de software', 'Gestion de equipos', 'Metodologias agiles', 'DevOps'],
    interests: ['Ingenieria', 'Liderazgo tecnico', 'Calidad'],
    route: ['Entrevista tecnica', 'Evaluacion de liderazgo', 'Caso practico', 'Contratacion']
  },
  {
    id: '3',
    title: 'Jefe de Gobierno de Datos',
    category: 'data',
    description: 'Asegura la calidad, integridad y seguridad de los activos de datos de la organizacion.',
    skills: ['Gobierno de datos', 'SQL', 'Politicas de datos', 'Cumplimiento'],
    interests: ['Datos', 'Gobernanza', 'Estrategia'],
    route: ['Prueba de datos', 'Entrevista especializada', 'Validacion de procesos', 'Ingreso']
  },
  {
    id: '4',
    title: 'Especialista de Desarrollo Integral',
    category: 'dev',
    description: 'Desarrollador experto encargado de las funcionalidades criticas y mentoria de analistas.',
    skills: ['React', 'Node.js', 'Nube', 'Mentoria'],
    interests: ['Programacion', 'Mentoria', 'Arquitectura'],
    route: ['Codigo en vivo', 'Entrevista tecnica', 'Afinidad cultural', 'Oferta']
  },
  {
    id: '5',
    title: 'Analista de Ciberseguridad',
    category: 'cyber',
    description: 'Monitorea y responde ante incidentes de seguridad, protegiendo el perimetro digital.',
    skills: ['SOC', 'Pruebas de penetracion', 'ISO 27001', 'Analisis de riesgos'],
    interests: ['Seguridad', 'Investigacion', 'Tecnologia'],
    route: ['Evaluacion de seguridad', 'Entrevista tecnica', 'Validacion de antecedentes', 'Ingreso']
  },
  {
    id: '6',
    title: 'Practicante de UX/UI',
    category: 'uxui',
    description: 'Apoya en el diseno de interfaces y prototipado, aprendiendo de los mejores especialistas.',
    skills: ['Figma', 'Investigacion de usuarios', 'Prototipado', 'Empatia'],
    interests: ['Diseno', 'Aprendizaje', 'Experiencia de Usuario'],
    route: ['Revision de portafolio', 'Entrevista inicial', 'Pequeno reto de diseno', 'Convenio']
  },
  {
    id: '7',
    title: 'Analista de Infraestructura Cloud',
    category: 'infra',
    description: 'Administra servicios en la nube, monitoreo y continuidad operativa para plataformas criticas.',
    skills: ['Nube', 'DevOps', 'Automatizacion', 'Monitoreo'],
    interests: ['Infraestructura', 'Continuidad', 'Arquitectura'],
    route: ['Filtro curricular', 'Entrevista tecnica', 'Ejercicio de arquitectura', 'Ingreso']
  },
  {
    id: '8',
    title: 'Analista de Producto Digital',
    category: 'uxui',
    description: 'Conecta necesidades del negocio y de los usuarios para priorizar funcionalidades de alto impacto.',
    skills: ['Discovery', 'Figma', 'Analisis de negocio', 'Prototipado'],
    interests: ['Producto', 'Experiencia de Usuario', 'Innovacion'],
    route: ['Revision de casos', 'Entrevista con producto', 'Presentacion de propuesta', 'Oferta']
  },
  {
    id: '9',
    title: 'Especialista en Automatizacion de Procesos',
    category: 'dev',
    description: 'Construye soluciones de automatizacion para reducir tareas manuales y acelerar operaciones clave.',
    skills: ['Automatizacion', 'Python', 'Integraciones', 'Analisis de procesos'],
    interests: ['Optimizacion', 'Transformacion digital', 'Ingenieria'],
    route: ['Entrevista inicial', 'Reto practico', 'Entrevista tecnica', 'Contratacion']
  },
  {
    id: '10',
    title: 'Analista de Riesgo Operacional Digital',
    category: 'cyber',
    description: 'Evalua controles, riesgos y continuidad en procesos digitales para proteger la operacion del negocio.',
    skills: ['Analisis de riesgos', 'Cumplimiento', 'Continuidad', 'Control interno'],
    interests: ['Seguridad', 'Control', 'Operacion'],
    route: ['Evaluacion de criterios', 'Entrevista especializada', 'Caso de riesgo', 'Ingreso']
  }
];

export const ALL_SKILLS = Array.from(new Set(ROLES.flatMap(r => r.skills))).sort();
export const ALL_INTERESTS = Array.from(new Set(ROLES.flatMap(r => r.interests))).sort();

export const VACANCIES: Vacancy[] = [
  {
    id: 'vac-dev',
    title: 'Practicante de Desarrollo',
    type: 'Hibrido',
    area: 'Ingenieria Digital',
    description: 'Ideal para perfiles que quieren aprender en proyectos reales con acompanamiento tecnico cercano.',
  },
  {
    id: 'vac-data',
    title: 'Analista de Datos',
    type: 'Tiempo completo',
    area: 'Datos y analitica',
    description: 'Rol orientado a transformacion de datos, visualizacion y soporte a decisiones clave del negocio.',
  },
  {
    id: 'vac-cyber',
    title: 'Especialista de Seguridad',
    type: 'Tiempo completo',
    area: 'Ciberseguridad',
    description: 'Posicion para fortalecer controles, monitoreo y evolucion de practicas de seguridad corporativa.',
  },
  {
    id: 'vac-ux',
    title: 'Practicante UX/UI',
    type: 'Remoto flexible',
    area: 'Diseno de Producto',
    description: 'Vacante para apoyar en investigacion, prototipado y mejoras de experiencia digital.',
  },
  {
    id: 'vac-ops',
    title: 'Analista de Operaciones Digitales',
    type: 'Tiempo completo',
    area: 'Operaciones',
    description: 'Rol enfocado en continuidad operativa, seguimiento de indicadores y mejora de procesos.',
  },
];

export const TRAIT_LABELS: Record<string, string> = {
  tech: 'Innovacion y tecnologia',
  finance: 'Analisis y estrategia',
  design: 'Experiencia y producto digital',
  cyber: 'Seguridad y control',
  ops: 'Operacion y ejecucion',
  commercial: 'Conexion y negocio',
  talent: 'Acompanamiento y talento',
};

export const QUIZ_ROLE_MAPPINGS: Record<string, { skills: string[]; interests: string[] }> = {
  tech: {
    skills: ['React', 'Node.js', 'Nube', 'Automatizacion'],
    interests: ['Programacion', 'Arquitectura', 'Ingenieria'],
  },
  finance: {
    skills: ['SQL', 'Gobierno de datos', 'Politicas de datos', 'Analisis de negocio'],
    interests: ['Datos', 'Estrategia', 'Control'],
  },
  design: {
    skills: ['Figma', 'Investigacion de usuarios', 'Prototipado', 'Discovery'],
    interests: ['Diseno', 'Experiencia de Usuario', 'Producto'],
  },
  cyber: {
    skills: ['SOC', 'Pruebas de penetracion', 'Analisis de riesgos', 'Control interno'],
    interests: ['Seguridad', 'Investigacion', 'Control'],
  },
  ops: {
    skills: ['Metodologias agiles', 'DevOps', 'Gestion de equipos', 'Continuidad'],
    interests: ['Calidad', 'Liderazgo tecnico', 'Operacion'],
  },
  commercial: {
    skills: ['Innovacion', 'Liderazgo ejecutivo', 'Gestion de portafolio', 'Analisis de negocio'],
    interests: ['Transformacion digital', 'Liderazgo', 'Producto'],
  },
  talent: {
    skills: ['Mentoria', 'Vision estrategica', 'Empatia'],
    interests: ['Aprendizaje', 'Mentoria', 'Experiencia de Usuario'],
  },
};

export const getSelectionsFromTraits = (traits: string[]) => {
  const selectedMappings = traits
    .map(trait => QUIZ_ROLE_MAPPINGS[trait])
    .filter(Boolean);

  return {
    skills: Array.from(new Set(selectedMappings.flatMap(item => item.skills))),
    interests: Array.from(new Set(selectedMappings.flatMap(item => item.interests))),
  };
};

export const getRecommendedRolesFromTraits = (traits: string[]) => {
  const { skills, interests } = getSelectionsFromTraits(traits);

  if (skills.length === 0 && interests.length === 0) {
    return [] as Array<Role & { score: number }>;
  }

  return ROLES.map(role => {
    const skillMatch = role.skills.filter(skill => skills.includes(skill)).length;
    const interestMatch = role.interests.filter(interest => interests.includes(interest)).length;
    return { ...role, score: skillMatch + interestMatch };
  })
    .filter(role => role.score > 0)
    .sort((a, b) => b.score - a.score);
};

export const getCategoryNameById = (categoryId: string) =>
  CATEGORIES.find(category => category.id === categoryId)?.name ?? 'Ruta profesional';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: 'Dimension 1 · Pensamiento',
    question: 'Cuando enfrentas un problema complejo, ¿como tiendes a abordarlo primero?',
    helper: 'No hay respuestas correctas: buscamos tu estilo natural de analisis.',
    options: [
      { text: 'Analizo datos, detecto patrones y comparo escenarios antes de decidir.', tag: 'Analitico', scores: { finance: 3, ops: 1 } },
      { text: 'Imagino una solucion digital o automatizada que pueda escalar.', tag: 'Innovacion', scores: { tech: 3, design: 1 } },
      { text: 'Pienso primero en la experiencia de las personas involucradas.', tag: 'Usuario', scores: { design: 2, talent: 2, commercial: 1 } },
      { text: 'Reviso riesgos, controles y que podria fallar en el proceso.', tag: 'Control', scores: { cyber: 3, ops: 2 } }
    ]
  },
  {
    id: 2,
    category: 'Dimension 2 · Motivacion',
    question: '¿Que es lo que mas te motiva en una experiencia profesional?',
    helper: 'Elige la situacion que mas se parece a lo que te impulsa de verdad.',
    options: [
      { text: 'Generar impacto medible en el negocio a partir de datos y decisiones.', tag: 'Impacto', scores: { finance: 3, commercial: 1 } },
      { text: 'Crear soluciones nuevas que mejoren productos o procesos.', tag: 'Creacion', scores: { tech: 2, design: 2 } },
      { text: 'Acompanhar a personas, guiarlas y ayudarlas a crecer.', tag: 'Acompanamiento', scores: { talent: 3, commercial: 1 } },
      { text: 'Asegurar orden, eficiencia y continuidad en la operacion.', tag: 'Eficiencia', scores: { ops: 3, cyber: 1 } }
    ]
  },
  {
    id: 3,
    category: 'Dimension 3 · Colaboracion',
    question: 'En un equipo, ¿que rol adoptas con mas frecuencia?',
    helper: 'Piensa en como aportas cuando el trabajo depende de varias personas.',
    options: [
      { text: 'La persona que resuelve los problemas tecnicos mas retadores.', tag: 'Resolver', scores: { tech: 3, cyber: 1 } },
      { text: 'Quien organiza, estructura y da seguimiento para que todo avance.', tag: 'Ordenar', scores: { ops: 3, talent: 1 } },
      { text: 'Quien conecta ideas, comunica bien y alinea a los demas.', tag: 'Conectar', scores: { commercial: 3, talent: 1 } },
      { text: 'Quien aterriza hallazgos, metricas o insights para decidir mejor.', tag: 'Medir', scores: { finance: 3, design: 1 } }
    ]
  },
  {
    id: 4,
    category: 'Dimension 4 · Liderazgo',
    question: 'Si tuvieras que liderar una iniciativa, ¿que estilo se pareceria mas al tuyo?',
    helper: 'La respuesta ideal es la que realmente usarias, no la que suena mejor.',
    options: [
      { text: 'Definiria objetivos claros, metricas y prioridades visibles para todos.', tag: 'Direccion', scores: { ops: 2, finance: 2, commercial: 1 } },
      { text: 'Daria autonomia al equipo para experimentar y proponer mejoras.', tag: 'Autonomia', scores: { tech: 2, design: 2 } },
      { text: 'Escucharia activamente y buscaria consenso antes de ejecutar.', tag: 'Consenso', scores: { talent: 3, commercial: 1 } },
      { text: 'Estableceria estandares de control, calidad y seguridad desde el inicio.', tag: 'Rigor', scores: { cyber: 3, ops: 1 } }
    ]
  },
  {
    id: 5,
    category: 'Dimension 5 · Entorno',
    question: '¿En que tipo de entorno sientes que entregas tu mejor trabajo?',
    helper: 'Piensa en el contexto que mas te activa y te hace rendir mejor.',
    options: [
      { text: 'En entornos agiles, dinamicos y con espacio para probar ideas.', tag: 'Agil', scores: { tech: 2, design: 2 } },
      { text: 'En entornos estructurados, donde las reglas y procesos son claros.', tag: 'Estructurado', scores: { ops: 2, cyber: 2 } },
      { text: 'En entornos donde las relaciones y la atencion al cliente importan mucho.', tag: 'Relacional', scores: { commercial: 2, talent: 2 } },
      { text: 'En entornos donde el analisis y la estrategia tienen peso en cada decision.', tag: 'Estrategia', scores: { finance: 3, commercial: 1 } }
    ]
  },
  {
    id: 6,
    category: 'Dimension 6 · Fortalezas',
    question: '¿Cual de estas fortalezas te representa mejor hoy?',
    helper: 'Escoge la fortaleza que mas reconocen en ti otras personas.',
    options: [
      { text: 'Mi capacidad para comprender sistemas, herramientas o arquitecturas.', tag: 'Sistemas', scores: { tech: 3, cyber: 1 } },
      { text: 'Mi facilidad para interpretar informacion y volverla accionable.', tag: 'Insights', scores: { finance: 3, ops: 1 } },
      { text: 'Mi criterio para disenar experiencias claras y centradas en el usuario.', tag: 'Experiencia', scores: { design: 3, commercial: 1 } },
      { text: 'Mi habilidad para acompanar, escuchar y generar confianza.', tag: 'Empatia', scores: { talent: 3, commercial: 1 } }
    ]
  },
  {
    id: 7,
    category: 'Dimension 7 · Futuro',
    question: 'Pensando en tu proximo reto, ¿que tipo de impacto te gustaria generar?',
    helper: 'Imagina el resultado que te haria sentir realmente orgullosa de tu trabajo.',
    options: [
      { text: 'Construir productos o funcionalidades digitales que mejoren el negocio.', tag: 'Producto', scores: { tech: 3, design: 1 } },
      { text: 'Optimizar decisiones, rentabilidad o modelos a partir de datos.', tag: 'Negocio', scores: { finance: 3, ops: 1 } },
      { text: 'Fortalecer la confianza, seguridad y sostenibilidad de la organizacion.', tag: 'Confianza', scores: { cyber: 3, ops: 1 } },
      { text: 'Elevar la experiencia, la comunicacion y el vinculo con las personas.', tag: 'Conexion', scores: { commercial: 2, talent: 2 } }
    ]
  },
  {
    id: 8,
    category: 'Dimension 8 · Afinidad',
    question: '¿Cual de estas areas te genera mas curiosidad profesional en este momento?',
    helper: 'Tu intuicion tambien dice mucho sobre donde podrias brillar.',
    options: [
      { text: 'Desarrollo digital, automatizacion e innovacion tecnologica.', tag: 'Digital', scores: { tech: 3 } },
      { text: 'Datos, analisis, planeamiento y decisiones de negocio.', tag: 'Datos', scores: { finance: 3 } },
      { text: 'Experiencia, diseno, marca y relacion con clientes.', tag: 'Marca', scores: { design: 2, commercial: 2 } },
      { text: 'Procesos, seguridad, continuidad y soporte al crecimiento.', tag: 'Soporte', scores: { ops: 2, cyber: 2, talent: 1 } }
    ]
  }
];

export const LEARNING_PATHS: LearningPath[] = [
  {
    title: "Fundamentos de Desarrollo Web",
    duration: "4 semanas",
    modules: ["HTML/CSS", "JavaScript Basico", "Git & GitHub"],
    icon: React.createElement(Globe, { className: "w-5 h-5" })
  },
  {
    title: "Analisis de Datos Financieros",
    duration: "6 semanas",
    modules: ["Excel Avanzado", "SQL para Finanzas", "Visualizacion"],
    icon: React.createElement(TrendingUp, { className: "w-5 h-5" })
  },
  {
    title: "Inicio en diseno UX/UI",
    duration: "5 semanas",
    modules: ["Investigacion de usuarios", "Figma basico", "Prototipado"],
    icon: React.createElement(Zap, { className: "w-5 h-5" })
  }
];

export const CHALLENGES: Challenge[] = [
  {
    title: "Seguridad Diners",
    description: "Disena un flujo de autenticacion de dos factores que sea amigable para adultos mayores.",
    difficulty: "Intermedio",
    points: 500
  },
  {
    title: "Analisis de datos",
    description: "Analiza un conjunto de datos simulado para predecir que beneficios prefieren las jovenes de 18 anos.",
    difficulty: "Avanzado",
    points: 800
  }
];
