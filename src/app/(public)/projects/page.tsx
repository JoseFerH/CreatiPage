"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  mediaUrls: string;
  isVisible: boolean;
};

export default function PublicProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("Todos");

  useEffect(() => {
    async function fetchProjects() {
      try {
        const q = query(collection(db, "projects"), where("isVisible", "==", true));
        const querySnapshot = await getDocs(q);
        const data: Project[] = [];
        const cats = new Set<string>();

        querySnapshot.forEach((doc) => {
          const projectData = { id: doc.id, ...doc.data() } as Project;
          data.push(projectData);
          if (projectData.category) cats.add(projectData.category);
        });

        setProjects(data);
        setCategories(["Todos", ...Array.from(cats)]);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const filteredProjects = activeCategory === "Todos"
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#121B52] mb-4">Nuestro Portafolio</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explora nuestros casos de éxito y descubre cómo hemos ayudado a marcas a destacar en su sector.
          </p>
        </div>

        {!loading && categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map(cat => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                onClick={() => setActiveCategory(cat)}
                className={activeCategory === cat ? "bg-[#121B52] text-white" : ""}
              >
                {cat}
              </Button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="text-center py-20">Cargando proyectos...</div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No hay proyectos disponibles en este momento.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => {
              const firstImage = project.mediaUrls ? project.mediaUrls.split(',')[0].trim() : null;

              return (
                <Card key={project.id} className="overflow-hidden hover:shadow-xl transition-shadow border-none shadow-md">
                  <CardContent className="p-0">
                    {firstImage && (
                      <div className="relative aspect-video bg-gray-200">
                        <Image
                          src={firstImage}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="text-xs font-semibold text-[#B6D7F2] tracking-wider uppercase mb-2">
                        {project.category}
                      </div>
                      <h3 className="text-xl font-bold text-[#121B52] mb-3">{project.title}</h3>
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {project.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
