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
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        const currentY = window.scrollY;
        setHasScrolled(currentY > 20);

        if (currentY > lastScrollY && currentY > 100) {
          setVisible(false);
        } else {
          setVisible(true);
        }
        setLastScrollY(currentY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar, { passive: true });
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);


  return (
    <header className={cn(
        "fixed inset-x-0 top-4 z-50 w-full max-w-7xl mx-auto rounded-full shadow-lg transition-all duration-300",
        "border border-white/10",
        hasScrolled
          ? "bg-[#121B52]/90 backdrop-blur-xl shadow-[#121B52]/20"
          : "bg-[#121B52] shadow-[#121B52]/10",
        visible ? "translate-y-0 opacity-100" : "-translate-y-24 opacity-0"
      )} style={{ transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }}>
      <div className="container flex h-16 items-center justify-between text-header-foreground px-6">
        <Link href="/" className="mr-6 flex items-center space-x-2 btn-press">
          <Image src="/assets/creatisvg.svg" alt="Creati Logo" width={120} height={30} />
        </Link>
        <nav className="hidden md:flex md:items-center md:gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-[#B6D7F2]/80 hover:text-white transition-colors duration-200 py-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#B6D7F2] after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild className="hidden md:flex btn-press bg-[#B6D7F2] text-[#121B52] font-semibold hover:bg-white hover:text-[#121B52] transition-all duration-200 rounded-full">
             <Link href="#contact">Agendar Asesoría</Link>
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button size="icon" className="btn-press bg-[#B6D7F2]/20 text-[#B6D7F2] hover:bg-[#B6D7F2]/30 rounded-full">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white">
              <SheetHeader className="p-4 border-b">
                 <SheetTitle className="sr-only">Menú de Navegación</SheetTitle>
                 <div className="flex justify-between items-center">
                    <Link href="/" onClick={() => setIsOpen(false)} className="btn-press">
                       <Image src="/assets/creatisvg.svg" alt="Creati Logo" width={120} height={30} />
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="btn-press">
                       <X className="h-5 w-5" />
                       <span className="sr-only">Cerrar menú</span>
                    </Button>
                 </div>
              </SheetHeader>
              <div className="flex flex-col h-full">
                <nav className="flex flex-col gap-1 p-4">
                  {navLinks.map((link, i) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="font-medium text-[#121B52] hover:bg-[#B6D7F2]/10 px-4 py-3 rounded-lg transition-colors duration-200"
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      {link.label}
                    </Link>
                  ))}
                   <Button asChild className="btn-press bg-[#121B52] text-[#B6D7F2] hover:bg-[#1a2766] mt-4 rounded-lg">
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
