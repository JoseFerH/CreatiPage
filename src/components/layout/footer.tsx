import { Github, Linkedin, Twitter, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="bg-[#121B52] text-white pt-20 pb-10 border-t border-white/10 relative overflow-hidden">
      {/* Decorative background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Link href="/" className="btn-press inline-block w-fit">
              <Logo className="h-auto w-32 text-white" />
            </Link>
            <p className="max-w-xs text-[#B6D7F2]/80 text-lg leading-relaxed">
              Tu marca de <span className="italic">invisible</span> a inolvidable.
            </p>
            <div className="flex items-center space-x-5 mt-2">
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#B6D7F2] hover:bg-white hover:text-[#121B52] transition-all duration-300 btn-press">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#B6D7F2] hover:bg-white hover:text-[#121B52] transition-all duration-300 btn-press">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#B6D7F2] hover:bg-white hover:text-[#121B52] transition-all duration-300 btn-press">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          {/* Links Column */}
          <div className="lg:col-span-2 lg:col-start-7 flex flex-col gap-4">
            <h4 className="font-bold font-headline text-lg mb-2">Navegación</h4>
            <Link href="#about" className="text-[#B6D7F2]/70 hover:text-white transition-colors duration-200 w-fit">Sobre Nosotros</Link>
            <Link href="#services" className="text-[#B6D7F2]/70 hover:text-white transition-colors duration-200 w-fit">Servicios</Link>
            <Link href="#portfolio" className="text-[#B6D7F2]/70 hover:text-white transition-colors duration-200 w-fit">Portafolio</Link>
            <Link href="#blog" className="text-[#B6D7F2]/70 hover:text-white transition-colors duration-200 w-fit">Blog</Link>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="font-bold font-headline text-lg mb-2">Servicios</h4>
            <Link href="#services" className="text-[#B6D7F2]/70 hover:text-white transition-colors duration-200 w-fit">Identidad de marca</Link>
            <Link href="#services" className="text-[#B6D7F2]/70 hover:text-white transition-colors duration-200 w-fit">Presencia digital</Link>
            <Link href="#services" className="text-[#B6D7F2]/70 hover:text-white transition-colors duration-200 w-fit">Marketing visual</Link>
            <Link href="#services" className="text-[#B6D7F2]/70 hover:text-white transition-colors duration-200 w-fit">Finanzas estratégicas</Link>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 gap-4">
          <p className="text-[#B6D7F2]/50 text-sm">
            &copy; {new Date().getFullYear()} Creati Growth Platform. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-[#B6D7F2]/50 hover:text-[#B6D7F2] text-sm transition-colors duration-200">Términos y Condiciones</Link>
            <Link href="#" className="text-[#B6D7F2]/50 hover:text-[#B6D7F2] text-sm transition-colors duration-200">Política de Privacidad</Link>
          </div>
        </div>
      </div>
      
      {/* Decorative bottom blur */}
      <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#B6D7F2]/10 blur-[100px] pointer-events-none" />
    </footer>
  );
}
