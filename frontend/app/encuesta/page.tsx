import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function EncuestaPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-8">
      <div className="w-full max-w-2xl">
        <div className="bg-gray-100 p-12 rounded-lg">
          <h1 className="text-4xl font-bold text-center mb-3">
            Encuesta satisfaccion del servicio
          </h1>
          <p className="text-center text-gray-700 mb-8">
            Tu opinión es importante para seguir mejorando nuestro servicio.
          </p>
          <div className="border-t border-gray-400 mb-8"></div>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="nombre" className="text-sm font-medium">
                Nombre
              </Label>
              <Input
                id="nombre"
                type="text"
                placeholder="david pelaez"
                className="h-11 bg-white border-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="correo" className="text-sm font-medium">
                Correo
              </Label>
              <Input
                id="correo"
                type="email"
                placeholder="usuario@ejemplo.com"
                className="h-11 bg-white border-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="satisfaccion" className="text-sm font-medium">
                Satisfacción servicio
              </Label>
              <Input
                id="satisfaccion"
                type="number"
                placeholder="4"
                min="1"
                max="5"
                className="h-11 bg-white border-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fecha" className="text-sm font-medium">
                Fecha
              </Label>
              <Input
                id="fecha"
                type="text"
                placeholder="13-11-2025"
                className="h-11 bg-white border-gray-300"
              />
            </div>
            <div className="flex justify-center pt-6">
              <Button 
                type="submit" 
                className="bg-black hover:bg-gray-800 text-white px-12 h-12 rounded-lg font-medium"
              >
                Enviar respuestas
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}