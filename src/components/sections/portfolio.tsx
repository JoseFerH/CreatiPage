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
    <section id="portfolio" className="py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Tu marca también puede brillar así.</h2>
          <p className="text-lg text-muted-foreground mt-2">
            Aquí te mostramos cómo lo logramos.
          </p>
        </div>
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {portfolioItems.map(item => {
            const beforeImg = PlaceHolderImages.find(p => p.id === item.beforeId);
            const afterImg = PlaceHolderImages.find(p => p.id === item.afterId);
            if (!beforeImg || !afterImg) return null;

            return (
              <Card key={item.id} className="overflow-hidden group shadow-lg">
                <CardContent className="p-0 relative">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={beforeImg.imageUrl}
                      alt={beforeImg.description}
                      fill
                      className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                      data-ai-hint={beforeImg.imageHint}
                    />
                    <Image
                      src={afterImg.imageUrl}
                      alt={afterImg.description}
                      fill
                      className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      data-ai-hint={afterImg.imageHint}
                    />
                     <div className="absolute top-2 right-2 bg-background/80 px-2 py-1 rounded-full flex items-center gap-2 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                      Antes <ArrowRight className="h-3 w-3" /> Después
                    </div>
                  </div>
                   <div className="p-4 bg-card">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
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
