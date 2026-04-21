import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export function About() {
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about-us-image');

  return (
    <section id="about" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-5xl font-black mb-6 font-headline text-navy tracking-tight">
              ¿Por qué elegir <span className="font-accent italic text-lightblue font-normal">Creati</span>?
            </h2>
            <p className="text-lg md:text-xl mb-8 text-zinc-600 leading-relaxed font-light">
              En Creati no solo diseñamos: te acompañamos en todo el proceso de transformación de tu marca. Creemos en la transparencia total, por eso te mostramos cada avance, cada etapa, y cómo todo lo que creamos impacta directamente en el crecimiento de tu negocio.
            </p>
            <ul className="space-y-6 mb-8">
              <li className="flex items-start gap-4">
                <div className="bg-lightblue/20 p-2 rounded-full">
                  <CheckCircle className="text-navy h-6 w-6 shrink-0" />
                </div>
                <span className="text-zinc-700 text-lg leading-relaxed">Usamos herramientas colaborativas donde podés ver los avances en tiempo real.</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-lightblue/20 p-2 rounded-full">
                  <CheckCircle className="text-navy h-6 w-6 shrink-0" />
                </div>
                <span className="text-zinc-700 text-lg leading-relaxed">Cada paso es medible, claro y estratégico.</span>
              </li>
            </ul>
            <p className="font-medium text-xl text-navy border-l-4 border-lightblue pl-6 italic">
              Porque tu marca merece más que un diseño bonito. Merece resultados, dirección y propósito.
            </p>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            {aboutImage && (
              <div className="relative w-full max-w-md aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-zinc-100">
                <Image
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
                  data-ai-hint={aboutImage.imageHint}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
