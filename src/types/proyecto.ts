import { StaticImageData } from "next/image";
import React from "react";

export interface Proyecto {
  id: number;
  slug: string;
  titulo: string;
  descripcion: string;
  imagen: string | StaticImageData;
  tecnologias: { nombre: string; icono: React.ReactNode }[];
  enlaces: { tipo: string; url: string }[];
  destacado: boolean;
  estado: "en-desarrollo" | "terminado";
  categoria: string;
}

export type EstadoProyecto = "en-desarrollo" | "terminado";
