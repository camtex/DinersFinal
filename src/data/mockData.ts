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
    description: 'Transforma datos en decisiones estratégicas y modelos predictivos.' 
  },
  { 
    id: 'uxui', 
    name: 'UX/UI & Producto', 
    icon: React.createElement(Target, { className: "w-6 h-6" }), 
    description: 'Diseña experiencias centradas en el usuario y productos innovadores.' 
  },
  { 
    id: 'cyber', 
    name: 'Ciberseguridad', 
    icon: React.createElement(Shield, { className: "w-6 h-6" }), 
    description: 'Protege la integridad y privacidad de la información de nuestros socios.' 
  },
  { 
    id: 'infra', 
    name: 'Infraestructura & Soporte', 
    icon: React.createElement(Globe, { className: "w-6 h-6" }), 
    description: 'Mantén la base tecnológica sólida y disponible 24/7.' 
  },
];

export const ROLES: Role[] = [
  {
    id: '1',
    title: 'Gerente de Tecnología',
    category: 'dev',
    description: 'Lidera la visión tecnológica global y la estrategia de innovación de Diners Club Perú.',
    skills: ['Visión Estratégica', 'Liderazgo Ejecutivo', 'Gestión de Portafolio', 'Innovación'],
    interests: ['Estrategia', 'Transformación Digital', 'Liderazgo'],
    route: ['Evaluación Ejecutiva', 'Entrevista con Directorio', 'Plan Estratégico', 'Onboarding']
  },
  {
    id: '2',
    title: 'Subgerente de Desarrollo',
    category: 'dev',
    description: 'Supervisa los equipos de ingeniería y asegura la calidad técnica de todas las soluciones.',
    skills: ['Arquitectura de Software', 'Gestión de Equipos', 'Agile', 'DevOps'],
    interests: ['Ingeniería', 'Liderazgo Técnico', 'Calidad'],
    route: ['Entrevista Técnica', 'Evaluación de Liderazgo', 'Case Study', 'Contratación']
  },
  {
    id: '3',
    title: 'Jefe de Data Governance',
    category: 'data',
    description: 'Asegura la calidad, integridad y seguridad de los activos de datos de la organización.',
    skills: ['Data Governance', 'SQL', 'Políticas de Datos', 'Compliance'],
    interests: ['Datos', 'Gobernanza', 'Estrategia'],
    route: ['Prueba de Datos', 'Entrevista Especializada', 'Validación de Procesos', 'Ingreso']
  },
  {
    id: '4',
    title: 'Especialista de Desarrollo Full Stack',
    category: 'dev',
    description: 'Desarrollador experto encargado de las funcionalidades críticas y mentoría de analistas.',
    skills: ['React', 'Node.js', 'Cloud', 'Mentoring'],
    interests: ['Programación', 'Mentoría', 'Arquitectura'],
    route: ['Live Coding', 'Entrevista Técnica', 'Fit Cultural', 'Oferta']
  },
  {
    id: '5',
    title: 'Analista de Ciberseguridad',
    category: 'cyber',
    description: 'Monitorea y responde ante incidentes de seguridad, protegiendo el perímetro digital.',
    skills: ['SOC', 'Pentesting', 'ISO 27001', 'Análisis de Riesgos'],
    interests: ['Seguridad', 'Investigación', 'Tecnología'],
    route: ['Evaluación de Seguridad', 'Entrevista Técnica', 'Background Check', 'Ingreso']
  },
  {
    id: '6',
    title: 'Practicante de UX/UI',
    category: 'uxui',
    description: 'Apoya en el diseño de interfaces y prototipado, aprendiendo de los mejores especialistas.',
    skills: ['Figma', 'User Research', 'Prototipado', 'Empatía'],
    interests: ['Diseño', 'Aprendizaje', 'Experiencia de Usuario'],
    route: ['Revisión de Portafolio', 'Entrevista Inicial', 'Pequeño Reto de Diseño', 'Convenio']
  }
];

export const ALL_SKILLS = Array.from(new Set(ROLES.flatMap(r => r.skills))).sort();
export const ALL_INTERESTS = Array.from(new Set(ROLES.flatMap(r => r.interests))).sort();

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "¿Qué te emociona más de la tecnología?",
    options: [
      { text: "Crear aplicaciones y sitios web", trait: "tech" },
      { text: "Analizar datos para encontrar patrones", trait: "finance" },
      { text: "Diseñar experiencias para usuarios", trait: "ops" },
      { text: "Liderar equipos y proyectos", trait: "commercial" }
    ]
  },
  {
    id: 2,
    question: "En un equipo, ¿cuál es tu rol preferido?",
    options: [
      { text: "La que resuelve los problemas técnicos", trait: "tech" },
      { text: "La que organiza y planifica", trait: "talent" },
      { text: "La que comunica y vende la idea", trait: "commercial" },
      { text: "La que asegura que todo funcione perfecto", trait: "ops" }
    ]
  }
];

export const LEARNING_PATHS: LearningPath[] = [
  {
    title: "Fundamentos de Desarrollo Web",
    duration: "4 semanas",
    modules: ["HTML/CSS", "JavaScript Básico", "Git & GitHub"],
    icon: React.createElement(Globe, { className: "w-5 h-5" })
  },
  {
    title: "Análisis de Datos Financieros",
    duration: "6 semanas",
    modules: ["Excel Avanzado", "SQL para Finanzas", "Visualización"],
    icon: React.createElement(TrendingUp, { className: "w-5 h-5" })
  },
  {
    title: "UX/UI Design Starter",
    duration: "5 semanas",
    modules: ["User Research", "Figma Básico", "Prototipado"],
    icon: React.createElement(Zap, { className: "w-5 h-5" })
  }
];

export const CHALLENGES: Challenge[] = [
  {
    title: "Seguridad Diners",
    description: "Diseña un flujo de autenticación de dos factores que sea amigable para adultos mayores.",
    difficulty: "Intermedio",
    points: 500
  },
  {
    title: "Data Insights",
    description: "Analiza un set de datos (simulado) para predecir qué beneficios prefieren las jóvenes de 18 años.",
    difficulty: "Avanzado",
    points: 800
  }
];
