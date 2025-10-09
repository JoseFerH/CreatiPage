"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";

// Inline SVG for WhatsApp icon
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M16.75 13.96c.25.13.43.2.5.28.08.08.16.18.23.28.07.1.13.2.18.33.05.1.08.2.1.33.03.12.03.25.02.38-.02.13-.05.25-.1.38-.05.12-.1.23-.18.33-.08.1-.16.18-.25.25-.1.08-.2.14-.3.2-.1.07-.2.12-.33.16-.12.04-.25.07-.38.08-.13.02-.25.02-.38.02-.12 0-.24-.02-.36-.03-.12-.02-.24-.05-.36-.08-.1-.03-.2-.07-.3-.13-.1-.05-.18-.1-.26-.18-.08-.08-.15-.15-.22-.23-.07-.08-.13-.16-.18-.24-.05-.08-.1-.16-.14-.24-.04-.08-.08-.16-.1-.25-.03-.1-.05-.2-.07-.3-.02-.1-.03-.2-.03-.3s0-.2.02-.3c0-.02 0-.03.02-.05.38-.87.63-1.8.74-2.75.08-.6.03-1.2-.14-1.8-.1-.35-.25-.7-.43-1.03-.18-.32-.4-.6-.66-.87-.27-.26-.57-.5-.9-.7-.33-.2-.7-.38-1.08-.5-.38-.14-.78-.2-1.18-.2-.13 0-.25.02-.38.03-.13.02-.25.04-.38.07-.12.03-.24.06-.36.1-.12.04-.23.08-.34.13-.1.05-.2.1-.3.16-.1.06-.2.12-.28.2-.08.08-.16.15-.23.23-.07.08-.14.16-.2.24-.06.08-.1.17-.15.25-.05.08-.1.17-.13.26-.03.1-.06.2-.08.3-.02.1-.03.2-.04.3-.02.12-.02.25-.02.38.02.13.04.25.07.38.03.12.07.24.1.36.04.12.08.23.13.34.05.1.1.2.16.3.06.1.12.2.2.28.08.08.15.16.23.23.5.52 1.1.93 1.76 1.26.28.14.58.26.88.35.3.1.6.15.92.18.32.03.64.03.95 0 .6-.05 1.2-.2 1.73-.44.5-.24.94-.56 1.32-.95.38-.4.7-.86.94-1.36.23-.5.38-1.04.44-1.6.05-.55.02-1.1-.1-1.63s-.4-1-.7-1.4c-.1-.14-.2-.28-.33-.4s-.26-.23-.4-.32z"/>
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
      title: "¡Mensaje enviado!",
      description: "Gracias por contactarnos. Te responderemos a la brevedad.",
    });
    form.reset();
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-headline">Contanos tu visión.</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Nosotros la transformamos en marca. Porque cada gran negocio comienza con una conversación.
            </p>
            <Button asChild className="bg-[#25D366] hover:bg-[#128C7E] text-white text-lg px-8 py-6">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="mr-3 h-6 w-6" />
                Chateá por WhatsApp
              </a>
            </Button>
          </div>
          <Card className="p-6 sm:p-8 shadow-lg">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl><Input placeholder="Tu nombre" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl><Input placeholder="tu@email.com" type="email" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mensaje</FormLabel>
                      <FormControl><Textarea placeholder="Contanos sobre tu proyecto..." {...field} rows={4} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={form.formState.isSubmitting} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Enviar Mensaje
                </Button>
              </form>
            </Form>
          </Card>
        </div>
      </div>
    </section>
  );
}
