import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";

export function About() {
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about-us-image');

  return (
    <section id="about" className="py-24 md:py-32 bg-white text-[#121B52] overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div className="order-2 md:order-1">
            <ScrollReveal direction="right" duration={800}>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 font-headline tracking-tight text-[#121B52]">
                No somos como <span className="text-[#9B6F50]">cualquier agencia.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={150} duration={800}>
              <p className="text-lg md:text-xl mb-8 text-[#121B52]/80 leading-relaxed font-medium">
                En Creati no solo diseñamos: te acompañamos en todo el proceso de transformación de tu marca. Creemos en la transparencia total.
              </p>
            </ScrollReveal>

            <div className="space-y-6 mb-8">
              {[
                "Usamos herramientas colaborativas donde podés ver los avances en tiempo real.",
                "Cada paso es medible, claro y estratégico.",
                "Mostramos cómo cada creación impacta en tu crecimiento."
              ].map((item, index) => (
                <ScrollReveal 
                  key={index} 
                  direction="right" 
                  delay={300 + (index * 100)} 
                  duration={600}
                >
                  <div className="flex items-start gap-4 group">
                    <div className="mt-1 bg-[#B6D7F2]/30 p-1 rounded-full group-hover:bg-[#B6D7F2] transition-colors duration-300">
                      <CheckCircle2 className="text-[#121B52] h-5 w-5 shrink-0" />
                    </div>
                    <span className="text-lg text-[#121B52]/80">{item}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal direction="right" delay={700} duration={800}>
              <div className="p-6 bg-[#f8fbfe] border-l-4 border-[#121B52] rounded-r-lg">
                <p className="font-semibold text-lg italic text-[#121B52]">
                  "Porque tu marca merece más que un diseño bonito. Merece resultados, dirección y propósito."
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="order-1 md:order-2 flex justify-center relative">
            <ScrollReveal direction="left" duration={1000} className="w-full relative z-10">
              {aboutImage && (
                <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl shadow-[#121B52]/10 group">
                  <div className="absolute inset-0 bg-[#121B52]/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <Image
                    src={aboutImage.imageUrl}
                    alt={aboutImage.description}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    data-ai-hint={aboutImage.imageHint}
                  />
                </div>
              )}
            </ScrollReveal>
            
            {/* Decorative background element */}
            <ScrollReveal direction="none" delay={300} duration={1000} className="absolute -right-8 -bottom-8 -z-0">
              <div className="w-64 h-64 bg-[#F4DEC6]/40 rounded-full blur-3xl animate-float-slow" />
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
