"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Testimonial = {
  id?: string;
  name: string;
  title: string;
  quote: string;
  avatar: string;
};

const fallbackTestimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Marcela G.",
    title: "Emprendedora",
    quote: "Después de trabajar con Creati, mis ventas aumentaron y por fin me siento orgullosa de cómo se ve mi negocio.",
    avatar: "https://picsum.photos/seed/avatar1/100/100",
  },
  {
    id: "t2",
    name: "Javier P.",
    title: "CEO de TechNova",
    quote: "El proceso fue transparente y los resultados superaron nuestras expectativas. Nuestra presencia digital nunca fue tan sólida.",
    avatar: "https://picsum.photos/seed/avatar2/100/100",
  },
  {
    id: "t3",
    name: "Sofía L.",
    title: "Diseñadora de Modas",
    quote: "Entendieron la esencia de mi marca a la perfección. Ahora mi identidad visual cuenta la historia que siempre quise.",
    avatar: "https://picsum.photos/seed/avatar3/100/100",
  },
];

export function Testimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      try {
        const querySnapshot = await getDocs(collection(db, "testimonials"));
        const data: Testimonial[] = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() } as Testimonial);
        });
        setItems(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
  }, []);

  const displayItems = !loading && items.length > 0 ? items : fallbackTestimonials;

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-gradient-to-r from-white to-primary-foreground text-primary">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Historias de Éxito</h2>
          <p className="text-lg mt-2">
            La confianza de nuestros clientes es nuestro mayor logro.
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {displayItems.map((testimonial, index) => (
              <CarouselItem key={testimonial.id || index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <Card className="h-full flex flex-col justify-between shadow-sm bg-white text-primary-foreground">
                    <CardContent className="p-6 flex flex-col gap-4">
                      <p className="italic flex-grow text-primary">"{testimonial.quote}"</p>
                      <div className="flex items-center gap-4 pt-4 border-t mt-4 border-primary-foreground/20">
                        <Avatar>
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-primary">{testimonial.name}</p>
                          <p className="text-sm text-primary/80">{testimonial.title}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden xl:inline-flex text-primary-foreground bg-white border-primary-foreground" />
          <CarouselNext className="hidden xl:inline-flex text-primary-foreground bg-white border-primary-foreground" />
        </Carousel>
      </div>
    </section>
  );
}
