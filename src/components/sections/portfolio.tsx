"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

type PortfolioItem = {
  id: string;
  title: string;
  beforeImageUrl: string;
  afterImageUrl: string;
};

const fallbackPortfolioItems = [
  { id: '1', beforeId: 'portfolio-before-1', afterId: 'portfolio-after-1', title: 'Rebranding Corporativo' },
  { id: '2', beforeId: 'portfolio-before-2', afterId: 'portfolio-after-2', title: 'Diseño de Packaging' },
  { id: '3', beforeId: 'portfolio-before-3', afterId: 'portfolio-after-3', title: 'Lanzamiento de E-commerce' },
];

export function Portfolio() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      try {
        const querySnapshot = await getDocs(collection(db, "portfolio"));
        const data: PortfolioItem[] = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() } as PortfolioItem);
        });
        setItems(data);
      } catch (error) {
        console.error("Error fetching portfolio items:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
  }, []);

  return (
    <section id="portfolio" className="py-16 md:py-24 bg-gradient-to-r from-white to-accent text-accent-foreground">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Tu marca también puede brillar así.</h2>
          <p className="text-lg mt-2">
            Aquí te mostramos cómo lo logramos.
          </p>
        </div>
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {!loading && items.length > 0 ? (
            items.map(item => (
              <Card key={item.id} className="overflow-hidden group shadow-lg bg-white text-accent-foreground">
                <CardContent className="p-0 relative">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={item.beforeImageUrl}
                      alt={`Antes: ${item.title}`}
                      fill
                      className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                    />
                    <Image
                      src={item.afterImageUrl}
                      alt={`Después: ${item.title}`}
                      fill
                      className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                     <div className="absolute top-2 right-2 bg-white/80 px-2 py-1 rounded-full flex items-center gap-2 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200 text-accent-foreground">
                      Antes <ArrowRight className="h-3 w-3" /> Después
                    </div>
                  </div>
                   <div className="p-4 bg-white">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            fallbackPortfolioItems.map(item => {
              const beforeImg = PlaceHolderImages.find(p => p.id === item.beforeId);
              const afterImg = PlaceHolderImages.find(p => p.id === item.afterId);
              if (!beforeImg || !afterImg) return null;

              return (
                <Card key={item.id} className="overflow-hidden group shadow-lg bg-white text-accent-foreground">
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
                       <div className="absolute top-2 right-2 bg-white/80 px-2 py-1 rounded-full flex items-center gap-2 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200 text-accent-foreground">
                        Antes <ArrowRight className="h-3 w-3" /> Después
                      </div>
                    </div>
                     <div className="p-4 bg-white">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
