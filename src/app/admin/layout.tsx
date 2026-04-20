import Link from "next/link"
import { LayoutDashboard, Users, Image as ImageIcon } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-1 min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md border-r">
        <div className="p-6">
          <Link href="/admin" className="flex items-center gap-2 text-xl font-bold text-gray-800">
            <LayoutDashboard className="h-6 w-6" />
            Admin Panel
          </Link>
        </div>
        <nav className="mt-6">
          <Link href="/admin/portfolio" className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary">
            <ImageIcon className="h-5 w-5" />
            Nuestro Trabajo
          </Link>
          <Link href="/admin/testimonials" className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary">
            <Users className="h-5 w-5" />
            Éxito de Clientes
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  )
}
