import { FaJava, FaCode, FaLayerGroup, FaDesktop, FaServer, FaSearch } from 'react-icons/fa';
import { SiReact, SiNextdotjs, SiTailwindcss, SiFramer, SiNodedotjs, SiExpress, SiMongodb, SiJsonwebtokens, SiPug, SiBootstrap, SiMysql, SiHeroku, SiChatbot, SiVite, SiAstro, SiTypescript } from 'react-icons/si';
import Proyecto1 from '../assets/images/proyectos/portafolio.png';
import Proyecto2 from '../assets/images/proyectos/calculadoraconsumo.png';
import Proyecto3 from '../assets/images/proyectos/vinnbonn.png';
import Proyecto4 from '../assets/images/proyectos/chuchipg.png';
import Proyecto5 from '../assets/images/proyectos/administradorveterinaria.png';
import Proyecto6 from '../assets/images/proyectos/agenciaviajes.png';
import Proyecto7 from '../assets/images/proyectos/aiassistedu.png';
import Proyecto8 from '../assets/images/proyectos/sistemaadmision.png';
import Proyecto9 from '../assets/images/proyectos/generadorexamenes.png';
import Proyecto10 from '../assets/images/proyectos/innovatechica2025.png';

export const proyectos = [
  {
    id: 1,
    titulo: "Portafolio Personal",
    descripcion: "Sitio web personal para mostrar proyectos y habilidades, con animaciones fluidas y diseño responsivo.",
    imagen: Proyecto1,
    tecnologias: [
      { nombre: "Next.js", icono: <SiNextdotjs className="text-xl" /> },
      { nombre: "React", icono: <SiReact className="text-xl" /> },
      { nombre: "Tailwind CSS", icono: <SiTailwindcss className="text-xl" /> },
      { nombre: "Framer Motion", icono: <SiFramer className="text-xl" /> },
    ],
    enlaces: [
      { tipo: "github", url: "https://github.com/MiguelVivar/MiguelVivar.github.io" },
      { tipo: "demo", url: "https://miguelvivar.github.io/" },
    ],
    destacado: true,
    categoria: "Front-End"
  },
  {
    id: 2,
    titulo: "Calculadora de Consumo Y Propinas",
    descripcion: "Una página web para calcular el consumo y propinas de un restaurante.",
    imagen: Proyecto2,
    tecnologias: [
      { nombre: "Vite", icono: <SiVite className="text-xl" /> },
      { nombre: "React", icono: <SiReact className="text-xl" /> },
      { nombre: "Tailwind CSS", icono: <SiTailwindcss className="text-xl" /> },
      { nombre: "Framer Motion", icono: <SiFramer className="text-xl" /> },
    ],
    enlaces: [
      { tipo: "github", url: "https://github.com/MiguelVivar/Calculadora_Consumo_Propinas" },
      { tipo: "demo", url: "https://calculadoraconsumopropinas.netlify.app/" },
    ],
    destacado: true,
    categoria: "Front-End"
  },
  {
    id: 3,
    titulo: "Portafolio VinnBonn",
    descripcion: "Portafolio para mostrar proyectos y habilidades, con animaciones fluidas y diseño responsivo.",
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
    categoria: "Front-End"
  },
  {
    id: 4,
    titulo: "Portafolio ChuchiPG",
    descripcion: "Portafolio para mostrar proyectos y habilidades, con animaciones fluidas y diseño responsivo.",
    imagen: Proyecto4,
    tecnologias: [
      { nombre: "Next.js", icono: <SiNextdotjs className="text-xl" /> },
      { nombre: "React", icono: <SiReact className="text-xl" /> },
      { nombre: "Tailwind CSS", icono: <SiTailwindcss className="text-xl" /> },
      { nombre: "Framer Motion", icono: <SiFramer className="text-xl" /> },
    ],
    enlaces: [
      { tipo: "github", url: "https://github.com/MiguelVivar/Calculadora_Consumo_Propinas" },
      { tipo: "demo", url: "https://calculadoraconsumopropinas.netlify.app/" },
    ],
    destacado: false,
    categoria: "Front-End"
  },
  {
    id: 5,
    titulo: "Administrador de Veterinaria",
    descripcion: "Un sistema de administración de una veterinaria con autenticación de usuarios.",
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
      { tipo: "github", url: "https://github.com/MiguelVivar/APV_MERN_frontend" },
    ],
    destacado: true,
    categoria: "Full-Stack"
  },
  {
    id: 6,
    titulo: "Agencia de Viajes",
    descripcion: "Un sitio web para una agencia de viajes con un diseño moderno y responsivo.",
    imagen: Proyecto6,
    tecnologias: [
      { nombre: "Pug", icono: <SiPug className="text-xl" /> },
      { nombre: "NodeJS", icono: <SiNodedotjs className="text-xl" /> },
      { nombre: "Boostrap", icono: <SiBootstrap className="text-xl" /> },
      { nombre: "MySQL", icono: <SiMysql className="text-xl" /> },
      { nombre: "Heroku", icono: <SiHeroku className="text-xl" /> },
    ],
    enlaces: [
      { tipo: "github", url: "https://github.com/MiguelVivar/AgenciaViajesNodeJS" },
    ],
    destacado: false,
    categoria: "Full-Stack"
  },
  {
    id: 7,
    titulo: "AiAssistEdu",
    descripcion: "Sitio web sobre una IA para la educación, cuenta con un chatbot capaz de generar tickets de soporte.",
    imagen: Proyecto7,
    tecnologias: [
      { nombre: "React", icono: <SiReact className="text-xl" /> },
      { nombre: "Tailwind CSS", icono: <SiTailwindcss className="text-xl" /> },
      { nombre: "Voiceflow", icono: <SiChatbot className="text-xl" /> },
    ],
    enlaces: [
      { tipo: "demo", url: "https://gjpf.edu.pe/aiassistedu/" },
    ],
    destacado: false,
    categoria: "Front-End"
  },
  {
    id: 8,
    titulo: "SistemaAdmison",
    descripcion: "Aplicación que gestiona el proceso de admisión académica. Utiliza el patrón MVC y permite leer datos desde archivos DBF, mostrando los resultados de manera organizada en una interfaz gráfica.",
    imagen: Proyecto8,
    tecnologias: [
      { nombre: "Java", icono: <FaJava className="text-xl" /> }
    ],
    enlaces: [
      { tipo: "github", url: "https://github.com/MiguelVivar/SistemaAdmision" },
    ],
    destacado: true,
    categoria: "Software"
  },
  {
    id: 9,
    titulo: "GeneradorExamenes",
    descripcion: "Aplicación que genera exámenes de forma automatizada. Desarrollada en Java con NetBeans, permite organizar preguntas y respuestas en un formato estructurado para su aplicación.",
    imagen: Proyecto9,
    tecnologias: [
      { nombre: "Java", icono: <FaJava className="text-xl" /> }
    ],
    enlaces: [
      { tipo: "github", url: "https://github.com/MiguelVivar/GeneradorExamenes" },
    ],
    destacado: true,
    categoria: "Software"
  },
  {
    id: 10,
    titulo: "InnovaTech Ica 2025",
    descripcion: "Landing page para el evento InnovaTech Ica 2025, con un diseño moderno y responsivo. Incluye secciones informativas y enlaces a redes sociales.",
    imagen: Proyecto10,
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
    categoria: "Front-End"
  },
];

// Categorías para el filtro
export const categorias = [
  { id: 'todos', nombre: 'Todos', icono: <FaSearch className="text-xl" /> },
  { id: 'Full-Stack', nombre: 'Full-Stack', icono: <FaLayerGroup className="text-xl" /> },
  { id: 'Front-End', nombre: 'Front-End', icono: <FaDesktop className="text-xl" /> },
  { id: 'Back-End', nombre: 'Back-End', icono: <FaServer className="text-xl" /> },
  { id: 'Software', nombre: 'Software', icono: <FaCode className="text-xl" /> },
];