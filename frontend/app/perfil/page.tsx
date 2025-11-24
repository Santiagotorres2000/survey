import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function PerfilPage() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Configuración del Perfil
        </h1>
        <p className="text-gray-600">
          Administra tu información personal y preferencias.
        </p>
      </div>

      <div className="max-w-2xl bg-white rounded-lg shadow-sm p-8">
        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="nombre" className="text-sm font-medium text-gray-700">
                Nombre completo
              </Label>
              <Input
                id="nombre"
                type="text"
                placeholder="Juan García"
                className="border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Correo electrónico
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="juan@empresa.com"
                className="border-gray-300"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
              Contraseña
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••••••"
              className="border-gray-300"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Estado</Label>
              <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-600">
                Activo
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Rol</Label>
              <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-600">
                Creador
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button className="bg-black hover:bg-gray-800 text-white px-8">
              Actualizar perfil
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}