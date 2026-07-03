"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

type SiteSettings = {
  whatsapp: string;
  socials: {
    instagram: string;
    facebook: string;
    linkedin: string;
  };
  blog: {
    blog: { title: string; link: string }[];
    finanzas: { title: string; link: string }[];
    marketing: { title: string; link: string }[];
    diseño: { title: string; link: string }[];
  };
};

// Configuración por defecto mientras carga o si no hay base de datos
const defaultSettings: SiteSettings = {
  whatsapp: "https://wa.me/123456789",
  socials: {
    instagram: "#",
    facebook: "#",
    linkedin: "#",
  },
  blog: {
    blog: [
      { title: "5 señales de que tu marca necesita un rediseño urgente", link: "#" },
      { title: "¿Por qué tu negocio no vende si se ve bien?", link: "#" },
      { title: "Cómo estructurar tu marca para escalar sin perder esencia", link: "#" },
    ],
    finanzas: [
      { title: "Ebook: Guía de Precios para Creativos", link: "#" },
      { title: "Plantilla: Flujo de Caja para Freelancers", link: "#" },
      { title: "Escalabilidad: ¿Cuándo y cómo invertir en tu marca?", link: "#"},
    ],
    marketing: [
      { title: "Ebook: Marketing Visual que Vende", link: "#" },
      { title: "Plantilla: Calendario de Contenidos para Redes", link: "#" },
      { title: "Anuncios que convierten: Guía de inicio", link: "#"},
    ],
    diseño: [
      { title: "Ebook: Storytelling para Marcas con Alma", link: "#" },
      { title: "Plantilla: Moodboard de Identidad Visual", link: "#" },
      { title: "Psicología del color en branding", link: "#" },
    ],
  }
};

const SettingsContext = createContext<{ settings: SiteSettings; loading: boolean }>({
  settings: defaultSettings,
  loading: true,
});

export const useSettings = () => useContext(SettingsContext);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, "configuracion", "ajustes_sitio");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // Fusionamos la data de Firebase con los defaults para evitar errores si falta un campo
          const data = docSnap.data();
          setSettings({
            whatsapp: data.whatsapp || defaultSettings.whatsapp,
            socials: { ...defaultSettings.socials, ...(data.socials || {}) },
            blog: { ...defaultSettings.blog, ...(data.blog || {}) }
          });
        }
      } catch (error) {
        console.error("Error cargando configuración:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
}
