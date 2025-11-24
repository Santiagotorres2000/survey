import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function RegistroEmpresaPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md px-8">
        <h1 className="text-4xl font-bold text-center mb-4">
          Registro de Empresa
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Completa los datos de tu empresa para crear una cuenta en el sistema.
        </p>
        <form className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="nombre" className="text-sm font-normal">
              Nombre de Empresa
            </Label>
            <Input
              id="nombre"
              type="text"
              placeholder="ejemploSAS"
              className="h-11 bg-gray-50 border-gray-200"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nit" className="text-sm font-normal">
              NIT
            </Label>
            <Input
              id="nit"
              type="text"
              placeholder="2762901219287"
              className="h-11 bg-gray-50 border-gray-200"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="correo" className="text-sm font-normal">
              Correo corporativo
            </Label>
            <Input
              id="correo"
              type="email"
              placeholder="empresa@ejemplo.com"
              className="h-11 bg-gray-50 border-gray-200"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="telefono" className="text-sm font-normal">
              Teléfono
            </Label>
            <Input
              id="telefono"
              type="tel"
              placeholder="3182923827"
              className="h-11 bg-gray-50 border-gray-200"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="direccion" className="text-sm font-normal">
              Dirección
            </Label>
            <Input
              id="direccion"
              type="text"
              placeholder="carrera 87"
              className="h-11 bg-gray-50 border-gray-200"
            />
          </div>

          {/* Botón */}
          <Button 
            type="submit" 
            className="w-full h-12 bg-black hover:bg-gray-800 text-white font-medium rounded-lg mt-6"
          >
            Registrar Empresa
          </Button>
        </form>
      </div>
    </div>
  )
}