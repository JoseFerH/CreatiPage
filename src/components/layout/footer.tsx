import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="bg-white border-t mt-12 text-primary">
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between md:flex-row gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link href="/" className="transition-transform duration-300 hover:scale-105">
              <Logo className="h-auto w-24 text-primary" />
            </Link>
            <p className="max-w-xs text-center md:text-left text-sm text-primary">
              Tu marca de invisible a inolvidable.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="#" className="hover:text-primary/80 text-primary">
              <Twitter className="h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="hover:text-primary/80 text-primary">
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="#" className="hover:text-primary/80 text-primary">
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>
        <div className="mt-8 border-t border-primary/10 pt-8 text-center text-sm">
          <p className="text-primary">&copy; {new Date().getFullYear()} Creati. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
