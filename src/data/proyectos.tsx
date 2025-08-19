import {
  FaJava,
  FaCode,
  FaLayerGroup,
  FaDesktop,
  FaServer,
  FaSearch,
} from "react-icons/fa";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiFramer,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiJsonwebtokens,
  SiPug,
  SiBootstrap,
  SiMysql,
  SiHeroku,
  SiChatbot,
  SiVite,
  SiOdoo,
  SiPostgresql,
  SiRailway,
  SiAstro,
  SiTypescript,
  SiSpring,
  SiDocker,
} from "react-icons/si";
import Proyecto1 from "../assets/images/proyectos/portafolio.png";
import Proyecto2 from "../assets/images/proyectos/escuelaposgradounica.png";
import Proyecto3 from "../assets/images/proyectos/vinnbonn.png";
import Proyecto4 from "../assets/images/proyectos/chuchipg.png";
import Proyecto5 from "../assets/images/proyectos/administradorveterinaria.png";
import Proyecto6 from "../assets/images/proyectos/agenciaviajes.png";
import Proyecto7 from "../assets/images/proyectos/aiassistedu.png";
import Proyecto8 from "../assets/images/proyectos/sistemaadmision.png";
import Proyecto9 from "../assets/images/proyectos/generadorexamenes.png";
import Proyecto10 from "../assets/images/proyectos/escuelaposgradoodoo.png";
import Proyecto11 from "../assets/images/proyectos/innovatechica2025.png";
import Proyecto12 from "../assets/images/proyectos/calculadoraconsumo.png";

