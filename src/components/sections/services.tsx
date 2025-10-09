import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Palette, MonitorSmartphone, Megaphone, CandlestickChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const services = [
  {
    icon: <Palette className="w-10 h-10 text-primary" />,
    title: "Identidad de marca",
    description: "Logo, naming, paleta, storytelling. Tu marca no comienza con un logo, sino con una historia visual que impacta.",
  },
  {
    icon: <MonitorSmartphone className="w-10 h-10 text-primary" />,
    title: "Presencia digital",
    description: "Web responsive, tienda online, apps. Tu página web es tu carta de presentación: debe proyectar profesionalismo y vender.",
  },
  {
    icon: <Megaphone className="w-10 h-10 text-primary" />,
    title: "Marketing visual",
    description: "“Diseños que detienen el scroll, generan conexión y posicionan tu marca.”",
  },
  {
    icon: <CandlestickChart className="w-10 h-10 text-primary" />,
    title: "Finanzas estratégicas",
    description: "“Diseñamos para que tu negocio no solo se vea bien, sino que sea rentable.”",
  },
];

export function Services() {
  return (
    <section id="services" className="py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-headline">Nuestros Servicios</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
          Ofrecemos soluciones integrales para construir marcas fuertes, visibles y rentables.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="text-left flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                {service.icon}
                <CardTitle className="pt-4 font-headline">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" variant="outline">
            <Link href="#contact">Solicitá tu paquete ideal</Link>
          </Button>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="#contact">Hablemos de tu marca</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
