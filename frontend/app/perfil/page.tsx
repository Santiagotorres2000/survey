import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Sidebar from "@/components/Sidebar"

export default function PerfilPage() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Contenido principal */}
      <main className="flex-1 bg-white p-12">
        <h1 className="text-4xl font-bold mb-12">Configuración del Perfil</h1>
        
        {/* Formulario centrado con fondo gris */}
        <div className="max-w-lg mx-auto bg-gray-100 p-8 rounded-lg">
          <form className="space-y-6">
            {/* Nombre */}
            <div className="space-y-2">
              <Label htmlFor="nombre" className="text-sm font-normal">
                Nombre
              </Label>
              <Input
                id="nombre"
                type="text"
                placeholder="Juan Garcia"
                className="h-11 bg-white border-gray-300"
              />
            </div>

            {/* Correo Electrónico */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-normal">
                Correo Electrónico
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Juanempresa@gmail.com"
                className="h-11 bg-white border-gray-300"
              />
            </div>

            {/* Contraseña */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-normal">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••••••••••"
                className="h-11 bg-white border-gray-300"
              />
            </div>

            {/* Estado y Rol (solo lectura) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-normal text-gray-600">
                  Estado
                </Label>
                <div className="h-11 bg-gray-200 border border-gray-300 rounded-md flex items-center px-3 text-gray-500">
                  Activo
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-normal text-gray-600">
                  Rol
                </Label>
                <div className="h-11 bg-gray-200 border border-gray-300 rounded-md flex items-center px-3 text-gray-500">
                  Solo lectura
                </div>
              </div>
            </div>

            {/* Botón */}
            <Button 
              type="submit" 
              className="w-full h-12 bg-black hover:bg-gray-800 text-white font-medium rounded-lg mt-4"
            >
              Actualiza perfil
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}