"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, MoveHorizontal } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { useState, useRef, useEffect } from "react";

const portfolioItems = [
  { id: 1, beforeId: 'portfolio-before-1', afterId: 'portfolio-after-1', title: 'Rebranding Corporativo', category: 'Identidad Visual' },
  { id: 2, beforeId: 'portfolio-before-2', afterId: 'portfolio-after-2', title: 'Diseño de Packaging', category: 'Diseño de Producto' },
  { id: 3, beforeId: 'portfolio-before-3', afterId: 'portfolio-after-3', title: 'Lanzamiento E-commerce', category: 'Web Design' },
];

function ComparisonSlider({ beforeImg, afterImg, title }: { beforeImg: any, afterImg: any, title: string }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current || !isDragging) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const handleTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden cursor-ew-resize group select-none shadow-lg shadow-[#121B52]/10"
      ref={containerRef}
      onMouseDown={() => setIsDragging(true)}
      onMouseMove={handleMouseMove}
      onTouchStart={() => setIsDragging(true)}
      onTouchMove={handleTouchMove}
    >
      {/* After Image (Base) */}
      <div className="absolute inset-0 bg-[#f8fbfe]">
        <Image
          src={afterImg.imageUrl}
          alt={`After: ${title}`}
          fill
          className="object-cover pointer-events-none"
          draggable={false}
          data-ai-hint={afterImg.imageHint}
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-[#121B52] px-3 py-1 rounded-full text-xs font-bold shadow-sm">
          Después
        </div>
      </div>

      {/* Before Image (Clipped) */}
      <div 
        className="absolute inset-0 bg-white"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={beforeImg.imageUrl}
          alt={`Before: ${title}`}
          fill
          className="object-cover pointer-events-none"
          draggable={false}
          data-ai-hint={beforeImg.imageHint}
        />
        {/* Grayscale filter to emphasize the "before" state (optional, but looks good) */}
        <div className="absolute inset-0 bg-black/5 mix-blend-multiply pointer-events-none" />
        <div className="absolute top-4 left-4 bg-[#121B52]/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
          Antes
        </div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center transition-all duration-75"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className={`w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-[#121B52] transition-transform duration-200 ${isDragging ? 'scale-110' : 'group-hover:scale-110'}`}>
          <MoveHorizontal className="w-4 h-4" />
        </div>
      </div>
      
      {/* Overlay instruction */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-black/10">
        <span className="bg-[#121B52]/80 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md translate-y-8 group-hover:translate-y-0 transition-all duration-300">
          Arrastrá para ver el cambio
        </span>
      </div>
    </div>
  );
}

export function Portfolio() {
  return (
    <section id="portfolio" className="py-24 md:py-32 bg-white text-[#121B52] overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-16 md:mb-24 max-w-3xl mx-auto">
          <ScrollReveal direction="up">
            <h2 className="text-3xl md:text-5xl font-bold font-headline tracking-tight mb-6">
              Tu marca también puede <span className="text-[#9B6F50]">brillar así.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={150}>
            <p className="text-lg md:text-xl text-[#121B52]/70 font-medium leading-relaxed">
              No es magia, es estrategia y diseño trabajando juntos. Arrastrá el control deslizante para ver el antes y el después de marcas reales.
            </p>
          </ScrollReveal>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-8">
          {portfolioItems.map((item, index) => {
            const beforeImg = PlaceHolderImages.find(p => p.id === item.beforeId);
            const afterImg = PlaceHolderImages.find(p => p.id === item.afterId);
            if (!beforeImg || !afterImg) return null;

            return (
              <ScrollReveal 
                key={item.id} 
                direction="up" 
                delay={index * 200}
                className="group flex flex-col"
              >
                <ComparisonSlider beforeImg={beforeImg} afterImg={afterImg} title={item.title} />
                
                <div className="pt-6 px-2 flex-grow flex flex-col">
                  <p className="text-sm font-semibold text-[#B6D7F2] uppercase tracking-wider mb-2">
                    {item.category}
                  </p>
                  <h3 className="font-bold text-2xl font-headline text-[#121B52] mb-4">
                    {item.title}
                  </h3>
                  
                  <div className="mt-auto pt-2 border-t border-[#f0f4f8]">
                    <a href="#contact" className="inline-flex items-center text-sm font-bold text-[#121B52] hover:text-[#9B6F50] transition-colors group/link">
                      Ver caso completo 
                      <ArrowRight className="ml-2 w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
