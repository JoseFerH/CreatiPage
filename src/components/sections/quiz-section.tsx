import { QuizForm } from "@/components/quiz-form";
import { Lightbulb, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";

export function QuizSection() {
  return (
    <section id="quiz" className="py-24 md:py-32 bg-[#121B52] text-white relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#B6D7F2]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-float-slow" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F4DEC6]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-float-slower" />

      <div className="container mx-auto max-w-4xl px-4 relative z-10">
        <ScrollReveal direction="up" className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-headline tracking-tight">
            ¿Qué está <span className="text-[#F4DEC6]">frenando</span> tu marca?
          </h2>
          <p className="text-lg md:text-xl text-[#B6D7F2]/80 max-w-2xl mx-auto font-medium">
            Completá este diagnóstico rápido de 4 preguntas para descubrir qué necesita tu marca para despegar.
          </p>
        </ScrollReveal>
        
        <ScrollReveal direction="up" delay={200}>
          <div className="bg-white rounded-3xl shadow-2xl p-1 md:p-2 border border-white/20">
            <QuizForm />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
