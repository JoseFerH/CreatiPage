import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export function About() {
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about-us-image');

  return (
    <section id="about" className="py-16 md:py-24 bg-gradient-to-r from-white to-accent text-accent-foreground">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-headline">
              No somos como cualquier agencia.
            </h2>
            <p className="text-lg mb-6">
              En Creati no solo diseñamos: te acompañamos en todo el proceso de transformación de tu marca. Creemos en la transparencia total, por eso te mostramos cada avance, cada etapa, y cómo todo lo que creamos impacta directamente en el crecimiento de tu negocio.
            </p>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle className="text-accent-foreground mt-1 h-5 w-5 shrink-0" />
                <span>Usamos herramientas colaborativas donde podés ver los avances en tiempo real.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-accent-foreground mt-1 h-5 w-5 shrink-0" />
                <span>Cada paso es medible, claro y estratégico.</span>
              </li>
            </ul>
            <p className="font-semibold text-lg">
              Porque tu marca merece más que un diseño bonito. Merece resultados, dirección y propósito.
            </p>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            {aboutImage && (
              <Card className="overflow-hidden shadow-2xl rounded-lg bg-white text-accent-foreground">
                <CardContent className="p-0">
                  <Image
                    src={aboutImage.imageUrl}
                    alt={aboutImage.description}
                    width={500}
                    height={600}
                    className="object-cover h-full w-full"
                    data-ai-hint={aboutImage.imageHint}
                  />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
