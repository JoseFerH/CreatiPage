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
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setVisible(false);
        } else {
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
        "fixed inset-x-0 top-4 z-50 w-full max-w-5xl mx-auto rounded-full shadow-sm transition-transform duration-300 ease-in-out border border-zinc-100 bg-white/95 backdrop-blur-md",
        visible ? "translate-y-0" : "-translate-y-24"
      )}>
      <div className="container flex h-16 items-center justify-between px-6">
        <Link href="/" className="mr-6 flex items-center space-x-2 transition-transform duration-300 hover:scale-105">
          <Image src="/assets/creatisvg.svg" alt="Creati Logo" width={120} height={30} />
        </Link>
        <nav className="hidden md:flex md:items-center md:gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors text-zinc-600 hover:text-navy"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Button asChild className="hidden md:flex bg-navy text-white hover:bg-navy/90 rounded-full px-6 transition-all duration-300 hover:shadow-md">
             <Link href="#contact">Comenzar</Link>
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button size="icon" variant="ghost" className="text-navy hover:bg-lightblue/20 rounded-full">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white border-zinc-100">
              <SheetHeader className="p-4 border-b border-zinc-50">
                 <SheetTitle className="sr-only">Menú de Navegación</SheetTitle>
                 <div className="flex justify-between items-center">
                    <Link href="/" onClick={() => setIsOpen(false)} className="transition-transform duration-300 hover:scale-105">
                       <Image src="/assets/creatisvg.svg" alt="Creati Logo" width={120} height={30} />
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-navy hover:bg-lightblue/20 rounded-full">
                       <X className="h-6 w-6" />
                       <span className="sr-only">Cerrar menú</span>
                    </Button>
                 </div>
              </SheetHeader>
              <div className="flex flex-col h-full bg-white">
                <nav className="flex flex-col gap-6 p-6 text-lg">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="font-medium text-zinc-600 hover:text-navy transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                   <Button asChild className="bg-navy hover:bg-navy/90 text-white mt-4 rounded-full py-6 transition-all duration-300 hover:shadow-md">
                     <Link href="#contact" onClick={() => setIsOpen(false)}>Comenzar</Link>
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