"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center text-center bg-gradient-to-r from-white to-[#B6D7F2] overflow-hidden pt-24">
      <div className="relative z-10 container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 leading-tight text-[#121B52] font-headline">
          Tu marca de invisible a inolvidable.
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-[#121B52]/80">
          En Creati, diseñamos tu identidad visual, estructuramos tu negocio y proyectamos tu esencia para que crezcas con propósito. Diseño con estrategia. Marca con alma.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-[#B6D7F2] text-[#121B52] hover:bg-[#121B52] hover:text-[#B6D7F2]">
            <Link href="#services">Conocé nuestros servicios</Link>
          </Button>
          <Button asChild size="lg" className="bg-[#121B52] text-[#B6D7F2] hover:bg-[#B6D7F2] hover:text-[#121B52]">
            <Link href="#contact">Agendá tu asesoría inicial</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
