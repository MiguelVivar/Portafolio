import React from "react";
import {
  FaLightbulb,
  FaHandshake,
  FaClock,
  FaRocket,
  FaCode,
  FaTeamspeak,
  FaUsers,
  FaGraduationCap,
  FaDesktop,
  FaTools,
  FaCogs,
  FaLaptop,
  FaKeyboard,
  FaMouse,
  FaChair,
} from "react-icons/fa";

// Tipos exportados para usar en componentes
export interface CertificadoCategoria {
  categoria: string;
  certificados: {
    titulo: string;
    emisor: string;
    anio: string;
    link: string;
  }[];
}

export type CertificadoData = CertificadoCategoria;

export interface IdiomaData {
  idioma: string;
  nivel: string;
}

export interface ValorData {
  titulo: string;
  descripcion: string;
  icono: React.ReactNode;
}

export interface CarreraData {
  carrera: string;
  universidad: string;
  cicloActual: number;
  ciclosTotales: number;
  porcentajeCompletado: number;
  fechaInicio: string;
  fechaEstimadaFinalizacion: string;
  estadoActual: string;
}

export interface VoluntariadoData {
  organizacion: string;
  rol: string;
  periodo: string;
  descripcion: string;
  actividades: string[];
  icono: React.ReactNode;
  color: string;
}

export interface SetupData {
  hardware: {
    titulo: string;
    descripcion: string;
    icono: React.ReactNode;
  }[];
  software: {
    titulo: string;
    descripcion: string;
    icono: React.ReactNode;
  }[];
  workflow: {
    titulo: string;
    descripcion: string;
    icono: React.ReactNode;
  }[];
}

// Datos para la sección de certificados
export const certificados: CertificadoData[] = [
  {
    categoria: "Desarrollo Web",
    certificados: [
      {
        titulo: "Responsive Web Desing",
        emisor: "freeCodeCamp",
        anio: "2024",
        link: "https://www.freecodecamp.org/certification/fcc334e614b-0f23-4bd8-b91f-a031321a21a2/responsive-web-design",
      },
      {
        titulo: "JavaScript Algorithms and Data Structures",
        emisor: "freeCodeCamp",
        anio: "2025",
        link: "https://www.freecodecamp.org/certification/fcc334e614b-0f23-4bd8-b91f-a031321a21a2/javascript-algorithms-and-data-structures-v8",
      },
    ],
  },
  {
    categoria: "Computación",
    certificados: [
      {
        titulo: "Computer Hardware Basics",
        emisor: "Cisco",
        anio: "2024",
        link: "https://www.credly.com/badges/22310860-c565-4787-94c2-33ed830d1c92/linked_in_profile",
      },
    ],
  },
  {
    categoria: "Lenguajes de Programación",
    certificados: [
      {
        titulo: "Python Essentials 1",
        emisor: "Cisco",
        anio: "2025",
        link: "https://www.credly.com/badges/ae417aae-6e1c-487a-9032-fdf90c763309",
      },
    ],
  },
  {
    categoria: "Cloud Computing",
    certificados: [
      {
        titulo: "Google Cloud StudyJam 2025",
        emisor: "GDG Ica",
        anio: "2025",
        link: "https://www.linkedin.com/in/miguel-vivar-farfan/overlay/1751068874148/single-media-viewer/?type=DOCUMENT&profileId=ACoAAE3Im6IBa7CZ4Tbl0-z2NPhOgwRGuD2IYS8",
      },
    ],
  },
];

// Datos para la sección de idiomas
export const idiomas: IdiomaData[] = [
  {
    idioma: "Español",
    nivel: "Nativo",
  },
  {
    idioma: "Inglés",
    nivel: "Básico (A2)",
  },
];

// Datos para la sección de valores
export const valores: ValorData[] = [
  {
    titulo: "Innovación",
    descripcion:
      "Busco constantemente nuevas formas de resolver problemas y mejorar procesos mediante la tecnología.",
    icono: <FaLightbulb className="w-8 h-8" />,
  },
  {
    titulo: "Compromiso",
    descripcion:
      "Me dedico completamente a cada proyecto, cumpliendo con los tiempos y superando expectativas.",
    icono: <FaHandshake className="w-8 h-8" />,
  },
  {
    titulo: "Calidad",
    descripcion:
      "Me esfuerzo por escribir código limpio, mantenible y eficiente en cada proyecto.",
    icono: <FaCode className="w-8 h-8" />,
  },
  {
    titulo: "Puntualidad",
    descripcion:
      "Valoro el tiempo propio y ajeno, cumpliendo plazos y manteniendo una gestión eficiente.",
    icono: <FaClock className="w-8 h-8" />,
  },
  {
    titulo: "Colaboración",
    descripcion:
      "Creo en el poder del trabajo en equipo para lograr resultados excepcionales.",
    icono: <FaTeamspeak className="w-8 h-8" />,
  },
  {
    titulo: "Proactividad",
    descripcion:
      "Tomo la iniciativa para identificar oportunidades y resolver problemas antes de que escalen.",
    icono: <FaRocket className="w-8 h-8" />,
  },
];

