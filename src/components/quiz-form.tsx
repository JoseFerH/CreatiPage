"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Loader2, ArrowRight, ArrowLeft, Sparkles, Wand2, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

const QuizInputSchema = z.object({
  question1: z.enum([
      'Tengo una marca, pero no se ve profesional.',
      'Tengo redes activas, pero no estoy vendiendo.',
      'Apenas estoy comenzando.',
      'Quiero escalar, pero no sé por dónde empezar.',
    ], { required_error: "Por favor, seleccioná una opción." }),
  question2: z.enum([
      'Que mi marca no genera confianza.',
      'Que mis diseños no conectan ni venden.',
      'Que no tengo página web ni presencia fuera de Instagram.',
      'Que no sé cómo estructurar mi negocio para crecer.',
    ], { required_error: "Por favor, seleccioná una opción." }),
  question3: z.enum([
      'Yo lo hago todo (¡y ya no puedo más!).',
      'Tengo ayuda, pero no es estratégica.',
      'He invertido antes, pero no vi resultados.',
      'No he hecho nada todavía.',
    ], { required_error: "Por favor, seleccioná una opción." }),
  question4: z.enum([
      'Sentirme orgulloso/a de cómo se ve mi marca.',
      'Aumentar mis ventas y visibilidad.',
      'Lanzar mi web o tienda online.',
      'Delegar tareas, escalar y tener más tiempo libre.',
    ], { required_error: "Por favor, seleccioná una opción." }),
  question5: z.enum([
      '¡Sí!',
      'No, solo quiero ver mi resultado.',
    ], { required_error: "Por favor, seleccioná una opción." }),
  email: z.string().email("Ingresá un correo válido").optional().or(z.literal("")),
});

type QuizInput = z.infer<typeof QuizInputSchema>;

const questions: { id: keyof QuizInput; label: string; options: readonly string[]; showEmailOn?: string }[] = [
  { id: "question1", label: "¿En qué punto está tu negocio hoy?", options: QuizInputSchema.shape.question1.options },
  { id: "question2", label: "¿Qué es lo que más te preocupa ahora mismo?", options: QuizInputSchema.shape.question2.options },
  { id: "question3", label: "¿Cómo manejás actualmente el diseño o el contenido de tu negocio?", options: QuizInputSchema.shape.question3.options },
  { id: "question4", label: "¿Qué te gustaría lograr en los próximos 3 meses?", options: QuizInputSchema.shape.question4.options },
  { id: "question5", label: "¿Te gustaría recibir una mini guía con recomendaciones personalizadas según tu resultado?", options: QuizInputSchema.shape.question5.options, showEmailOn: "¡Sí!" },
];

type ResultCategory = "Identidad" | "Digital" | "Marketing" | "Finanzas";

const mapping: Record<string, ResultCategory[]> = {
  // Q1
  'Tengo una marca, pero no se ve profesional.': ['Identidad'],
  'Tengo redes activas, pero no estoy vendiendo.': ['Marketing'],
  'Apenas estoy comenzando.': ['Identidad', 'Finanzas'],
  'Quiero escalar, pero no sé por dónde empezar.': ['Finanzas'],
  // Q2
  'Que mi marca no genera confianza.': ['Identidad'],
  'Que mis diseños no conectan ni venden.': ['Marketing'],
  'Que no tengo página web ni presencia fuera de Instagram.': ['Digital'],
  'Que no sé cómo estructurar mi negocio para crecer.': ['Finanzas'],
  // Q3
  'Yo lo hago todo (¡y ya no puedo más!).': ['Identidad', 'Finanzas'],
  'Tengo ayuda, pero no es estratégica.': ['Marketing'],
  'He invertido antes, pero no vi resultados.': ['Digital'],
  'No he hecho nada todavía.': ['Identidad', 'Finanzas'],
  // Q4
  'Sentirme orgulloso/a de cómo se ve mi marca.': ['Identidad'],
  'Aumentar mis ventas y visibilidad.': ['Marketing'],
  'Lanzar mi web o tienda online.': ['Digital'],
  'Delegar tareas, escalar y tener más tiempo libre.': ['Finanzas'],
};

