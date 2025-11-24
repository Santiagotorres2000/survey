import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Panel principal
        </h1>
        <p className="text-gray-600">
          Resumen general de actividad y encuestas recientes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Encuestas creadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-gray-800">12</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Respuestas totales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-gray-800">350</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Última encuesta publicada
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <p className="font-medium text-gray-800">Satisfacción del servicio</p>
            <p className="text-sm text-gray-600">10/11/2025</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Satisfacción promedio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-gray-800">
              4.6<span className="text-2xl text-gray-600">/5</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4">
        <Button className="bg-black hover:bg-gray-800 text-white px-6">
          Crear nueva encuesta
        </Button>
        <Button variant="outline" className="border-gray-300 text-gray-700">
          Ver reportes
        </Button>
      </div>
    </div>
  )
}