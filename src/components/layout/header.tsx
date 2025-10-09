"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/logo";

const navLinks = [
  { href: "#about", label: "Sobre Nosotros" },
  { href: "#services", label: "Servicios" },
  { href: "#portfolio", label: "Portafolio" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contacto" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-header-background/95 backdrop-blur supports-[backdrop-filter]:bg-header-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between text-header-foreground">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Logo className="text-primary" />
        </Link>
        <nav className="hidden md:flex md:items-center md:gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-header-foreground/80 text-header-foreground/60"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild className="hidden md:flex" variant="outline">
            <Link href="#quiz">Diagnóstico de Marca</Link>
          </Button>
          <Button asChild className="hidden md:flex bg-accent hover:bg-accent/90 text-accent-foreground">
             <Link href="#contact">Agendar Asesoría</Link>
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-4 border-b">
                   <Link href="/" onClick={() => setIsOpen(false)}>
                      <Logo className="text-primary" />
                   </Link>
                   <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                      <X className="h-6 w-6" />
                      <span className="sr-only">Cerrar menú</span>
                   </Button>
                </div>
                <nav className="flex flex-col gap-4 p-4 text-lg">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="font-medium text-foreground/80 hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Button asChild variant="outline" className="mt-4">
                     <Link href="#quiz" onClick={() => setIsOpen(false)}>Diagnóstico de Marca</Link>
                  </Button>
                   <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                     <Link href="#contact" onClick={() => setIsOpen(false)}>Agendar Asesoría</Link>
                   </Button>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
