import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-white border-t mt-12 text-primary-foreground">
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between md:flex-row gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link href="/" className="transition-transform duration-300 hover:scale-105">
              <Image src="/assets/creatisvg.svg" alt="Creati Logo" width={120} height={30} />
            </Link>
            <p className="max-w-xs text-center md:text-left text-sm">
              Tu marca de invisible a inolvidable.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="#" className="hover:text-primary-foreground/80">
              <Twitter className="h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="hover:text-primary-foreground/80">
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="#" className="hover:text-primary-foreground/80">
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Creati. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
