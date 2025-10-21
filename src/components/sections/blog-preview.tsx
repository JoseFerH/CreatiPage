import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const articles = {
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
};

export function BlogPreview() {
  return (
    <section id="blog" className="py-16 md:py-24 bg-white text-primary">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Recursos para crecer</h2>
          <p className="text-lg text-muted-foreground mt-2">
            Educación y herramientas para potenciar tu marca.
          </p>
        </div>
        <Tabs defaultValue="blog" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 h-auto bg-primary-foreground/20 text-primary">
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="finanzas">Finanzas</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
            <TabsTrigger value="diseño">Diseño</TabsTrigger>
          </TabsList>
          {Object.entries(articles).map(([category, items]) => (
            <TabsContent key={category} value={category}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item, index) => (
                  <Card key={index} className="flex flex-col hover:shadow-lg transition-shadow duration-300 bg-white text-primary">
                    <CardHeader>
                      <CardTitle className="text-lg font-headline">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow flex items-end">
                      <Link href={item.link} className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
                        Leer más <ArrowRight className="h-4 w-4" />
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
