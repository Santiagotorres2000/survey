import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md px-8">
        <h1 className="text-4xl font-bold text-center mb-12">
          Iniciar Sesión
        </h1>
        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-normal">
              Correo electrónico
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="usuario@ejemplo.com"
              className="h-11 bg-gray-50 border-gray-200"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-normal">
              Contraseña
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••••••••••"
              className="h-11 bg-gray-50 border-gray-200"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full h-12 bg-black hover:bg-gray-800 text-white font-medium rounded-lg mt-8"
          >
            Iniciar Sesión
          </Button>
          <div className="text-center pt-2">
            <a 
              href="#" 
              className="text-sm text-black hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}