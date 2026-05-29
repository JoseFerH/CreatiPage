"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalizedBrandRecommendations, type QuizOutput } from "@/ai/flows/personalized-brand-recommendations";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Loader2, ArrowRight, ArrowLeft, Sparkles, Wand2, CheckCircle2 } from "lucide-react";
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
      <div className="text-center p-12 flex flex-col items-center justify-center gap-6 bg-white rounded-3xl min-h-[400px]">
        <div className="relative">
          <div className="absolute inset-0 bg-[#B6D7F2] blur-xl rounded-full opacity-50 animate-pulse" />
          <Loader2 className="h-16 w-16 animate-spin text-[#121B52] relative z-10" />
        </div>
        <div>
          <h3 className="text-2xl font-bold font-headline text-[#121B52] mb-2">Analizando tus respuestas...</h3>
          <p className="text-[#121B52]/70">Nuestra IA está preparando tu recomendación personalizada basada en la experiencia de Creati.</p>
        </div>
      </div>
    );
  }
  
  if (result) {
    return (
      <Card className="text-center p-8 sm:p-12 bg-white border-none shadow-none text-[#121B52] rounded-3xl">
        <CardHeader className="p-0 mb-8">
          <div className="mx-auto bg-[#F4DEC6]/30 w-20 h-20 rounded-full flex items-center justify-center mb-6">
            <Wand2 className="h-10 w-10 text-[#9B6F50]" />
          </div>
          <CardTitle className="text-3xl font-headline font-bold">¡Tu diagnóstico está listo!</CardTitle>
          <CardDescription className="text-lg text-[#121B52]/70 mt-2">Basado en tus respuestas, esto es lo que tu marca necesita:</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="space-y-4 text-left max-w-2xl mx-auto mb-10">
            {result.recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-4 bg-[#f8fbfe] p-4 rounded-xl border border-[#B6D7F2]/20">
                <CheckCircle2 className="text-[#B6D7F2] h-6 w-6 shrink-0 mt-0.5" />
                <span className="text-[#121B52]/90 font-medium leading-relaxed">{rec}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="btn-press bg-[#121B52] text-[#B6D7F2] hover:bg-[#1a2766] rounded-full px-8">
              <Link href="#contact">Agendar Asesoría Gratis</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="btn-press bg-white text-[#121B52] border-2 border-[#f0f4f8] hover:bg-[#f8fbfe] rounded-full px-8">
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 sm:p-10 bg-white rounded-3xl text-[#121B52]">
        <div className="mb-8 flex items-center gap-4">
          <div className="text-sm font-bold text-[#B6D7F2] w-16">
            Paso {step + 1}/{questions.length}
          </div>
          <Progress value={((step + 1) / questions.length) * 100} className="h-2 bg-[#f0f4f8]" />
        </div>
        
        <FormField
          control={form.control}
          name={currentQuestion.id}
          render={({ field }) => (
            <FormItem className="space-y-6 min-h-[300px]">
              <FormLabel className="text-2xl sm:text-3xl font-bold font-headline text-center block mb-8">
                {currentQuestion.label}
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid sm:grid-cols-2 gap-4"
                >
                  {currentQuestion.options.map((option) => {
                    const isSelected = field.value === option;
                    return (
                      <FormItem 
                        key={option} 
                        className={`flex items-start space-x-0 space-y-0 p-4 sm:p-6 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
                          isSelected 
                            ? "border-[#121B52] bg-[#f8fbfe] shadow-sm" 
                            : "border-[#f0f4f8] hover:border-[#B6D7F2]/50 hover:bg-[#f8fbfe]/50"
                        }`}
                        onClick={() => field.onChange(option)}
                      >
                        <FormControl>
                           <RadioGroupItem value={option} className="sr-only" />
                        </FormControl>
                        <div className="flex items-start gap-4 w-full">
                          <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                            isSelected ? "border-[#121B52]" : "border-[#B6D7F2]"
                          }`}>
                            {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#121B52]" />}
                          </div>
                          <FormLabel className="font-medium text-lg cursor-pointer flex-1 leading-snug">
                            {option}
                          </FormLabel>
                        </div>
                      </FormItem>
                    );
                  })}
                </RadioGroup>
              </FormControl>
              <FormMessage className="text-center font-medium" />
            </FormItem>
          )}
        />

        <div className="flex justify-between items-center pt-8 mt-4 border-t border-[#f0f4f8]">
          <Button 
            type="button" 
            variant="ghost" 
            onClick={() => setStep(step - 1)} 
            disabled={step === 0}
            className="text-[#121B52]/60 hover:text-[#121B52] hover:bg-[#f8fbfe] rounded-full btn-press"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
          </Button>
          
          {step < questions.length - 1 ? (
            <Button 
              type="button" 
              onClick={handleNext} 
              className="bg-[#121B52] text-[#B6D7F2] hover:bg-[#1a2766] rounded-full px-6 btn-press"
            >
              Siguiente <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button 
              type="submit" 
              className="bg-[#121B52] text-[#B6D7F2] hover:bg-[#1a2766] rounded-full px-6 btn-press"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Obtener diagnóstico
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
