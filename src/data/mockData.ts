import React from 'react';
import {
  Cpu,
  TrendingUp,
  Target,
  Shield,
  Globe,
  Zap
} from 'lucide-react';
import type { Role, Category, QuizQuestion, LearningPath, Challenge } from '../types'

export const CATEGORIES: Category[] = [
  {
    id: 'dev',
    name: 'Desarrollo de Software',
    icon: React.createElement(Cpu, { className: "w-6 h-6" }),
    description: 'Crea las aplicaciones y sistemas que impulsan nuestra banca digital.'
  },
  {
    id: 'data',
    name: 'Data & Analytics',
    icon: React.createElement(TrendingUp, { className: "w-6 h-6" }),
    description: 'Transforma datos en decisiones estrategicas y modelos predictivos.'
  },
  {
    id: 'uxui',
    name: 'UX/UI & Producto',
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
    name: 'Infraestructura & Soporte',
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
    skills: ['Vision Estrategica', 'Liderazgo Ejecutivo', 'Gestion de Portafolio', 'Innovacion'],
    interests: ['Estrategia', 'Transformacion Digital', 'Liderazgo'],
    route: ['Evaluacion Ejecutiva', 'Entrevista con Directorio', 'Plan Estrategico', 'Onboarding']
  },
  {
    id: '2',
    title: 'Subgerente de Desarrollo',
    category: 'dev',
    description: 'Supervisa los equipos de ingenieria y asegura la calidad tecnica de todas las soluciones.',
    skills: ['Arquitectura de Software', 'Gestion de Equipos', 'Agile', 'DevOps'],
    interests: ['Ingenieria', 'Liderazgo Tecnico', 'Calidad'],
    route: ['Entrevista Tecnica', 'Evaluacion de Liderazgo', 'Case Study', 'Contratacion']
  },
  {
    id: '3',
    title: 'Jefe de Data Governance',
    category: 'data',
    description: 'Asegura la calidad, integridad y seguridad de los activos de datos de la organizacion.',
    skills: ['Data Governance', 'SQL', 'Politicas de Datos', 'Compliance'],
    interests: ['Datos', 'Gobernanza', 'Estrategia'],
    route: ['Prueba de Datos', 'Entrevista Especializada', 'Validacion de Procesos', 'Ingreso']
  },
  {
    id: '4',
    title: 'Especialista de Desarrollo Full Stack',
    category: 'dev',
    description: 'Desarrollador experto encargado de las funcionalidades criticas y mentoria de analistas.',
    skills: ['React', 'Node.js', 'Cloud', 'Mentoring'],
    interests: ['Programacion', 'Mentoria', 'Arquitectura'],
    route: ['Live Coding', 'Entrevista Tecnica', 'Fit Cultural', 'Oferta']
  },
  {
    id: '5',
    title: 'Analista de Ciberseguridad',
    category: 'cyber',
    description: 'Monitorea y responde ante incidentes de seguridad, protegiendo el perimetro digital.',
    skills: ['SOC', 'Pentesting', 'ISO 27001', 'Analisis de Riesgos'],
    interests: ['Seguridad', 'Investigacion', 'Tecnologia'],
    route: ['Evaluacion de Seguridad', 'Entrevista Tecnica', 'Background Check', 'Ingreso']
  },
  {
    id: '6',
    title: 'Practicante de UX/UI',
    category: 'uxui',
    description: 'Apoya en el diseno de interfaces y prototipado, aprendiendo de los mejores especialistas.',
    skills: ['Figma', 'User Research', 'Prototipado', 'Empatia'],
    interests: ['Diseno', 'Aprendizaje', 'Experiencia de Usuario'],
    route: ['Revision de Portafolio', 'Entrevista Inicial', 'Pequeno Reto de Diseno', 'Convenio']
  }
];

export const ALL_SKILLS = Array.from(new Set(ROLES.flatMap(r => r.skills))).sort();
export const ALL_INTERESTS = Array.from(new Set(ROLES.flatMap(r => r.interests))).sort();

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
    title: "UX/UI Design Starter",
    duration: "5 semanas",
    modules: ["User Research", "Figma Basico", "Prototipado"],
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
    title: "Data Insights",
    description: "Analiza un set de datos (simulado) para predecir que beneficios prefieren las jovenes de 18 anos.",
    difficulty: "Avanzado",
    points: 800
  }
];
