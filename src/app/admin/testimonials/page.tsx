"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Pencil } from "lucide-react";

type Testimonial = {
  id: string;
  name: string;
  title: string;
  quote: string;
  avatar: string;
};

export default function AdminTestimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({ name: "", title: "", quote: "", avatar: "" });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "testimonials"));
      const data: Testimonial[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Testimonial);
      });
      setItems(data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, "testimonials", editingId), formData);
      } else {
        await addDoc(collection(db, "testimonials"), formData);
      }
      setFormData({ name: "", title: "", quote: "", avatar: "" });
      setEditingId(null);
      fetchItems();
    } catch (error) {
      console.error("Error saving testimonial:", error);
    }
  };

  const handleEdit = (item: Testimonial) => {
    setFormData({ name: item.name, title: item.title, quote: item.quote, avatar: item.avatar });
    setEditingId(item.id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      await deleteDoc(doc(db, "testimonials", id));
      fetchItems();
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Administrar Testimonios</h1>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold">{editingId ? "Editar Testimonio" : "Añadir Nuevo Testimonio"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Nombre</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Título / Cargo</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium">Cita</label>
                <Textarea
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium">URL Avatar</label>
                <Input
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="submit">{editingId ? "Actualizar" : "Guardar"}</Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={() => { setEditingId(null); setFormData({ name: "", title: "", quote: "", avatar: "" }); }}>
                  Cancelar
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Testimonios Actuales</h2>
        {loading ? (
          <p>Cargando...</p>
        ) : items.length === 0 ? (
          <p className="text-gray-500">No hay testimonios.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-sm font-medium text-gray-600">{item.title}</p>
                    <p className="text-sm text-gray-500 italic">"{item.quote}"</p>
                    <p className="text-xs text-gray-400 break-all">Avatar: {item.avatar}</p>
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
