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
import { ScrollReveal } from "@/components/scroll-reveal";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Marcela G.",
    title: "Emprendedora",
    quote: "Después de trabajar con Creati, mis ventas aumentaron y por fin me siento orgullosa de cómo se ve mi negocio. El proceso fue claro desde el día uno.",
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
    quote: "Entendieron la esencia de mi marca a la perfección. Ahora mi identidad visual cuenta la historia que siempre quise transmitir.",
    avatar: "https://picsum.photos/seed/avatar3/100/100",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 md:py-32 bg-[#f8fbfe] text-[#121B52] relative overflow-hidden">
      {/* Decorative large quote */}
      <div className="absolute top-10 left-10 md:top-20 md:left-20 text-[#B6D7F2] opacity-20 rotate-[-10deg]">
        <Quote size={200} />
      </div>

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <ScrollReveal direction="up">
            <h2 className="text-3xl md:text-5xl font-bold font-headline tracking-tight">
              Historias de <span className="text-[#9B6F50]">Éxito</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={150}>
            <p className="text-lg md:text-xl mt-4 max-w-2xl mx-auto text-[#121B52]/70 font-medium">
              La confianza de nuestros clientes es nuestro mayor logro.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal direction="up" delay={300} duration={800}>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3 pt-6 pb-10">
                  <div className="h-full relative group">
                    {/* Orange accent blob on hover */}
                    <div className="absolute inset-0 bg-[#F4DEC6] rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 transform scale-90 translate-y-4 group-hover:translate-y-0 group-hover:scale-100" />
                    
                    <Card className="h-full flex flex-col justify-between shadow-md shadow-[#121B52]/5 hover:shadow-xl hover:shadow-[#121B52]/10 bg-white border-none rounded-2xl transition-all duration-500 transform group-hover:-translate-y-2 relative z-10">
                      <CardContent className="p-8 flex flex-col gap-6">
                        <Quote className="text-[#B6D7F2] h-8 w-8 mb-2" />
                        <p className="text-[#121B52]/80 leading-relaxed text-lg flex-grow relative z-10">
                          {testimonial.quote}
                        </p>
                        
                        <div className="flex items-center gap-4 pt-6 mt-4 border-t border-[#f0f4f8]">
                          <Avatar className="h-12 w-12 border-2 border-[#f8fbfe]">
                            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                            <AvatarFallback className="bg-[#B6D7F2] text-[#121B52]">{testimonial.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-bold text-[#121B52]">{testimonial.name}</p>
                            <p className="text-sm font-medium text-[#9B6F50]">{testimonial.title}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <div className="flex items-center justify-center gap-4 mt-8">
              <CarouselPrevious className="static translate-y-0 text-[#121B52] bg-white border-2 border-[#f0f4f8] hover:bg-[#B6D7F2] hover:text-[#121B52] hover:border-[#B6D7F2] transition-colors btn-press shadow-sm" />
              <CarouselNext className="static translate-y-0 text-[#121B52] bg-white border-2 border-[#f0f4f8] hover:bg-[#B6D7F2] hover:text-[#121B52] hover:border-[#B6D7F2] transition-colors btn-press shadow-sm" />
            </div>
          </Carousel>
        </ScrollReveal>
      </div>
    </section>
  );
}
