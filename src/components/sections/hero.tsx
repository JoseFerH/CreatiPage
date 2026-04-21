"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative w-full pt-40 pb-24 md:pt-56 md:pb-40 flex items-center justify-center text-center bg-white overflow-hidden">
      {/* Abstract light blue accent blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lightblue/20 rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 max-w-5xl">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 text-navy font-headline leading-tight">
          Tu marca de <span className="font-accent italic font-normal text-lightblue relative inline-block mx-2 before:content-[''] before:absolute before:bottom-2 before:left-0 before:w-full before:h-3 before:bg-navy/10 before:-z-10">Invisible</span> a <br className="hidden md:block" /> <span className="underline decoration-lightblue decoration-4 underline-offset-8">Inolvidable</span>.
        </h1>
        <p className="text-lg md:text-2xl max-w-3xl mx-auto mb-12 text-zinc-600 font-light leading-relaxed">
          En Creati, diseñamos tu identidad visual, estructuramos tu negocio y proyectamos tu esencia para que crezcas con propósito. Diseño con estrategia. Marca con alma.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button asChild size="lg" className="bg-navy text-white hover:bg-navy/90 px-10 py-7 text-lg rounded-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto">
            <Link href="#contact">Comenzar</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="px-10 py-7 text-lg border-zinc-200 hover:bg-zinc-50 text-navy rounded-full transition-all duration-300 w-full sm:w-auto bg-white shadow-sm">
            <Link href="#services">Agendar Asesoría</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
