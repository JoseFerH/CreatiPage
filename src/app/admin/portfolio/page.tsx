"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Pencil } from "lucide-react";

type PortfolioItem = {
  id: string;
  title: string;
  beforeImageUrl: string;
  afterImageUrl: string;
};

export default function AdminPortfolio() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({ title: "", beforeImageUrl: "", afterImageUrl: "" });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "portfolio"));
      const data: PortfolioItem[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as PortfolioItem);
      });
      setItems(data);
    } catch (error) {
      console.error("Error fetching portfolio items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, "portfolio", editingId), formData);
      } else {
        await addDoc(collection(db, "portfolio"), formData);
      }
      setFormData({ title: "", beforeImageUrl: "", afterImageUrl: "" });
      setEditingId(null);
      fetchItems();
    } catch (error) {
      console.error("Error saving portfolio item:", error);
    }
  };

  const handleEdit = (item: PortfolioItem) => {
    setFormData({ title: item.title, beforeImageUrl: item.beforeImageUrl, afterImageUrl: item.afterImageUrl });
    setEditingId(item.id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      await deleteDoc(doc(db, "portfolio", id));
      fetchItems();
    } catch (error) {
      console.error("Error deleting portfolio item:", error);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Administrar Portfolio</h1>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold">{editingId ? "Editar Elemento" : "Añadir Nuevo Elemento"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Título</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">URL Imagen Antes</label>
                <Input
                  value={formData.beforeImageUrl}
                  onChange={(e) => setFormData({ ...formData, beforeImageUrl: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">URL Imagen Después</label>
                <Input
                  value={formData.afterImageUrl}
                  onChange={(e) => setFormData({ ...formData, afterImageUrl: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="submit">{editingId ? "Actualizar" : "Guardar"}</Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={() => { setEditingId(null); setFormData({ title: "", beforeImageUrl: "", afterImageUrl: "" }); }}>
                  Cancelar
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Elementos Actuales</h2>
        {loading ? (
          <p>Cargando...</p>
        ) : items.length === 0 ? (
          <p className="text-gray-500">No hay elementos en el portfolio.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-xs text-gray-500 break-all">Antes: {item.beforeImageUrl}</p>
                    <p className="text-xs text-gray-500 break-all">Después: {item.afterImageUrl}</p>
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
