import { Palette, MonitorSmartphone, Megaphone, CandlestickChart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ScrollReveal } from "@/components/scroll-reveal";

const services = [
  {
    icon: <Palette className="w-8 h-8 text-[#B6D7F2]" />,
    title: "Identidad de marca",
    description: "Logo, naming, paleta, storytelling. Tu marca no comienza con un logo, sino con una historia visual que impacta.",
  },
  {
    icon: <MonitorSmartphone className="w-8 h-8 text-[#B6D7F2]" />,
    title: "Presencia digital",
    description: "Web responsive, tienda online, apps. Tu página web es tu carta de presentación: debe proyectar profesionalismo y vender.",
  },
  {
    icon: <Megaphone className="w-8 h-8 text-[#B6D7F2]" />,
    title: "Marketing visual",
    description: "Diseños que detienen el scroll, generan conexión y posicionan tu marca.",
  },
  {
    icon: <CandlestickChart className="w-8 h-8 text-[#B6D7F2]" />,
    title: "Finanzas estratégicas",
    description: "Diseñamos para que tu negocio no solo se vea bien, sino que sea rentable.",
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-[#121B52] text-white overflow-hidden relative">
      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <div className="flex flex-col md:flex-row gap-12 justify-between items-end mb-16 md:mb-24">
          <div className="max-w-2xl">
            <ScrollReveal direction="up">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 font-headline tracking-tight">
                Nuestros <span className="text-[#B6D7F2]">Servicios</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={150}>
              <p className="text-lg md:text-xl text-[#B6D7F2]/80 leading-relaxed font-medium">
                Ofrecemos soluciones integrales para construir marcas fuertes, visibles y rentables. No vendemos entregables, construimos activos.
              </p>
            </ScrollReveal>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16 lg:gap-y-24">
          {services.map((service, index) => (
            <ScrollReveal 
              key={index} 
              direction="up" 
              delay={index * 150} 
              className="group relative"
            >
              {/* Connector line for desktop to break the grid feel */}
              {index % 2 === 0 && (
                <div className="hidden md:block absolute top-12 left-full w-12 h-[1px] bg-white/10" />
              )}
              
              <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 items-start">
                <div className="shrink-0 relative">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center relative z-10 group-hover:scale-110 group-hover:bg-[#B6D7F2]/10 transition-all duration-300 ease-out-expo">
                    {service.icon}
                  </div>
                  {/* Decorative glow behind icon */}
                  <div className="absolute inset-0 bg-[#B6D7F2] blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full" />
                </div>
                
                <div className="flex flex-col h-full">
                  <h3 className="text-2xl font-bold font-headline mb-3 text-white group-hover:text-[#B6D7F2] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-[#B6D7F2]/70 leading-relaxed mb-6 flex-grow">
                    {service.description}
                  </p>
                  
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal direction="up" delay={600} className="mt-16 flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="btn-press bg-white text-[#121B52] border-2 border-white hover:bg-transparent hover:text-white w-full sm:w-auto rounded-full px-8 py-6 text-lg font-semibold transition-colors duration-300">
            <Link href="#contact">Solicitá tu paquete ideal</Link>
          </Button>
          <Button asChild size="lg" className="btn-press bg-[#B6D7F2] text-[#121B52] hover:bg-white w-full sm:w-auto rounded-full px-8 py-6 text-lg font-semibold transition-colors duration-300">
            <Link href="#contact">Hablemos de tu marca</Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}