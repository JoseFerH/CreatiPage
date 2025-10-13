"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#about", label: "Sobre Nosotros" },
  { href: "#services", label: "Servicios" },
  { href: "#portfolio", label: "Portafolio" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contacto" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) { // if scroll down hide the navbar
          setVisible(false);
        } else { // if scroll up show the navbar
          setVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);


  return (
    <header className={cn(
        "fixed inset-x-0 top-4 z-50 w-full max-w-5xl mx-auto rounded-full shadow-lg transition-transform duration-300 ease-in-out",
        "border-border/40 bg-header-background",
        visible ? "translate-y-0" : "-translate-y-24"
      )}>
      <div className="container flex h-16 items-center justify-between text-header-foreground px-6">
        <Link href="/" className="mr-6 flex items-center space-x-2 transition-transform duration-300 hover:scale-105">
          <Image src="/assets/creatisvg.svg" alt="Creati Logo" width={120} height={30} />
        </Link>
        <nav className="hidden md:flex md:items-center md:gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors text-[rgb(182,215,242)] hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild className="hidden md:flex bg-[#B6D7F2] text-[#121B52] hover:bg-[#121B52] hover:text-[#B6D7F2]">
             <Link href="#contact">Agendar Asesoría</Link>
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button size="icon" className="bg-[#121B52] text-[#B6D7F2] hover:bg-[#B6D7F2] hover:text-[#121B52]">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader className="p-4 border-b">
                 <SheetTitle className="sr-only">Menú de Navegación</SheetTitle>
                 <div className="flex justify-between items-center">
                    <Link href="/" onClick={() => setIsOpen(false)} className="transition-transform duration-300 hover:scale-105">
                       <Image src="/assets/creatisvg.svg" alt="Creati Logo" width={120} height={30} />
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                       <X className="h-6 w-6" />
                       <span className="sr-only">Cerrar menú</span>
                    </Button>
                 </div>
              </SheetHeader>
              <div className="flex flex-col h-full">
                <nav className="flex flex-col gap-4 p-4 text-lg">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="font-medium text-[rgb(18,27,82)] hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  ))}
                   <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground mt-4">
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
