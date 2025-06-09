import { FaHtml5, FaCss3, FaSass, FaBootstrap, FaReact, FaNodeJs, FaGithub, FaFigma, FaJava, FaPython, FaLaptopCode, FaServer, FaCode, FaTools, FaLayerGroup, FaPhp } from 'react-icons/fa';
import { TbBrandCSharp } from "react-icons/tb";
import { SiJavascript, SiNextdotjs, SiTailwindcss, SiTypescript, SiFramer, SiExpress, SiMongodb, SiJest, SiBulma, SiVite, SiGit, SiCypress, SiPostman, SiMysql, SiPostgresql, SiAstro, SiGo } from 'react-icons/si';
import { BsKanban, BsSearch, BsServer } from 'react-icons/bs';
import { MdOutlineDesignServices, MdDevices } from 'react-icons/md';
import { AiOutlineApartment } from 'react-icons/ai';
import type { JSX } from 'react';

// Definir los niveles de habilidad posibles
export type NivelHabilidad = 'Avanzado' | 'Intermedio' | 'Básico';

// Interfaz para una habilidad
export interface Habilidad {
  nombre: string;
  nivel: NivelHabilidad;
  icono: JSX.Element;
  descripcion?: string;
  proyectosRelacionados?: string[];
  recursos?: {
    nombre: string;
    url: string;
  }[];
}

// Interfaz para una categoría de habilidades
export interface CategoriaHabilidad {
  titulo: string;
  icono: JSX.Element;
  habilidades: Habilidad[];
}

