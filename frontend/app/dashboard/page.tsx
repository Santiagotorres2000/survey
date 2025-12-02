"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const token = localStorage.getItem("token")
      const companyIdStr = localStorage.getItem("companyId")

      if (!token || !companyIdStr) {
        setError("No se encontró información de autenticación")
        setLoading(false)
        return
      }

      const companyId = Number(companyIdStr)

      const response = await fetch("http://localhost:8080/api/survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          companyId: companyId,
          title: formData.title,
          description: formData.description,
        }),
      })

      if (!response.ok) {
        let errorMessage = `Error ${response.status}`
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorData.error || errorMessage
        } catch (e) {
          // Si no hay JSON en la respuesta
        }
        throw new Error(errorMessage)
      }

      setSuccess(true)
      setFormData({ title: "", description: "" })

      // Cerrar modal después de 1 segundo
      setTimeout(() => {
        setIsModalOpen(false)
        setSuccess(false)
      }, 1000)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido"
      setError(errorMessage)
      console.error("Error al crear encuesta:", err)
    } finally {
      setLoading(false)
    }
  }

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
        <Button
          className="bg-black hover:bg-gray-800 text-white px-6"
          onClick={() => setIsModalOpen(true)}
        >
          Crear nueva encuesta
        </Button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Nueva Encuesta</h2>
              <button
                onClick={() => {
                  setIsModalOpen(false)
                  setError(null)
                  setSuccess(false)
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {success && (
              <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
                ✅ Encuesta creada exitosamente
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                ❌ Error: {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-normal">
                  Título *
                </Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Ej: Encuesta de satisfacción"
                  className="h-11 bg-gray-50 border-gray-200"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-normal">
                  Descripción
                </Label>
                <textarea
                  id="description"
                  placeholder="Descripción de la encuesta (opcional)"
                  className="w-full min-h-[100px] px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-black"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-gray-300"
                  onClick={() => {
                    setIsModalOpen(false)
                    setError(null)
                    setSuccess(false)
                  }}
                  disabled={loading}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-black hover:bg-gray-800 text-white"
                  disabled={loading}
                >
                  {loading ? "Creando..." : "Crear"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}