const resultsData: Record<ResultCategory, { title: string, text: string }> = {
  Identidad: {
    title: "Necesitás una Identidad de Marca",
    text: "Tu marca necesita una base sólida. Logo, colores, estilo… todo debe hablar por vos. Te ayudamos a crear una identidad visual que inspire y venda."
  },
  Digital: {
    title: "Necesitás Presencia Digital",
    text: "Tu negocio pide a gritos una web o una tienda online que proyecte profesionalismo y genere confianza. La solución está a un clic."
  },
  Marketing: {
    title: "Necesitás Marketing Visual Estratégico",
    text: "Tu contenido no solo debe ser bonito, debe CONVERTIR. Vamos a darle dirección, estructura y emoción visual a tu marca."
  },
  Finanzas: {
    title: "Necesitás Estructura y Finanzas",
    text: "Tenés potencial, pero te falta claridad. Con una estructura estratégica y asesoría financiera, podés escalar sin frustrarte."
  }
};

export function QuizForm() {
  const [hasStarted, setHasStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [finalResult, setFinalResult] = useState<{ title: string, text: string } | null>(null);
  const { toast } = useToast();

  const form = useForm<QuizInput>({
    resolver: zodResolver(QuizInputSchema),
    defaultValues: { email: "" }
  });

  const handleNext = async () => {
    const field = questions[step].id;
    const isStepValid = await form.trigger(field);
    if (isStepValid) {
      setStep((prev) => prev + 1);
    }
  };

  const calculateResult = (data: QuizInput): ResultCategory => {
    const scores: Record<ResultCategory, number> = { Identidad: 0, Digital: 0, Marketing: 0, Finanzas: 0 };
    const answers = [data.question1, data.question2, data.question3, data.question4];
    
    answers.forEach(answer => {
      const categories = mapping[answer as string] || [];
      categories.forEach(cat => scores[cat]++);
    });

    let maxCat: ResultCategory = "Identidad";
    let maxScore = -1;
    for (const [cat, score] of Object.entries(scores)) {
      if (score > maxScore) {
        maxScore = score;
        maxCat = cat as ResultCategory;
      }
    }
    return maxCat;
  };

  const onSubmit = async (data: QuizInput) => {
    // Validate email if "¡Sí!" was selected
    if (data.question5 === "¡Sí!" && !data.email) {
      form.setError("email", { type: "manual", message: "Por favor, ingresá un correo para enviarte la guía." });
      return;
    }

    setIsLoading(true);
    setFinalResult(null);
    
    try {
      const category = calculateResult(data);
      
      // Save to Firebase
      await addDoc(collection(db, "leads_quiz"), {
        respuestas: {
          q1: data.question1,
          q2: data.question2,
          q3: data.question3,
          q4: data.question4,
          quiere_guia: data.question5
        },
        email: data.email || null,
        resultado_categoria: category,
        fecha: new Date().toISOString()
      });

      // Simulate a small delay for better UX even though save is fast
      setTimeout(() => {
        setFinalResult(resultsData[category]);
        setIsLoading(false);
      }, 500);
      
    } catch (error) {
      console.error("Error al guardar quiz:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Hubo un problema procesando tus respuestas. Por favor, intentá de nuevo.",
      });
      setIsLoading(false);
    }
  };

  if (!hasStarted) {
    return (
      <Card className="text-center p-8 sm:p-12 bg-white border-none shadow-none text-[#121B52] rounded-3xl min-h-[400px] flex flex-col justify-center items-center">
        <div className="mx-auto bg-[#B6D7F2]/30 w-20 h-20 rounded-full flex items-center justify-center mb-6">
          <Sparkles className="h-10 w-10 text-[#121B52]" />
        </div>
        <h3 className="text-3xl font-headline font-bold mb-4">¿Qué está frenando tu marca?</h3>
        <p className="text-lg text-[#121B52]/70 max-w-md mx-auto mb-8">
          Te invitamos a responder un breve cuestionario interactivo de 5 preguntas. Analizaremos tu situación actual para darte recomendaciones exactas.
        </p>
        <Button 
          onClick={() => setHasStarted(true)}
          size="lg" 
          className="bg-[#121B52] text-[#B6D7F2] hover:bg-[#1a2766] rounded-full px-10 py-6 text-lg btn-press shadow-lg"
        >
          Comenzar diagnóstico <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center p-12 flex flex-col items-center justify-center gap-6 bg-white rounded-3xl min-h-[400px]">
        <div className="relative">
          <div className="absolute inset-0 bg-[#B6D7F2] blur-xl rounded-full opacity-50 animate-pulse" />
          <Loader2 className="h-16 w-16 animate-spin text-[#121B52] relative z-10" />
        </div>
        <div>
          <h3 className="text-2xl font-bold font-headline text-[#121B52] mb-2">Calculando resultados...</h3>
          <p className="text-[#121B52]/70">Estamos procesando tus respuestas para encontrar tu solución ideal.</p>
        </div>
      </div>
    );
  }
  
  if (finalResult) {
    return (
      <Card className="text-center p-8 sm:p-12 bg-white border-none shadow-none text-[#121B52] rounded-3xl">
        <CardHeader className="p-0 mb-8">
          <div className="mx-auto bg-[#F4DEC6]/30 w-20 h-20 rounded-full flex items-center justify-center mb-6">
            <Wand2 className="h-10 w-10 text-[#9B6F50]" />
          </div>
          <CardTitle className="text-3xl md:text-4xl font-headline font-bold mb-2">{finalResult.title}</CardTitle>
          <CardDescription className="text-lg text-[#121B52]/80 mt-4 max-w-2xl mx-auto leading-relaxed">
            {finalResult.text}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 mt-8">
          <p className="text-[#121B52] font-semibold mb-6">¿Querés una asesoría gratis basada en tu resultado?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap">
            <Button asChild size="lg" className="btn-press bg-[#121B52] text-[#B6D7F2] hover:bg-[#1a2766] rounded-full px-6 w-full sm:w-auto">
              <Link href="#contact">Agendá ahora con el equipo Creati</Link>
            </Button>
            <Button 
              onClick={(e) => {
                e.preventDefault();
                toast({
                  variant: "destructive",
                  title: "Servicio no disponible",
                  description: "El envío de la mini guía no está configurado actualmente. Por favor, intentá de nuevo más tarde."
                });
              }}
              size="lg" 
              className="btn-press bg-[#25D366] text-white hover:bg-[#128C7E] rounded-full px-6 w-full sm:w-auto"
            >
              Descargá tu mini guía
            </Button>
            <Button asChild size="lg" variant="outline" className="btn-press bg-white text-[#121B52] border-2 border-[#f0f4f8] hover:bg-[#f8fbfe] rounded-full px-6 w-full sm:w-auto">
              <Link href="#services">Explorar servicios</Link>
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
          key={currentQuestion.id}
          control={form.control}
          name={currentQuestion.id as any}
          render={({ field }) => (
            <FormItem className="space-y-6 min-h-[300px]">
              <FormLabel className="text-2xl sm:text-3xl font-bold font-headline text-center block mb-8">
                {currentQuestion.label}
              </FormLabel>
              <FormControl>
                <div className="space-y-6">
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value as string}
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
                  
                  {/* Dynamic Email Field for Question 5 */}
                  {currentQuestion.showEmailOn && form.watch(currentQuestion.id as any) === currentQuestion.showEmailOn && (
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field: emailField }) => (
                        <FormItem className="mt-6 animate-hero-fade-in">
                          <FormLabel className="font-bold text-[#121B52]">Tu correo electrónico</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="tu@email.com" 
                              type="email" 
                              {...emailField} 
                              className="bg-[#f8fbfe] border-[#f0f4f8] focus-visible:ring-[#121B52] focus-visible:border-[#121B52] text-[#121B52] placeholder:text-[#121B52]/40 rounded-xl h-14 text-lg transition-all duration-300" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
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
              disabled={!form.watch(currentQuestion.id as any)}
              className="bg-[#121B52] text-[#B6D7F2] hover:bg-[#1a2766] rounded-full px-6 btn-press disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Siguiente <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button 
              type="submit" 
              disabled={!form.watch(currentQuestion.id as any)}
              className="bg-[#121B52] text-[#B6D7F2] hover:bg-[#1a2766] rounded-full px-6 btn-press disabled:opacity-50 disabled:cursor-not-allowed"
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
