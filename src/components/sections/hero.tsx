"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center text-center overflow-hidden bg-[#f8fbfe]">
      {/* Decorative floating orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-[15%] left-[10%] w-72 h-72 rounded-full bg-[#B6D7F2]/20 blur-3xl animate-float-slow"
        />
        <div
          className="absolute bottom-[20%] right-[8%] w-96 h-96 rounded-full bg-[#B6D7F2]/15 blur-3xl animate-float-slower"
        />
        <div
          className="absolute top-[60%] left-[55%] w-48 h-48 rounded-full bg-[#F4DEC6]/20 blur-2xl animate-float-slow"
          style={{ animationDelay: "3s" }}
        />
        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(228 68% 14% / 0.15) 1px, transparent 1px), linear-gradient(90deg, hsl(228 68% 14% / 0.15) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-4xl">
        <h1
          className="hero-stagger text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1] text-[#121B52] font-headline opacity-0 animate-hero-fade-in"
        >
          Tu marca de{" "}
          <span className="relative inline-block">
            <span className="transition-all duration-300 hover:opacity-0">
              invisible
            </span>
          </span>{" "}
          a{" "}
          <span className="relative inline-block">
            inolvidable.
            <span
              className="absolute left-0 bottom-0 h-[3px] w-full bg-[#B6D7F2] origin-left scale-x-0"
              style={{ animation: "underline-reveal 0.6s cubic-bezier(0.23, 1, 0.32, 1) 1s forwards" }}
            />
          </span>
        </h1>

        <p
          className="hero-stagger text-lg md:text-xl max-w-2xl mx-auto mb-10 text-[#121B52]/70 leading-relaxed opacity-0 animate-hero-fade-in"
          style={{ animationDelay: "200ms" }}
        >
          Diseñamos tu identidad visual, estructuramos tu negocio y proyectamos
          tu esencia para que crezcas con propósito. Diseño con estrategia.
          Marca con alma.
        </p>

        <div
          className="hero-stagger flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-hero-fade-in"
          style={{ animationDelay: "400ms" }}
        >
          <Button
            asChild
            size="lg"
            className="btn-press bg-[#121B52] text-[#B6D7F2] hover:bg-[#1a2766] text-base px-8 py-6 rounded-lg shadow-lg shadow-[#121B52]/20 animate-pulse-subtle"
          >
            <Link href="#contact">Agenda tu asesoría inicial</Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="btn-press bg-white text-[#121B52] border-2 border-[#121B52]/15 hover:border-[#121B52]/30 hover:bg-[#f0f4f8] text-base px-8 py-6 rounded-lg"
          >
            <Link href="#services">Conoce nuestros servicios</Link>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-hero-fade-in"
        style={{ animationDelay: "800ms" }}
      >
        <span className="text-xs font-medium text-[#121B52]/40 tracking-widest uppercase">
          Descubrí más
        </span>
        <ChevronDown className="h-5 w-5 text-[#121B52]/40 animate-scroll-bounce" />
      </div>
    </section>
  );
}