export const categoriasHabilidades: CategoriaHabilidad[] = [
  {
    titulo: "Front-End",
    icono: <FaLaptopCode className="text-emerald-300 text-2xl" />,
    habilidades: [
      { 
        nombre: "HTML5", 
        nivel: "Avanzado", 
        icono: <FaHtml5 className="text-2xl" />,
        descripcion: "Estructura semántica, accesibilidad y buenas prácticas de SEO.",
        proyectosRelacionados: ["Portafolio Personal", "AiAssistEdu", "Calculadora de Consumo Y Propinas"],
        recursos: [
          { nombre: "Documentación MDN", url: "https://developer.mozilla.org/es/docs/Web/HTML" },
          { nombre: "HTML5 Boilerplate", url: "https://html5boilerplate.com/" }
        ]
      },
      { 
        nombre: "CSS3", 
        nivel: "Avanzado", 
        icono: <FaCss3 className="text-2xl" />,
        descripcion: "Layouts avanzados con Flexbox y Grid, animaciones y responsive design.",
        proyectosRelacionados: ["Portafolio Personal", "Portafolio VinnBonn", "Portafolio ChuchiPG"],
        recursos: [
          { nombre: "CSS-Tricks", url: "https://css-tricks.com/" },
          { nombre: "MDN CSS", url: "https://developer.mozilla.org/es/docs/Web/CSS" }
        ]
      },
      { 
        nombre: "JavaScript", 
        nivel: "Avanzado", 
        icono: <SiJavascript className="text-2xl" />,
        descripcion: "ES6+, manipulación del DOM, asincronía con Promises y async/await.",
        proyectosRelacionados: ["Calculadora de Consumo Y Propinas", "AiAssistEdu", "Agencia de Viajes"],
        recursos: [
          { nombre: "JavaScript.info", url: "https://javascript.info/" },
          { nombre: "Eloquent JavaScript", url: "https://eloquentjavascript.net/" }
        ]
      },
      { 
        nombre: "SASS", 
        nivel: "Avanzado", 
        icono: <FaSass className="text-2xl" />,
        descripcion: "Preprocesador para CSS con variables, mixins y funciones.",
        proyectosRelacionados: ["Portafolio Personal", "AiAssistEdu", "Portafolio VinnBonn"],
        recursos: [
          { nombre: "Sass Guidelines", url: "https://sass-guidelin.es/es/" },
          { nombre: "Documentación Sass", url: "https://sass-lang.com/documentation" }
        ]
      },
      { 
        nombre: "Bootstrap", 
        nivel: "Avanzado", 
        icono: <FaBootstrap className="text-2xl" />,
        descripcion: "Framework CSS para desarrollo responsive y mobile-first.",
        proyectosRelacionados: ["Agencia de Viajes", "AiAssistEdu"],
        recursos: [
          { nombre: "Documentación Bootstrap", url: "https://getbootstrap.com/docs/" },
          { nombre: "Bootstrap Examples", url: "https://getbootstrap.com/docs/5.3/examples/" }
        ]
      },
      { 
        nombre: "Tailwind CSS", 
        nivel: "Avanzado", 
        icono: <SiTailwindcss className="text-2xl" />,
        descripcion: "Framework utility-first para diseños personalizados sin salir del HTML.",
        proyectosRelacionados: ["Portafolio Personal", "Portafolio VinnBonn", "Portafolio ChuchiPG"],
        recursos: [
          { nombre: "Documentación Tailwind", url: "https://tailwindcss.com/docs" },
          { nombre: "Tailwind UI", url: "https://tailwindui.com/" }
        ]
      },
      { 
        nombre: "Bulma CSS", 
        nivel: "Avanzado",        icono: <SiBulma className="text-2xl" />,
        descripcion: "Framework CSS moderno basado en Flexbox y responsive.",
        proyectosRelacionados: ["Aplicación de Notas", "Portafolio Personal"],
        recursos: [
          { nombre: "Documentación Bulma", url: "https://bulma.io/documentation/" },
          { nombre: "Bulma Templates", url: "https://bulmatemplates.github.io/bulma-templates/" }
        ]
      },
      { 
        nombre: "React", 
        nivel: "Avanzado", 
        icono: <FaReact className="text-2xl" />,
        descripcion: "Biblioteca para interfaces de usuario con componentes, hooks y context API.",
        proyectosRelacionados: ["Portafolio Personal", "Calculadora de Consumo Y Propinas", "AiAssistEdu"],
        recursos: [
          { nombre: "Documentación React", url: "https://react.dev/" },
          { nombre: "React Patterns", url: "https://reactpatterns.com/" }
        ]
      },
      { 
        nombre: "Next.js", 
        nivel: "Intermedio", 
        icono: <SiNextdotjs className="text-2xl" />,
        descripcion: "Framework React con SSR, rutas API y optimización de rendimiento.",
        proyectosRelacionados: ["Portafolio VinnBonn", "Portafolio ChuchiPG", "Portafolio Personal"],
        recursos: [
          { nombre: "Documentación Next.js", url: "https://nextjs.org/docs" },
          { nombre: "Learn Next.js", url: "https://nextjs.org/learn" }
        ]
      },
      { 
        nombre: "Astro", 
        nivel: "Intermedio", 
        icono: <SiAstro className="text-2xl" />,
        descripcion: "Framework con enfoque en rendimiento y menos JavaScript en el cliente.",
        proyectosRelacionados: ["Portafolio Personal", "AiAssistEdu"],
        recursos: [
          { nombre: "Documentación Astro", url: "https://docs.astro.build/" },
          { nombre: "Astro Themes", url: "https://astro.build/themes/" }
        ]
      },
      { 
        nombre: "TypeScript", 
        nivel: "Intermedio", 
        icono: <SiTypescript className="text-2xl" />,
        descripcion: "JavaScript con tipado estático para aplicaciones más robustas.",
        proyectosRelacionados: ["Portafolio Personal", "Portafolio VinnBonn", "Portafolio ChuchiPG"],
        recursos: [
          { nombre: "Documentación TypeScript", url: "https://www.typescriptlang.org/docs/" },
          { nombre: "TypeScript Deep Dive", url: "https://basarat.gitbook.io/typescript/" }
        ]
      },
      { 
        nombre: "Vite", 
        nivel: "Intermedio", 
        icono: <SiVite className="text-2xl" />,
        descripcion: "Bundler y servidor de desarrollo ultrarrápido para aplicaciones web.",
        proyectosRelacionados: ["Calculadora de Consumo Y Propinas", "AiAssistEdu"],
        recursos: [
          { nombre: "Documentación Vite", url: "https://vitejs.dev/guide/" },
          { nombre: "Vite Plugins", url: "https://vitejs.dev/plugins/" }
        ]
      },
      { 
        nombre: "Framer Motion", 
        nivel: "Intermedio", 
        icono: <SiFramer className="text-2xl" />,
        descripcion: "Biblioteca de animaciones potente y expresiva para React.",
        proyectosRelacionados: ["Portafolio Personal", "Portafolio VinnBonn", "Portafolio ChuchiPG"],
        recursos: [
          { nombre: "Documentación Framer Motion", url: "https://www.framer.com/motion/" },
          { nombre: "Examples", url: "https://www.framer.com/motion/examples/" }
        ]
      },
    ],
  },
  {
    titulo: "Back-End",
    icono: <FaServer className="text-emerald-300 text-2xl" />,
    habilidades: [
      { 
        nombre: "Node.js", 
        nivel: "Avanzado", 
        icono: <FaNodeJs className="text-2xl" />,
        descripcion: "Entorno de ejecución JavaScript del lado del servidor con arquitectura basada en eventos.",
        proyectosRelacionados: ["API REST", "Servidor Web", "Microservicios"],
        recursos: [
          { nombre: "Documentación Node.js", url: "https://nodejs.org/es/docs/" },
          { nombre: "Node.js Best Practices", url: "https://github.com/goldbergyoni/nodebestpractices" }
        ]
      },
      { 
        nombre: "Express", 
        nivel: "Avanzado", 
        icono: <SiExpress className="text-2xl" />,
        descripcion: "Framework web rápido y minimalista para Node.js.",
        proyectosRelacionados: ["API REST", "Servidor Web", "Autenticación JWT"],
        recursos: [
          { nombre: "Documentación Express", url: "https://expressjs.com/es/" },
          { nombre: "Express Examples", url: "https://github.com/expressjs/express/tree/master/examples" }
        ]
      }
    ],
  },
  {
    titulo: "Bases de Datos",
    icono: <AiOutlineApartment className="text-emerald-300 text-2xl" />,
    habilidades: [
      { 
        nombre: "MongoDB", 
        nivel: "Intermedio", 
        icono: <SiMongodb className="text-2xl" />,
        descripcion: "Base de datos NoSQL orientada a documentos, flexible y escalable.",
        proyectosRelacionados: ["Administrador de Veterinaria"],
        recursos: [
          { nombre: "Documentación MongoDB", url: "https://docs.mongodb.com/" },
          { nombre: "MongoDB University", url: "https://university.mongodb.com/" }
        ]
      },
      { 
        nombre: "MySQL",        
        nivel: "Intermedio", 
        icono: <SiMysql className="text-2xl" />,
        descripcion: "Sistema de gestión de bases de datos relacionales con SQL.",
        proyectosRelacionados: ["Agencia de Viajes"],
        recursos: [
          { nombre: "Documentación MySQL", url: "https://dev.mysql.com/doc/" },
          { nombre: "MySQL Tutorial", url: "https://www.mysqltutorial.org/" }
        ]
      },
      { 
        nombre: "SQLServer", 
        nivel: "Intermedio", 
        icono: <BsServer className="text-2xl" />,
        descripcion: "Sistema de gestión de bases de datos relacionales de Microsoft.",
        proyectosRelacionados: ["SistemaAdmision"],
        recursos: [
          { nombre: "Documentación SQL Server", url: "https://docs.microsoft.com/es-es/sql/" },
          { nombre: "SQL Server Tutorial", url: "https://www.sqlservertutorial.net/" }
        ]
      },
      { 
        nombre: "PostgreSQL", 
        nivel: "Intermedio", 
        icono: <SiPostgresql className="text-2xl" />,
        descripcion: "Sistema de gestión de bases de datos relacional orientado a objetos.",
        proyectosRelacionados: [],
        recursos: [
          { nombre: "Documentación PostgreSQL", url: "https://www.postgresql.org/docs/" },
          { nombre: "PostgreSQL Tutorial", url: "https://www.postgresqltutorial.com/" }
        ]
      }
    ],
  },
  {
    titulo: "Lenguajes de Programación",
    icono: <FaCode className="text-emerald-300 text-2xl" />,
    habilidades: [
      { 
        nombre: "Python", 
        nivel: "Intermedio", 
        icono: <FaPython className="text-2xl" />,
        descripcion: "Lenguaje multiparadigma con enfoque en legibilidad y productividad.",
        proyectosRelacionados: ["Análisis de Datos", "Automatización", "Scripts"],
        recursos: [
          { nombre: "Documentación Python", url: "https://docs.python.org/es/" },
          { nombre: "Real Python", url: "https://realpython.com/" }
        ]
      },
      { 
        nombre: "Java", 
        nivel: "Intermedio", 
        icono: <FaJava className="text-2xl" />,
        descripcion: "Lenguaje orientado a objetos para aplicaciones empresariales.",
        proyectosRelacionados: ["API Backend", "Aplicación de Escritorio"],
        recursos: [
          { nombre: "Documentación Java", url: "https://docs.oracle.com/en/java/" },
          { nombre: "Baeldung", url: "https://www.baeldung.com/" }
        ]
      },
      { 
        nombre: "PHP", 
        nivel: "Intermedio", 
        icono: <FaPhp className="text-2xl" />,
        descripcion: "Lenguaje de script para desarrollo web del lado del servidor.",
        proyectosRelacionados: ["CMS Personalizado", "Tienda Online"],
        recursos: [
          { nombre: "Documentación PHP", url: "https://www.php.net/docs.php" },
          { nombre: "PHP The Right Way", url: "https://phptherightway.com/" }
        ]
      },
      { 
        nombre: "C#", 
        nivel: "Intermedio", 
        icono: <TbBrandCSharp className="text-2xl" />,
        descripcion: "Lenguaje multiparadigma para desarrollo en plataforma .NET.",
        proyectosRelacionados: ["API con ASP.NET Core", "Aplicación de Escritorio"],
        recursos: [
          { nombre: "Documentación C#", url: "https://docs.microsoft.com/es-es/dotnet/csharp/" },
          { nombre: "C# Corner", url: "https://www.c-sharpcorner.com/" }
        ]
      },
      { 
        nombre: "Go", 
        nivel: "Básico", 
        icono: <SiGo className="text-2xl" />,
        descripcion: "Lenguaje concurrente y compilado con sintaxis similar a C.",
        proyectosRelacionados: ["Microservicios", "CLI Tools"],
        recursos: [
          { nombre: "Go by Example", url: "https://gobyexample.com/" },
          { nombre: "Tour of Go", url: "https://tour.golang.org/welcome/1" }
        ]
      }
    ],
  },
  {
    titulo: "Herramientas",
    icono: <FaTools className="text-emerald-300 text-2xl" />,
    habilidades: [
      { 
        nombre: "Git", 
        nivel: "Avanzado", 
        icono: <SiGit className="text-2xl" />,
        descripcion: "Sistema de control de versiones distribuido.",
        proyectosRelacionados: ["Todos los proyectos de desarrollo"],
        recursos: [
          { nombre: "Documentación Git", url: "https://git-scm.com/doc" },
          { nombre: "Git Flow", url: "https://nvie.com/posts/a-successful-git-branching-model/" }
        ]
      },
      { 
        nombre: "GitHub", 
        nivel: "Avanzado", 
        icono: <FaGithub className="text-2xl" />,
        descripcion: "Plataforma de desarrollo colaborativo basada en Git.",
        proyectosRelacionados: ["Todos los proyectos de desarrollo"],
        recursos: [
          { nombre: "GitHub Docs", url: "https://docs.github.com/es" },
          { nombre: "GitHub Skills", url: "https://skills.github.com/" }
        ]
      },
      { 
        nombre: "Figma", 
        nivel: "Intermedio", 
        icono: <FaFigma className="text-2xl" />,
        descripcion: "Herramienta de diseño de interfaces colaborativo en la nube.",
        proyectosRelacionados: ["Diseño de UI", "Prototipado"],
        recursos: [
          { nombre: "Documentación Figma", url: "https://help.figma.com/" },
          { nombre: "Figma Community", url: "https://www.figma.com/community" }
        ]
      },
      { 
        nombre: "Postman", 
        nivel: "Intermedio", 
        icono: <SiPostman className="text-2xl" />,
        descripcion: "Plataforma API para construir y usar APIs.",
        proyectosRelacionados: ["API REST", "Desarrollo Backend"],
        recursos: [
          { nombre: "Documentación Postman", url: "https://learning.postman.com/" },
          { nombre: "Postman API Network", url: "https://www.postman.com/explore" }
        ]
      },
      { 
        nombre: "Jest", 
        nivel: "Básico", 
        icono: <SiJest className="text-2xl" />,
        descripcion: "Framework de testing para JavaScript con enfoque en simplicidad.",
        proyectosRelacionados: ["Aplicaciones React", "Testing Unitario"],
        recursos: [
          { nombre: "Documentación Jest", url: "https://jestjs.io/docs/es-ES/getting-started" },
          { nombre: "Testing React Apps", url: "https://jestjs.io/docs/es-ES/tutorial-react" }
        ]
      },
      { 
        nombre: "Cypress", 
        nivel: "Básico", 
        icono: <SiCypress className="text-2xl" />,
        descripcion: "Framework de testing end-to-end para aplicaciones web.",
        proyectosRelacionados: ["Aplicaciones Web", "E2E Testing"],
        recursos: [
          { nombre: "Documentación Cypress", url: "https://docs.cypress.io/" },
          { nombre: "Cypress Examples", url: "https://example.cypress.io/" }
        ]
      }
    ],
  },
  {
    titulo: "Otros",
    icono: <FaLayerGroup className="text-emerald-300 text-2xl" />,
    habilidades: [
      { 
        nombre: "Responsive Design", 
        nivel: "Avanzado", 
        icono: <MdDevices className="text-2xl" />,
        descripcion: "Desarrollo de interfaces adaptativas para todo tipo de dispositivos y pantallas.",
        proyectosRelacionados: ["Portfolio Web", "E-commerce", "Sitio Web Corporativo"],
        recursos: [
          { nombre: "Responsive Web Design", url: "https://web.dev/responsive-web-design-basics/" },
          { nombre: "CSS Media Queries", url: "https://developer.mozilla.org/es/docs/Web/CSS/Media_Queries" }
        ]
      },
      { 
        nombre: "UI/UX Design", 
        nivel: "Intermedio", 
        icono: <MdOutlineDesignServices className="text-2xl" />,
        descripcion: "Diseño de experiencias de usuario centradas en usabilidad y estética.",
        proyectosRelacionados: ["Portfolio Web", "Dashboard", "Rediseño de Interfaces"],
        recursos: [
          { nombre: "Nielsen Norman Group", url: "https://www.nngroup.com/" },
          { nombre: "Material Design", url: "https://material.io/design" }
        ]
      },
      { 
        nombre: "Metodologias Agiles", 
        nivel: "Intermedio", 
        icono: <BsKanban className="text-2xl" />,
        descripcion: "Scrum, Kanban y metodologías para desarrollo de software iterativo.",
        proyectosRelacionados: ["Gestión de Proyectos", "Desarrollo en Equipo"],
        recursos: [
          { nombre: "Guía Scrum", url: "https://scrumguides.org/index.html" },
          { nombre: "Agile Manifesto", url: "https://agilemanifesto.org/iso/es/manifesto.html" }
        ]
      },
      { 
        nombre: "Accesibilidad Web", 
        nivel: "Intermedio", 
        icono: <AiOutlineApartment className="text-2xl" />,
        descripcion: "Prácticas para hacer sitios web inclusivos y utilizables para todos.",
        proyectosRelacionados: ["Sitio Web Accesible", "Rediseño para Accesibilidad"],
        recursos: [
          { nombre: "WCAG", url: "https://www.w3.org/WAI/standards-guidelines/wcag/" },
          { nombre: "A11Y Project", url: "https://www.a11yproject.com/" }
        ]
      },
      { 
        nombre: "SEO", 
        nivel: "Básico", 
        icono: <BsSearch className="text-2xl" />,
        descripcion: "Optimización para mejorar la visibilidad y rankeo en motores de búsqueda.",
        proyectosRelacionados: ["Sitio Web Corporativo", "E-commerce"],
        recursos: [
          { nombre: "Google SEO Starter Guide", url: "https://developers.google.com/search/docs/beginner/seo-starter-guide" },
          { nombre: "Moz SEO Learning Center", url: "https://moz.com/learn/seo" }
        ]
      },
      { 
        nombre: "PWA", 
        nivel: "Básico", 
        icono: <MdDevices className="text-2xl" />,
        descripcion: "Aplicaciones web progresivas que ofrecen experiencias similares a apps nativas.",
        proyectosRelacionados: ["Portfolio Web", "Aplicación Web Offline"],
        recursos: [
          { nombre: "Web.dev PWA", url: "https://web.dev/progressive-web-apps/" },
          { nombre: "MDN PWA", url: "https://developer.mozilla.org/es/docs/Web/Progressive_web_apps" }
        ]
      },
    ],
  },
];

export const obtenerColorNivel = (nivel: string): string => {
  switch (nivel) {
    case "Avanzado":
      return "bg-emerald-500";
    case "Intermedio":
      return "bg-emerald-400";
    case "Básico":
      return "bg-emerald-300";
    default:
      return "bg-emerald-200";
  }
};

export const obtenerDescripcionNivel = (nivel: string): string => {
  switch (nivel) {
    case "Avanzado":
      return "Dominio completo con experiencia en proyectos complejos";
    case "Intermedio":
      return "Buen conocimiento y aplicacion en proyectos reales";
    case "Básico":
      return "Conocimientos fundamentales y en desarrollo";
    default:
      return "";
  }
};

// Funciones de utilidad para las estadísticas
export const obtenerTotalHabilidades  = (): Record<NivelHabilidad, number> => {
  const niveles: Record<NivelHabilidad, number> = {
    'Avanzado': 0,
    'Intermedio': 0,
    'Básico': 0
  };
  
  categoriasHabilidades.forEach(categoria => {
    categoria.habilidades.forEach(habilidad => {
      niveles[habilidad.nivel]++;
    });
  });
  
  return niveles;
};