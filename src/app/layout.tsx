import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';

import { SettingsProvider } from '@/context/SettingsContext';

export const metadata: Metadata = {
  title: 'Creati Growth Platform | Tu marca de invisible a inolvidable',
  description: 'En Creati diseñamos tu identidad visual, estructuramos tu negocio y proyectamos tu esencia para que crezcas con propósito. Diseño con estrategia, marca con alma.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <SettingsProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster />
        </SettingsProvider>
      </body>
    </html>
  );
}
