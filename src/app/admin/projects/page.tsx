"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Pencil } from "lucide-react";

type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  mediaUrls: string; // Comma-separated for simplicity in this demo
  isVisible: boolean;
};

export default function AdminProjects() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({ title: "", description: "", category: "", mediaUrls: "", isVisible: true });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const data: Project[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Project);
      });
      setItems(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, "projects", editingId), formData);
      } else {
        await addDoc(collection(db, "projects"), formData);
      }
      setFormData({ title: "", description: "", category: "", mediaUrls: "", isVisible: true });
      setEditingId(null);
      fetchItems();
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  const handleEdit = (item: Project) => {
    setFormData({
      title: item.title,
      description: item.description,
      category: item.category,
      mediaUrls: item.mediaUrls || "",
      isVisible: item.isVisible
    });
    setEditingId(item.id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteDoc(doc(db, "projects", id));
      fetchItems();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Administrar Proyectos (Portafolio Detallado)</h1>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold">{editingId ? "Editar Proyecto" : "Añadir Nuevo Proyecto"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Título</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Categoría</label>
                <Input
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium">Descripción</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium">URLs de Medios (imágenes/videos separados por coma)</label>
                <Input
                  value={formData.mediaUrls}
                  onChange={(e) => setFormData({ ...formData, mediaUrls: e.target.value })}
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isVisible"
                  checked={formData.isVisible}
                  onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor="isVisible" className="text-sm font-medium cursor-pointer">
                  Visible al público
                </label>
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="submit">{editingId ? "Actualizar" : "Guardar"}</Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={() => { setEditingId(null); setFormData({ title: "", description: "", category: "", mediaUrls: "", isVisible: true }); }}>
                  Cancelar
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Proyectos Actuales</h2>
        {loading ? (
          <p>Cargando...</p>
        ) : items.length === 0 ? (
          <p className="text-gray-500">No hay proyectos.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${item.isVisible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {item.isVisible ? 'Visible' : 'Oculto'}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-600">Categoría: {item.category}</p>
                    <p className="text-sm text-gray-500 line-clamp-3">{item.description}</p>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                        <Pencil className="h-4 w-4 mr-2" /> Editar
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>
                        <Trash2 className="h-4 w-4 mr-2" /> Eliminar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