// Datos para la sección de carrera universitaria
export const carrera: CarreraData = {
  carrera: "Ingeniería de Sistemas",
  universidad: "Universidad Nacional de Ingeniería",
  cicloActual: 4,
  ciclosTotales: 10,
  porcentajeCompletado: 40,
  fechaInicio: "2023",
  fechaEstimadaFinalizacion: "2027",
  estadoActual: "En curso",
};

// Datos para la sección de voluntariados
export const voluntariados: VoluntariadoData[] = [
  {
    organizacion: "Google Developer Groups Ica (GDG Ica)",
    rol: "Team Member",
    periodo: "2024 - Presente",
    descripcion:
      "Participación activa en la comunidad tecnológica local, colaborando en eventos y workshops para promover el desarrollo de habilidades en tecnologías Google.",
    actividades: [
      "Organización de eventos y workshops técnicos",
      "Desarrollo de la plataforma web del GDG Ica"
    ],
    icono: <FaUsers className="w-8 h-8" />,
    color: "from-blue-500 to-green-500",
  },
  {
    organizacion: "InnovaTech Ica 2025",
    rol: "Organizador",
    periodo: "2025",
    descripcion:
      "Evento de innovación tecnológica en Ica, donde se busca fomentar el emprendimiento y la creación de soluciones tecnológicas para la región.",
    actividades: [
      "Gestión de redes sociales y promoción del evento",
      "Desarrollo de la página web del evento",
    ],
    icono: <FaGraduationCap className="w-8 h-8" />,
    color: "from-purple-500 to-pink-500",
  },
];

// Datos para la sección de setup de desarrollo
export const setupData: SetupData = {
  hardware: [
    {
      titulo: "Laptop HP Victus",
      descripcion:
        "Intel i5, 32GB RAM, RTX 3050 - Potente y portátil para desarrollo y gaming",
      icono: <FaLaptop className="w-8 h-8" />,
    },
    {
      titulo: "Monitor Teros TE-2471G Dual Setup",
      descripcion:
        "Configuración de doble monitor para mayor productividad - código en una pantalla, documentación en otra",
      icono: <FaDesktop className="w-8 h-8" />,
    },
    {
      titulo: "Teclado Mecánico Redragon Kumara K552",
      descripcion:
        "Teclado mecánico con retroiluminación RGB - comodidad y estilo para largas horas de codificación",
      icono: <FaKeyboard className="w-8 h-8" />,
    },
    {
      titulo: "Mouse Gaming Logitech G502 Hero",
      descripcion:
        "Mouse ergonómico con múltiples botones programables - optimiza mi flujo de trabajo",
      icono: <FaMouse className="w-8 h-8" />,
    },
    {
      titulo: "Silla Gamer",
      descripcion:
        "Silla ergonómica para largas horas de trabajo - comodidad y soporte lumbar",
      icono: <FaChair className="w-8 h-8" />,
    },
    {
      titulo: "Soporte para Laptop",
      descripcion:
        "Soporte ajustable para laptop - mejora la ergonomía y la ventilación",
      icono: <FaLaptop className="w-8 h-8" />,
    },
  ],
  software: [
    {
      titulo: "Visual Studio Code",
      descripcion:
        "Mi editor principal con extensiones como Prettier, ESLint, GitLens y temas personalizados para una experiencia óptima",
      icono: <FaCode className="w-8 h-8" />,
    },
    {
      titulo: "Git & GitHub",
      descripcion:
        "Control de versiones esencial para todos mis proyectos, con workflows automatizados y CI/CD",
      icono: <FaTools className="w-8 h-8" />,
    },
    {
      titulo: "Figma & Canva",
      descripcion:
        "Para diseño UI/UX y creación de prototipos antes de desarrollar, manteniendo consistency en el diseño",
      icono: <FaTools className="w-8 h-8" />,
    },
  ],
  workflow: [
    {
      titulo: "Metodología Agile",
      descripcion:
        "Desarrollo iterativo con sprints cortos, planning y retrospectivas para mejora continua",
      icono: <FaCogs className="w-8 h-8" />,
    },
    {
      titulo: "Test-Driven Development",
      descripcion:
        "Escribo pruebas antes del código para garantizar calidad y mantenibilidad del software",
      icono: <FaCogs className="w-8 h-8" />,
    },
    {
      titulo: "Code Review & Documentation",
      descripcion:
        "Revisión de código en equipo y documentación detallada para proyectos escalables y mantenibles",
      icono: <FaCogs className="w-8 h-8" />,
    },
  ],
};
