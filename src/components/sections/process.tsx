"use client";

import { ScrollReveal } from "@/components/scroll-reveal";
import { MessageSquareText, PenTool, LayoutDashboard, Rocket } from "lucide-react";

const steps = [
  {
    icon: <MessageSquareText className="w-8 h-8 text-[#9B6F50]" />,
    title: "Escuchamos tu visión.",
    description: "Comenzamos entendiendo a fondo tu negocio, tus objetivos y lo que te hace único.",
  },
  {
    icon: <PenTool className="w-8 h-8 text-[#9B6F50]" />,
    title: "Diseñamos una propuesta personalizada.",
    description: "Creamos una estrategia visual y estructural a la medida de tu marca.",
  },
  {
    icon: <LayoutDashboard className="w-8 h-8 text-[#9B6F50]" />,
    title: "Revisás avances en tiempo real.",
    description: "Trabajamos con transparencia. Podés ver y opinar sobre el progreso paso a paso.",
  },
  {
    icon: <Rocket className="w-8 h-8 text-[#9B6F50]" />,
    title: "Entregamos un branding que vende.",
    description: "Recibís una marca lista para destacar, conectar con tu audiencia y crecer.",
  },
];

export function Process() {
  return (
    <section id="process" className="py-24 md:py-32 bg-white text-[#121B52] relative overflow-hidden border-t border-[#f0f4f8]">
      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <ScrollReveal direction="up">
            <h2 className="text-3xl md:text-5xl font-bold font-headline tracking-tight mb-6">
              Así <span className="text-[#9B6F50]">Trabajamos</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={150}>
            <p className="text-lg md:text-xl text-[#121B52]/70 font-medium leading-relaxed">
              Un proceso claro, medible y diseñado para dar resultados reales.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-12 left-24 right-24 h-0.5 bg-[#f0f4f8] -z-10" />

          {steps.map((step, index) => (
            <ScrollReveal 
              key={index} 
              direction="up" 
              delay={index * 150} 
              className="relative"
            >
              <div className="bg-[#f8fbfe] border border-[#f0f4f8] rounded-3xl p-8 h-full flex flex-col items-center text-center hover:shadow-xl hover:border-[#B6D7F2]/50 transition-all duration-300 group">
                <div className="w-20 h-20 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
                <div className="w-8 h-8 rounded-full bg-[#121B52] text-white flex items-center justify-center font-bold text-sm absolute -top-4 -right-2 lg:left-1/2 lg:-translate-x-1/2 lg:-top-4 border-4 border-white shadow-sm">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold font-headline mb-4 group-hover:text-[#9B6F50] transition-colors">
                  {step.title}
                </h3>
                <p className="text-[#121B52]/70 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
