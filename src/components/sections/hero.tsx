import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center text-center bg-gradient-to-r from-white to-[#B6D7F2] overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 leading-tight text-foreground font-headline">
          Tu marca de invisible a inolvidable.
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-foreground/80">
          En Creati, diseñamos tu identidad visual, estructuramos tu negocio y proyectamos tu esencia para que crezcas con propósito. Diseño con estrategia. Marca con alma.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" variant="outline">
            <Link href="#services">Conocé nuestros servicios</Link>
          </Button>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="#contact">Agendá tu asesoría inicial</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
