import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="bg-navy border-t border-navy/20 pt-16 pb-8">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between md:flex-row gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link href="/" className="transition-transform duration-300 hover:opacity-80">
              <Logo className="h-auto w-32 text-white brightness-0 invert" />
            </Link>
            <p className="max-w-xs text-center md:text-left text-sm text-lightblue/80 font-light">
              Tu marca de invisible a inolvidable.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-6">
            <nav className="flex gap-6">
              <Link href="#about" className="text-sm text-lightblue/80 hover:text-white transition-colors">Nosotros</Link>
              <Link href="#services" className="text-sm text-lightblue/80 hover:text-white transition-colors">Servicios</Link>
              <Link href="#portfolio" className="text-sm text-lightblue/80 hover:text-white transition-colors">Portafolio</Link>
            </nav>
            <div className="flex items-center space-x-6">
              <Link href="#" className="text-lightblue/50 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-lightblue/50 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="text-lightblue/50 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-lightblue/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p className="text-lightblue/50">&copy; {new Date().getFullYear()} Creati. Todos los derechos reservados.</p>
          <div className="flex gap-4 text-lightblue/50">
            <Link href="#" className="hover:text-white transition-colors">Política de Privacidad</Link>
            <Link href="#" className="hover:text-white transition-colors">Términos de Servicio</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}