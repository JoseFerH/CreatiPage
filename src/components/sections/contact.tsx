"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollReveal } from "@/components/scroll-reveal";

// Inline SVG for WhatsApp icon
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.067 2.877 1.215 3.076.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().email("Por favor, ingresá un email válido."),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres."),
});

export function Contact() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(values);
    toast({
      variant: "destructive",
      title: "Servicio no disponible",
      description: "El servicio de mensajería no está configurado. Por favor, intentá de nuevo más tarde.",
    });
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-white text-[#121B52]">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          <div>
            <ScrollReveal direction="right">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 font-headline tracking-tight">
                Contanos tu <span className="text-[#9B6F50]">visión.</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={150}>
              <p className="text-lg md:text-xl mb-10 text-[#121B52]/70 leading-relaxed font-medium">
                Nosotros la transformamos en marca. Porque cada gran negocio comienza con una conversación.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={300}>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  toast({
                    variant: "destructive",
                    title: "Servicio no disponible",
                    description: "El enlace de WhatsApp no está configurado. Por favor, intentá de nuevo más tarde."
                  });
                }}
                className="btn-press bg-[#25D366] hover:bg-[#128C7E] text-white text-lg px-8 py-7 rounded-2xl w-full sm:w-auto shadow-lg shadow-[#25D366]/20 group"
              >
                <div className="flex items-center justify-center">
                  <WhatsAppIcon className="mr-3 h-7 w-7 group-hover:scale-110 transition-transform duration-300" />
                  Hablanos por WhatsApp
                </div>
              </Button>
              <div className="mt-6 flex items-center gap-4 text-sm font-semibold text-[#121B52]/50">
                <div className="h-[1px] flex-grow bg-[#f0f4f8]" />
                {/* o escribinos por acá */}
                <div className="h-[1px] flex-grow bg-[#f0f4f8]" />
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="left" delay={200}>
            <Card className="p-8 sm:p-10 shadow-2xl shadow-[#121B52]/10 bg-white border-none rounded-3xl relative overflow-hidden group">
              {/* Subtle background gradient that appears on form interaction */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#f8fbfe] to-white opacity-0 group-focus-within:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-[#121B52]">Nombre</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Tu nombre"
                            {...field}
                            className="bg-[#f8fbfe] border-[#f0f4f8] focus-visible:ring-[#121B52] focus-visible:border-[#121B52] text-[#121B52] placeholder:text-[#121B52]/40 rounded-xl h-12 transition-all duration-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-[#121B52]">Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="tu@email.com"
                            type="email"
                            {...field}
                            className="bg-[#f8fbfe] border-[#f0f4f8] focus-visible:ring-[#121B52] focus-visible:border-[#121B52] text-[#121B52] placeholder:text-[#121B52]/40 rounded-xl h-12 transition-all duration-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-[#121B52]">Mensaje</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Contanos sobre tu proyecto..."
                            {...field}
                            rows={4}
                            className="bg-[#f8fbfe] border-[#f0f4f8] focus-visible:ring-[#121B52] focus-visible:border-[#121B52] text-[#121B52] placeholder:text-[#121B52]/40 rounded-xl resize-none transition-all duration-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="w-full btn-press bg-[#121B52] text-[#B6D7F2] hover:bg-[#1a2766] h-14 rounded-xl text-lg mt-4 group/btn"
                  >
                    {form.formState.isSubmitting ? (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        Enviar Mensaje
                        <Send className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </Card>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
