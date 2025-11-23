import Link from "next/link"

export default function Sidebar() {
  return (
    <aside className="w-64 bg-black text-white min-h-screen p-6 flex flex-col">
      {/* Título */}
      <h2 className="text-xl font-bold mb-8">Pantalla</h2>
      
      {/* Menú de navegación */}
      <nav className="flex-1 space-y-2">
        <Link 
          href="/dashboard" 
          className="block py-2 px-4 hover:bg-gray-800 rounded"
        >
          Inicio
        </Link>
        <Link 
          href="/empresas" 
          className="block py-2 px-4 hover:bg-gray-800 rounded"
        >
          Empresas
        </Link>
        <Link 
          href="/usuarios" 
          className="block py-2 px-4 hover:bg-gray-800 rounded"
        >
          Usuarios
        </Link>
        <Link 
          href="/encuestas" 
          className="block py-2 px-4 hover:bg-gray-800 rounded"
        >
          Encuestas
        </Link>
        <Link 
          href="/perfil" 
          className="block py-2 px-4 hover:bg-gray-800 rounded"
        >
          Configuración
        </Link>
        <Link 
          href="/login" 
          className="block py-2 px-4 hover:bg-gray-800 rounded"
        >
          Cerrar sesión
        </Link>
      </nav>
      
      {/* Usuario en la parte inferior */}
      <div className="flex items-center gap-3 mt-auto pt-6 border-t border-gray-700">
        <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
          <span className="text-sm">U</span>
        </div>
        <span className="text-sm">user@ejemplo</span>
      </div>
    </aside>
  )
}