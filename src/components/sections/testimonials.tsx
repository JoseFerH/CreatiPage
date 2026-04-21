"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Marcela G.",
    title: "Emprendedora",
    quote: "Después de trabajar con Creati, mis ventas aumentaron y por fin me siento orgullosa de cómo se ve mi negocio.",
    avatar: "https://picsum.photos/seed/avatar1/100/100",
  },
  {
    name: "Javier P.",
    title: "CEO de TechNova",
    quote: "El proceso fue transparente y los resultados superaron nuestras expectativas. Nuestra presencia digital nunca fue tan sólida.",
    avatar: "https://picsum.photos/seed/avatar2/100/100",
  },
  {
    name: "Sofía L.",
    title: "Diseñadora de Modas",
    quote: "Entendieron la esencia de mi marca a la perfección. Ahora mi identidad visual cuenta la historia que siempre quise.",
    avatar: "https://picsum.photos/seed/avatar3/100/100",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 md:py-32 bg-zinc-50/50">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-6 font-headline text-navy tracking-tight">
            Éxito de <span className="font-accent italic text-lightblue font-normal">Clientes</span>
          </h2>
          <p className="text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto font-light leading-relaxed">
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
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-2 h-full">
                  <Card className="h-full flex flex-col justify-between shadow-sm hover:shadow-xl transition-shadow duration-300 bg-white border-none rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-lightblue transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                    <CardContent className="p-8 flex flex-col gap-6">
                      <p className="font-accent italic flex-grow text-navy leading-relaxed text-xl">"{testimonial.quote}"</p>
                      <div className="flex items-center gap-4 pt-6 border-t mt-4 border-zinc-50">
                        <Avatar className="h-14 w-14 ring-2 ring-lightblue/20 ring-offset-2">
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                          <AvatarFallback className="bg-navy text-white">{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-bold text-navy">{testimonial.name}</p>
                          <p className="text-sm text-zinc-500 font-light">{testimonial.title}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden xl:inline-flex text-navy bg-white border-none shadow-md hover:bg-lightblue/10 hover:text-navy rounded-full transition-colors" />
          <CarouselNext className="hidden xl:inline-flex text-navy bg-white border-none shadow-md hover:bg-lightblue/10 hover:text-navy rounded-full transition-colors" />
        </Carousel>
      </div>
    </section>
  );
}