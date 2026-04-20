import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Image as ImageIcon } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p className="text-gray-500">Bienvenido al panel de administración.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/admin/portfolio">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Nuestro Trabajo</CardTitle>
              <ImageIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Administrar Portfolio</div>
              <p className="text-xs text-muted-foreground mt-1">
                Añadir, editar o eliminar casos de estudio.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/testimonials">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Éxito de Clientes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Administrar Testimonios</div>
              <p className="text-xs text-muted-foreground mt-1">
                Añadir, editar o eliminar historias de éxito.
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
