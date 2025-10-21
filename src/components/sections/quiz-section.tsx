import { QuizForm } from "@/components/quiz-form";
import { Lightbulb } from "lucide-react";

export function QuizSection() {
  return (
    <section id="quiz" className="py-16 md:py-24 bg-gradient-to-r from-white to-accent text-accent-foreground">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="text-center mb-12">
          <Lightbulb className="mx-auto h-12 w-12 text-accent-foreground mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-2 font-headline">¿Qué está frenando tu marca?</h2>
          <p className="text-lg">
            Completá este diagnóstico rápido de 4 preguntas para descubrir qué necesita tu marca para despegar.
          </p>
        </div>
        <QuizForm />
      </div>
    </section>
  );
}
