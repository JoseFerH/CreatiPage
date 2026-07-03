"use client";

import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, User } from "firebase/auth";
import { doc, getDoc, setDoc, collection, getDocs, query, orderBy } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Loader2, LogOut, Settings, MessageSquare, Users } from "lucide-react";
import Image from "next/image";

type Mensaje = { id: string; nombre: string; email: string; mensaje: string; fecha: string };
type Lead = { id: string; email: string; resultado_categoria: string; fecha: string; respuestas: any };

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  // Data states
  const [whatsapp, setWhatsapp] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        fetchData();
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch Config
      const docRef = doc(db, "configuracion", "ajustes_sitio");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setWhatsapp(data.whatsapp || "");
        setInstagram(data.socials?.instagram || "");
        setFacebook(data.socials?.facebook || "");
      }

      // Fetch Mensajes
      const mensajesSnap = await getDocs(query(collection(db, "mensajes_contacto"), orderBy("fecha", "desc")));
      setMensajes(mensajesSnap.docs.map(d => ({ id: d.id, ...d.data() } as Mensaje)));

      // Fetch Leads
      const leadsSnap = await getDocs(query(collection(db, "leads_quiz"), orderBy("fecha", "desc")));
      setLeads(leadsSnap.docs.map(d => ({ id: d.id, ...d.data() } as Lead)));

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({ title: "Bienvenido", description: "Has iniciado sesión correctamente." });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Credenciales incorrectas." });
    }
    setLoading(false);
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, "configuracion", "ajustes_sitio"), {
        whatsapp,
        socials: { instagram, facebook }
      }, { merge: true });
      toast({ title: "Guardado", description: "Configuración actualizada. Los cambios ya están en vivo." });
      // Reload page to re-trigger context fetch
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "No se pudo guardar la configuración." });
    }
    setSaving(false);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#f8fbfe]"><Loader2 className="h-8 w-8 animate-spin text-[#121B52]" /></div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fbfe] p-4">
        <Card className="w-full max-w-md shadow-xl rounded-3xl border-none">
          <CardHeader className="text-center space-y-2 pb-8">
            <div className="mx-auto bg-[#121B52] w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Image src="/assets/creatisvg.svg" alt="Logo" width={40} height={40} className="invert brightness-0" />
            </div>
            <CardTitle className="text-2xl font-headline text-[#121B52]">Acceso Restringido</CardTitle>
            <CardDescription>Ingresa tus credenciales de administrador.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#121B52]">Email</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="h-12 rounded-xl" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#121B52]">Contraseña</label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="h-12 rounded-xl" />
              </div>
              <Button type="submit" className="w-full h-12 rounded-xl bg-[#121B52] text-white hover:bg-[#1a2766] mt-4">
                Ingresar al Panel
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fbfe] p-4 md:p-8 pt-32 md:pt-40">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-[#f0f4f8]">
          <div>
            <h1 className="text-3xl font-headline font-bold text-[#121B52]">Panel de Administración</h1>
            <p className="text-[#121B52]/60">Gestiona tu sitio web de forma dinámica.</p>
          </div>
          <Button onClick={() => signOut(auth)} variant="outline" className="rounded-xl border-[#121B52]/20 text-[#121B52]">
            <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión
          </Button>
        </div>

        <Tabs defaultValue="ajustes" className="w-full">
          <TabsList className="grid grid-cols-3 w-full md:w-[400px] mb-8 bg-white border border-[#f0f4f8] rounded-xl p-1 h-14">
            <TabsTrigger value="ajustes" className="rounded-lg h-full data-[state=active]:bg-[#121B52] data-[state=active]:text-white"><Settings className="w-4 h-4 mr-2 hidden sm:block"/> Ajustes</TabsTrigger>
            <TabsTrigger value="mensajes" className="rounded-lg h-full data-[state=active]:bg-[#121B52] data-[state=active]:text-white"><MessageSquare className="w-4 h-4 mr-2 hidden sm:block"/> Mensajes</TabsTrigger>
            <TabsTrigger value="leads" className="rounded-lg h-full data-[state=active]:bg-[#121B52] data-[state=active]:text-white"><Users className="w-4 h-4 mr-2 hidden sm:block"/> Leads Quiz</TabsTrigger>
          </TabsList>

          <TabsContent value="ajustes">
            <Card className="rounded-3xl border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-[#121B52]">Enlaces y Redes</CardTitle>
                <CardDescription>Actualiza los links que aparecen en los botones de tu web.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveConfig} className="space-y-6 max-w-2xl">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#121B52]">Enlace de WhatsApp</label>
                    <Input value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="https://wa.me/..." className="h-12 rounded-xl bg-gray-50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#121B52]">Instagram URL</label>
                    <Input value={instagram} onChange={e => setInstagram(e.target.value)} placeholder="https://instagram.com/..." className="h-12 rounded-xl bg-gray-50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#121B52]">Facebook URL</label>
                    <Input value={facebook} onChange={e => setFacebook(e.target.value)} placeholder="https://facebook.com/..." className="h-12 rounded-xl bg-gray-50" />
                  </div>
                  <Button type="submit" disabled={saving} className="h-12 rounded-xl bg-[#121B52] px-8 text-white">
                    {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Guardar Cambios
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mensajes">
            <Card className="rounded-3xl border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-[#121B52]">Bandeja de Contacto</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mensajes.length === 0 ? <p className="text-gray-500">No hay mensajes aún.</p> : mensajes.map(m => (
                    <div key={m.id} className="p-6 border border-[#f0f4f8] rounded-2xl bg-white hover:border-[#121B52]/20 transition-all">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-bold text-lg text-[#121B52]">{m.nombre}</h3>
                          <p className="text-[#121B52]/70 text-sm">{m.email}</p>
                        </div>
                        <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600">{new Date(m.fecha).toLocaleDateString()}</span>
                      </div>
                      <p className="text-gray-700 bg-gray-50 p-4 rounded-xl text-sm">{m.mensaje}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leads">
            <Card className="rounded-3xl border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-[#121B52]">Prospectos del Quiz</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leads.length === 0 ? <p className="text-gray-500">No hay leads aún.</p> : leads.map(l => (
                    <div key={l.id} className="p-6 border border-[#f0f4f8] rounded-2xl bg-white">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <h3 className="font-bold text-lg text-[#121B52]">{l.email || "Sin correo"}</h3>
                          <p className="text-[#9B6F50] font-semibold text-sm">Resultado: {l.resultado_categoria}</p>
                        </div>
                        <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600">{new Date(l.fecha).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
}
