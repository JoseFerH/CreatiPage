"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalizedBrandRecommendations, type QuizOutput } from "@/ai/flows/personalized-brand-recommendations";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Loader2, ArrowRight, Sparkles, Wand2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const QuizInputSchema = z.object({
  question1: z.enum([
      'Tengo una marca, pero no se ve profesional.',
      'Tengo redes activas, pero no vendo.',
      'Estoy comenzando desde cero.',
      'Quiero escalar, pero no sé cómo hacerlo bien.',
    ], { required_error: "Por favor, seleccioná una opción." }),
  question2: z.enum([
      'Que mi marca no genera confianza.',
      'Que mis diseños no conectan ni venden.',
      'Que no tengo una web ni presencia digital.',
      'Que no sé cómo ordenar ni estructurar todo.',
    ], { required_error: "Por favor, seleccioná una opción." }),
  question3: z.enum([
      'Yo lo hago todo (¡y ya no puedo más!).',
      'Tengo ayuda, pero no es estratégica.',
      'He invertido, pero no veo resultados.',
      'No he hecho nada aún.',
    ], { required_error: "Por favor, seleccioná una opción." }),
  question4: z.enum([
      'Aumentar ventas y visibilidad.',
      'Sentirme orgullosa de mi identidad visual.',
      'Delegar para tener más tiempo y crecer.',
      'Lanzar algo nuevo con una base sólida.',
    ], { required_error: "Por favor, seleccioná una opción." }),
});

type QuizInput = z.infer<typeof QuizInputSchema>;

const questions: { id: keyof QuizInput; label: string; options: readonly string[]; }[] = [
  { id: "question1", label: "¿Cuál es tu situación actual?", options: QuizInputSchema.shape.question1.options },
  { id: "question2", label: "¿Qué es lo que más te preocupa hoy?", options: QuizInputSchema.shape.question2.options },
  { id: "question3", label: "¿Cómo manejás actualmente tu contenido o imagen de marca?", options: QuizInputSchema.shape.question3.options },
  { id: "question4", label: "¿Qué te gustaría lograr con tu marca en los próximos 3 meses?", options: QuizInputSchema.shape.question4.options },
];

export function QuizForm() {
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<QuizOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<QuizInput>({
    resolver: zodResolver(QuizInputSchema),
  });

  const handleNext = async () => {
    const field = questions[step].id;
    const isStepValid = await form.trigger(field);
    if (isStepValid) {
      setStep((prev) => prev + 1);
    }
  };

  const onSubmit = async (data: QuizInput) => {
    setIsLoading(true);
    setResult(null);
    try {
      const recommendations = await personalizedBrandRecommendations(data);
      setResult(recommendations);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron obtener las recomendaciones. Por favor, intentá de nuevo.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center p-8 flex flex-col items-center justify-center gap-4 bg-white rounded-lg shadow-inner min-h-[300px]">
        <Loader2 className="h-12 w-12 animate-spin text-accent-foreground" />
        <h3 className="text-xl font-semibold">Analizando tus respuestas...</h3>
        <p>Estamos preparando tu recomendación personalizada.</p>
      </div>
    );
  }
  
  if (result) {
    return (
      <Card className="text-center p-6 sm:p-8 bg-white shadow-lg animate-in fade-in-50 text-accent-foreground">
        <CardHeader>
          <Wand2 className="mx-auto h-12 w-12 text-accent-foreground mb-4" />
          <CardTitle className="text-2xl font-headline">¡Tu diagnóstico está listo!</CardTitle>
          <CardDescription className="text-accent-foreground/80">Basado en tus respuestas, esto es lo que tu marca necesita:</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-lg font-semibold mb-8">
            {result.recommendations.map((rec, i) => (
              <li key={i}>{rec}</li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent-foreground text-accent hover:bg-accent-foreground/90">
              <Link href="#contact">Agendar Asesoría Gratis</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white text-accent-foreground border-accent-foreground hover:bg-accent-foreground/10">
              <Link href="#services">Explorar Servicios</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = questions[step];
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4 sm:p-6 border rounded-lg bg-white text-accent-foreground">
        <Progress value={((step + 1) / questions.length) * 100} className="mb-8" />
        
        <FormField
          control={form.control}
          name={currentQuestion.id}
          render={({ field }) => (
            <FormItem className="space-y-3 min-h-[300px]">
              <FormLabel className="text-xl font-semibold text-center block">{currentQuestion.label}</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-2 pt-4"
                >
                  {currentQuestion.options.map((option) => (
                    <FormItem key={option} className="flex items-center space-x-3 space-y-0 p-3 rounded-lg border border-transparent hover:border-accent-foreground transition-colors">
                      <FormControl>
                         <RadioGroupItem value={option} className="border-accent-foreground text-accent-foreground" />
                      </FormControl>
                      <FormLabel className="font-normal text-base cursor-pointer flex-1">{option}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage className="text-center" />
            </FormItem>
          )}
        />

        <div className="flex justify-between items-center pt-4 border-t">
          <Button type="button" variant="ghost" onClick={() => setStep(step - 1)} disabled={step === 0}>Anterior</Button>
          
          {step < questions.length - 1 ? (
            <Button type="button" onClick={handleNext} className="bg-accent-foreground text-accent hover:bg-accent-foreground/90">
              Siguiente <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" className="bg-accent-foreground text-accent hover:bg-accent-foreground/90">
              <Sparkles className="mr-2 h-4 w-4" />
              Obtener mi recomendación
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
