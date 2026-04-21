import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Palette, MonitorSmartphone, Megaphone, CandlestickChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const services = [
  {
    icon: <Palette className="w-10 h-10 text-navy mb-4 group-hover:scale-110 transition-transform duration-300" />,
    title: "Identidad de Marca",
    description: "Logo, naming, paleta, storytelling. Tu marca no comienza con un logo, sino con una historia visual que impacta.",
  },
  {
    icon: <MonitorSmartphone className="w-10 h-10 text-navy mb-4 group-hover:scale-110 transition-transform duration-300" />,
    title: "Presencia Digital",
    description: "Web responsive, tienda online, apps. Tu página web es tu carta de presentación: debe proyectar profesionalismo y vender.",
  },
  {
    icon: <Megaphone className="w-10 h-10 text-navy mb-4 group-hover:scale-110 transition-transform duration-300" />,
    title: "Marketing Visual",
    description: "Diseños que detienen el scroll, generan conexión y posicionan tu marca estratégicamente.",
  },
  {
    icon: <CandlestickChart className="w-10 h-10 text-navy mb-4 group-hover:scale-110 transition-transform duration-300" />,
    title: "Finanzas Estratégicas",
    description: "Diseñamos para que tu negocio no solo se vea bien, sino que sea sostenible y sumamente rentable.",
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-zinc-50/50">
      <div className="container mx-auto max-w-7xl px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-black mb-6 font-headline text-navy tracking-tight">
          Pilares <span className="font-accent italic text-lightblue font-normal">Principales</span>
        </h2>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-16 text-zinc-600 font-light leading-relaxed">
          Ofrecemos soluciones integrales para construir marcas fuertes, visibles y rentables a través de cuatro pilares fundamentales.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          {services.map((service, index) => (
            <Card key={index} className="group flex flex-col h-full border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-white rounded-2xl overflow-hidden hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="bg-lightblue/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-2 group-hover:bg-lightblue/20 transition-colors duration-300">
                  {service.icon}
                </div>
                <CardTitle className="font-headline text-xl font-bold text-navy">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-zinc-600 leading-relaxed font-light">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}