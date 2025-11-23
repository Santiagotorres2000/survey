import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Sidebar from "@/components/Sidebar"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Contenido principal */}
      <main className="flex-1 bg-white p-12">
        {/* Título y descripción */}
        <h1 className="text-4xl font-bold mb-2">Panel principal</h1>
        <p className="text-gray-600 mb-8">
          Resumen general de actividad y encuestas recientes.
        </p>
        
        {/* Grid de tarjetas y botones */}
        <div className="grid grid-cols-3 gap-6">
          {/* Tarjeta 1: Encuestas creadas */}
          <Card className="bg-gray-50 border-gray-200">
            <CardHeader>
              <CardTitle className="text-base font-medium">
                Encuestas creadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-6xl font-bold">12</p>
            </CardContent>
          </Card>
          
          {/* Tarjeta 2: Respuestas totales */}
          <Card className="bg-gray-50 border-gray-200">
            <CardHeader>
              <CardTitle className="text-base font-medium">
                Respuestas totales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-6xl font-bold">350</p>
            </CardContent>
          </Card>
          
          {/* Botón: Crear encuesta */}
          <div className="flex items-center">
            <Button className="w-full h-20 bg-black hover:bg-gray-800 text-white text-lg font-medium rounded-lg">
              Crear encuesta
            </Button>
          </div>
          
          {/* Tarjeta 3: Última encuesta publicada */}
          <Card className="bg-gray-50 border-gray-200">
            <CardHeader>
              <CardTitle className="text-base font-medium">
                Última encuesta publicada
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <p className="font-medium">Satisfacción del servicio</p>
              <p className="text-sm text-gray-600">10/11/2025</p>
            </CardContent>
          </Card>
          
          {/* Tarjeta 4: Satisfacción promedio */}
          <Card className="bg-gray-50 border-gray-200">
            <CardHeader>
              <CardTitle className="text-base font-medium">
                Satisfacción promedio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-6xl font-bold">4.6<span className="text-3xl">/5</span></p>
            </CardContent>
          </Card>
          
          {/* Botón: Ver reportes */}
          <div className="flex items-center">
            <Button 
              variant="secondary"
              className="w-full h-20 bg-gray-400 hover:bg-gray-500 text-white text-lg font-medium rounded-lg"
            >
              Ver reportes
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}