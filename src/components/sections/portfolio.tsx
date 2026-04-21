import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const portfolioItems = [
  { id: 1, beforeId: 'portfolio-before-1', afterId: 'portfolio-after-1', title: 'Rebranding Corporativo' },
  { id: 2, beforeId: 'portfolio-before-2', afterId: 'portfolio-after-2', title: 'Diseño de Packaging' },
  { id: 3, beforeId: 'portfolio-before-3', afterId: 'portfolio-after-3', title: 'Lanzamiento de E-commerce' },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-6 font-headline text-navy tracking-tight">
            Nuestro <span className="font-accent italic text-lightblue font-normal">Trabajo</span>
          </h2>
          <p className="text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto font-light leading-relaxed">
            Tu marca también puede brillar así. Aquí te mostramos cómo lo logramos.
          </p>
        </div>
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {portfolioItems.map(item => {
            const beforeImg = PlaceHolderImages.find(p => p.id === item.beforeId);
            const afterImg = PlaceHolderImages.find(p => p.id === item.afterId);
            if (!beforeImg || !afterImg) return null;

            return (
              <Card key={item.id} className="overflow-hidden group shadow-none border-none bg-transparent cursor-pointer">
                <CardContent className="p-0 relative rounded-2xl overflow-hidden shadow-xl">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={beforeImg.imageUrl}
                      alt={beforeImg.description}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-0"
                      data-ai-hint={beforeImg.imageHint}
                    />
                    <Image
                      src={afterImg.imageUrl}
                      alt={afterImg.description}
                      fill
                      className="object-cover opacity-0 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                      data-ai-hint={afterImg.imageHint}
                    />
                     <div className="absolute top-4 right-4 bg-navy/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200 text-white shadow-lg tracking-wider uppercase">
                      Antes <ArrowRight className="h-4 w-4 text-lightblue" /> Después
                    </div>
                  </div>
                  {/* Overlay for title on hover */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 to-transparent p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <h3 className="font-bold text-xl text-white">{item.title}</h3>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}