export const proyectos = [
  {
    id: 1,
    slug: "portafolio-personal",
    titulo: "Portafolio Personal",
    descripcion:
      "Sitio web personal moderno que destaca mis proyectos y habilidades técnicas. Desarrollado con Next.js y React, incluye animaciones fluidas con Framer Motion, diseño completamente responsivo y optimizado para SEO.",
    imagen: Proyecto1,
    tecnologias: [
      { nombre: "Next.js", icono: <SiNextdotjs className="text-xl" /> },
      { nombre: "React", icono: <SiReact className="text-xl" /> },
      { nombre: "Tailwind CSS", icono: <SiTailwindcss className="text-xl" /> },
      { nombre: "Framer Motion", icono: <SiFramer className="text-xl" /> },
    ],
    enlaces: [
      { tipo: "github", url: "https://github.com/MiguelVivar/Portafolio" },
      { tipo: "demo", url: "https://www.miguelvivar.engineer/" },
    ],
    destacado: true,
    estado: "en-desarrollo",
    categoria: "Front-End",
  },
  {
    id: 2,
    slug: "escuela-posgrado-unica",
    titulo: "Escuela de Posgrado UNICA",
    descripcion: "Sistema universitario completo de matrícula e intranet con arquitectura de microservicios. Backend desarrollado en Spring Boot, frontend en Next.js, base de datos PostgreSQL y containerización con Docker para escalabilidad y mantenimiento eficiente.",
    imagen: Proyecto2,
    tecnologias: [
      { nombre: "Next.js", icono: <SiNextdotjs className="text-xl" /> },
      { nombre: "Spring Boot", icono: <SiSpring className="text-xl" /> },
      { nombre: "Docker", icono: <SiDocker className="text-xl" /> },
      { nombre: "PostgreSQL", icono: <SiPostgresql className="text-xl" /> },
      { nombre: "Tailwind CSS", icono: <SiTailwindcss className="text-xl" /> },
      { nombre: "TypeScript", icono: <SiTypescript className="text-xl" /> },
    ],
    enlaces: [
      { tipo: "github", url: "https://github.com/MiguelVivar/EscuelaPosgradoUNICA" },
      { tipo: "demo", url: "https://innovatechica.github.io/" }
    ],
    destacado: true,
    estado: "terminado",
    categoria: "Front-End"
  },
  {
    id: 3,
    slug: "portafolio-vinnbonn",
    titulo: "Portafolio VinnBonn",
    descripcion:
      "Portafolio profesional personalizado para VinnBonn, con diseño elegante y moderno. Implementa animaciones suaves, navegación fluida y secciones organizadas para destacar proyectos y experiencia profesional.",
    imagen: Proyecto3,
    tecnologias: [
      { nombre: "Next.js", icono: <SiNextdotjs className="text-xl" /> },
      { nombre: "React", icono: <SiReact className="text-xl" /> },
      { nombre: "Tailwind CSS", icono: <SiTailwindcss className="text-xl" /> },
      { nombre: "Framer Motion", icono: <SiFramer className="text-xl" /> },
    ],
    enlaces: [
      { tipo: "github", url: "https://github.com/MiguelVivar/VinnBonn" },
      { tipo: "demo", url: "https://vinn-bonn.vercel.app/" },
    ],
    destacado: false,
    estado: "terminado",
    categoria: "Front-End",
  },
  {
    id: 4,
    slug: "portafolio-chuchipg",
    titulo: "Portafolio ChuchiPG",
    descripcion:
      "Sitio web portafolio diseñado para ChuchiPG, enfocado en mostrar habilidades de diseño gráfico y proyectos creativos. Cuenta con galería interactiva y presentación visual atractiva.",
    imagen: Proyecto4,
    tecnologias: [
      { nombre: "Next.js", icono: <SiNextdotjs className="text-xl" /> },
      { nombre: "React", icono: <SiReact className="text-xl" /> },
      { nombre: "Tailwind CSS", icono: <SiTailwindcss className="text-xl" /> },
      { nombre: "Framer Motion", icono: <SiFramer className="text-xl" /> },
    ],
    enlaces: [
      {
        tipo: "github",
        url: "https://github.com/MiguelVivar/Calculadora_Consumo_Propinas",
      },
      { tipo: "demo", url: "https://calculadoraconsumopropinas.netlify.app/" },
    ],
    destacado: false,
    estado: "terminado",
    categoria: "Front-End",
  },
  {
    id: 5,
    slug: "administrador-veterinaria",
    titulo: "Administrador de Veterinaria",
    descripcion:
      "Sistema de gestión integral para clínicas veterinarias. Incluye registro de pacientes, historial médico, citas, autenticación segura de usuarios y panel administrativo. Desarrollado con stack MERN completo.",
    imagen: Proyecto5,
    tecnologias: [
      { nombre: "React", icono: <SiReact className="text-xl" /> },
      { nombre: "Tailwind CSS", icono: <SiTailwindcss className="text-xl" /> },
      { nombre: "NodeJS", icono: <SiNodedotjs className="text-xl" /> },
      { nombre: "Express", icono: <SiExpress className="text-xl" /> },
      { nombre: "MongoDB", icono: <SiMongodb className="text-xl" /> },
      { nombre: "JWT", icono: <SiJsonwebtokens className="text-xl" /> },
    ],
    enlaces: [
      {
        tipo: "github",
        url: "https://github.com/MiguelVivar/APV_MERN_frontend",
      },
    ],
    destacado: true,
    estado: "terminado",
    categoria: "Full-Stack",
  },
  {
    id: 6,
    slug: "agencia-de-viajes",
    titulo: "Agencia de Viajes",
    descripcion:
      "Plataforma web completa para agencia de viajes con catálogo de destinos, sistema de reservas y gestión de clientes. Implementa arquitectura MVC, base de datos MySQL y diseño responsivo con Bootstrap.",
    imagen: Proyecto6,
    tecnologias: [
      { nombre: "Pug", icono: <SiPug className="text-xl" /> },
      { nombre: "NodeJS", icono: <SiNodedotjs className="text-xl" /> },
      { nombre: "Boostrap", icono: <SiBootstrap className="text-xl" /> },
      { nombre: "MySQL", icono: <SiMysql className="text-xl" /> },
      { nombre: "Heroku", icono: <SiHeroku className="text-xl" /> },
    ],
    enlaces: [
      {
        tipo: "github",
        url: "https://github.com/MiguelVivar/AgenciaViajesNodeJS",
      },
    ],
    destacado: false,
    estado: "terminado",
    categoria: "Full-Stack",
  },
  {
    id: 7,
    slug: "aiassistedu",
    titulo: "AiAssistEdu",
    descripcion:
      "Plataforma educativa potenciada por inteligencia artificial que incluye un chatbot inteligente para soporte estudiantil. Genera tickets automáticos, responde consultas académicas y proporciona asistencia 24/7 a estudiantes.",
    imagen: Proyecto7,
    tecnologias: [
      { nombre: "React", icono: <SiReact className="text-xl" /> },
      { nombre: "Tailwind CSS", icono: <SiTailwindcss className="text-xl" /> },
      { nombre: "Voiceflow", icono: <SiChatbot className="text-xl" /> },
    ],
    enlaces: [{ tipo: "demo", url: "https://gjpf.edu.pe/aiassistedu/" }],
    destacado: false,
    estado: "terminado",
    categoria: "Front-End",
  },
  {
    id: 8,
    slug: "sistema-admision",
    titulo: "Sistema de Admisión",
    descripcion:
      "Aplicación de escritorio robusta para gestionar procesos de admisión académica. Implementa patrón MVC, lectura de archivos DBF legacy, procesamiento de datos masivo y generación de reportes. Interfaz gráfica intuitiva desarrollada en Java.",
    imagen: Proyecto8,
    tecnologias: [{ nombre: "Java", icono: <FaJava className="text-xl" /> }],
    enlaces: [
      { tipo: "github", url: "https://github.com/MiguelVivar/SistemaAdmision" },
    ],
    destacado: true,
    estado: "terminado",
    categoria: "Software",
  },
  {
    id: 9,
    slug: "generador-examenes",
    titulo: "Generador de Exámenes",
    descripcion:
      "Herramienta automatizada para la creación de exámenes académicos. Permite gestionar bancos de preguntas, generar evaluaciones aleatorias, configurar parámetros de dificultad y exportar en múltiples formatos.",
    imagen: Proyecto9,
    tecnologias: [{ nombre: "Java", icono: <FaJava className="text-xl" /> }],
    enlaces: [
      {
        tipo: "github",
        url: "https://github.com/MiguelVivar/GeneradorExamenes",
      },
    ],
    destacado: true,
    estado: "terminado",
    categoria: "Software",
  },
  {
    id: 10,
    slug: "escuela-posgrado-odoo",
    titulo: "Escuela de Posgrado Odoo",
    descripcion:
      "Sistema ERP educativo personalizado desarrollado en Odoo para gestión integral de posgrados. Incluye módulos de admisión, matrícula, seguimiento académico, gestión financiera y reportes analíticos con base de datos PostgreSQL.",
    imagen: Proyecto10,
    tecnologias: [
      { nombre: "Odoo", icono: <SiOdoo className="text-xl" /> },
      { nombre: "PostgreSQL", icono: <SiPostgresql className="text-xl" /> },
      { nombre: "Railway", icono: <SiRailway className="text-xl" /> },
    ],
    enlaces: [
      {
        tipo: "demo",
        url: "https://escuelaposgradoodoo-production.up.railway.app/",
      },
    ],
    destacado: true,
    estado: "en-desarrollo",
    categoria: "Front-End",
  },
  {
    id: 11,
    slug: "innovatech-ica-2025",
    titulo: "InnovaTech Ica 2025",
    descripcion: "Landing page oficial del evento tecnológico InnovaTech Ica 2025. Diseño moderno y responsivo con información del evento, cronograma de actividades, registro de participantes y enlaces a redes sociales. Optimizada para SEO y rendimiento.",
    imagen: Proyecto11,
    tecnologias: [
      { nombre: "Astro", icono: <SiAstro className="text-xl" /> },
      { nombre: "Tailwind CSS", icono: <SiTailwindcss className="text-xl" /> },
      { nombre: "TypeScript", icono: <SiTypescript className="text-xl" /> },
    ],
    enlaces: [
      { tipo: "github", url: "https://github.com/InnovaTechIca/InnovaTechIca.github.io" },
      { tipo: "demo", url: "https://innovatechica.github.io/" }
    ],
    destacado: true,
    estado: "terminado",
    categoria: "Front-End"
  },
  {
    id: 12,
    slug: "calculadora-consumo-propinas",
    titulo: "Calculadora de Consumo Y Propinas",
    descripcion:
      "Aplicación web interactiva para calcular el total de consumo y propinas en restaurantes. Desarrollada con React y Vite, incluye una interfaz intuitiva y cálculos en tiempo real con validación de datos.",
    imagen: Proyecto12,
    tecnologias: [
      { nombre: "Vite", icono: <SiVite className="text-xl" /> },
      { nombre: "React", icono: <SiReact className="text-xl" /> },
      { nombre: "Tailwind CSS", icono: <SiTailwindcss className="text-xl" /> },
      { nombre: "Framer Motion", icono: <SiFramer className="text-xl" /> },
    ],
    enlaces: [
      {
        tipo: "github",
        url: "https://github.com/MiguelVivar/Calculadora_Consumo_Propinas",
      },
      { tipo: "demo", url: "https://calculadoraconsumopropinas.netlify.app/" },
    ],
    destacado: false,
    estado: "terminado",
    categoria: "Front-End",
  },
];

// Categorías para el filtro
export const categorias = [
  { id: "todos", nombre: "Todos", icono: <FaSearch className="text-xl" /> },
  {
    id: "Full-Stack",
    nombre: "Full-Stack",
    icono: <FaLayerGroup className="text-xl" />,
  },
  {
    id: "Front-End",
    nombre: "Front-End",
    icono: <FaDesktop className="text-xl" />,
  },
  {
    id: "Back-End",
    nombre: "Back-End",
    icono: <FaServer className="text-xl" />,
  },
  { id: "Software", nombre: "Software", icono: <FaCode className="text-xl" /> },
];
