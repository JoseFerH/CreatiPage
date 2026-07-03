"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSettings } from "@/context/SettingsContext";
export function BlogPreview() {
  const { settings } = useSettings();
  const articles = settings.blog;

  return (
    <section id="blog" className="py-24 md:py-32 bg-[#f8fbfe] text-[#121B52] border-t border-[#f0f4f8]">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-headline mb-4 tracking-tight">Blog y <span className="text-[#9B6F50]">Recursos</span></h2>
          <p className="text-lg md:text-xl text-[#121B52]/70 font-medium leading-relaxed">
            Educación y herramientas para potenciar tu marca.
          </p>
        </div>
        <Tabs defaultValue="blog" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-12 h-auto bg-white border border-[#f0f4f8] rounded-2xl p-2 gap-2 shadow-sm">
            <TabsTrigger value="blog" className="data-[state=active]:bg-[#121B52] data-[state=active]:text-white rounded-xl py-3 text-base font-semibold text-[#121B52]/70 transition-all">Blog</TabsTrigger>
            <TabsTrigger value="finanzas" className="data-[state=active]:bg-[#121B52] data-[state=active]:text-white rounded-xl py-3 text-base font-semibold text-[#121B52]/70 transition-all">Finanzas</TabsTrigger>
            <TabsTrigger value="marketing" className="data-[state=active]:bg-[#121B52] data-[state=active]:text-white rounded-xl py-3 text-base font-semibold text-[#121B52]/70 transition-all">Marketing</TabsTrigger>
            <TabsTrigger value="diseño" className="data-[state=active]:bg-[#121B52] data-[state=active]:text-white rounded-xl py-3 text-base font-semibold text-[#121B52]/70 transition-all">Diseño</TabsTrigger>
          </TabsList>
          {Object.entries(articles).map(([category, items]) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((item, index) => (
                  <Card key={index} className="flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white border-none rounded-3xl overflow-hidden group">
                    <CardHeader className="p-8">
                      <CardTitle className="text-xl font-headline leading-tight text-[#121B52] group-hover:text-[#9B6F50] transition-colors">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow flex items-end p-8 pt-0">
                      <Link href={item.link} className="text-base font-bold text-[#121B52] hover:text-[#9B6F50] flex items-center gap-2 transition-colors">
                        Leer más <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
