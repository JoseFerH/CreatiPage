"use client";

import Link from "next/link"
import { LayoutDashboard, Users, Image as ImageIcon, Briefcase, LogOut } from "lucide-react"
import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!auth || typeof auth.onAuthStateChanged !== "function") {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError("Credenciales incorrectas o error al iniciar sesión.");
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100">Cargando...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Acceso Admin</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Contraseña</label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full">Entrar</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-1 min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md border-r flex flex-col">
        <div className="p-6">
          <Link href="/admin" className="flex items-center gap-2 text-xl font-bold text-gray-800">
            <LayoutDashboard className="h-6 w-6" />
            Admin Panel
          </Link>
        </div>
        <nav className="mt-6 flex-grow">
          <Link href="/admin/portfolio" className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary">
            <ImageIcon className="h-5 w-5" />
            Nuestro Trabajo (Landing)
          </Link>
          <Link href="/admin/testimonials" className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary">
            <Users className="h-5 w-5" />
            Éxito de Clientes
          </Link>
          <Link href="/admin/projects" className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary">
            <Briefcase className="h-5 w-5" />
            Proyectos (Portafolio)
          </Link>
        </nav>
        <div className="p-4 border-t">
          <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => signOut(auth)}>
            <LogOut className="h-4 w-4 mr-2" /> Cerrar Sesión
          </Button>
        </div>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  )
}
