"use client"

import { useState, FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

interface CompanyData {
  name: string
  nit: string
  email: string
  phone: string
  address: string
}

export default function RegistroEmpresaPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [companyId, setCompanyId] = useState<number | null>(null)

  const [formData, setFormData] = useState<CompanyData>({
    name: "",
    nit: "",
    email: "",
    phone: "",
    address: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // Validación básica
      if (!formData.name.trim()) {
        setError("El nombre de la empresa es requerido")
        setLoading(false)
        return
      }

      const response = await fetch("http://localhost:8080/api/company", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: formData.name,
          nit: formData.nit || null,
          address: formData.address || null,
        }),
      })

      if (!response.ok) {
        let errorMessage = `Error ${response.status}`
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorMessage
        } catch (e) {
          // Si no hay JSON en la respuesta, usa el mensaje por defecto
        }
        throw new Error(errorMessage)
      }

      const data = await response.json()
      setSuccess(true)
      setCompanyId(data.id)
      
      // Guardar ID de empresa en localStorage para usarlo después
      localStorage.setItem("companyId", data.id.toString())
      localStorage.setItem("companyName", data.name)

      // Limpiar formulario
      setFormData({
        name: "",
        nit: "",
        email: "",
        phone: "",
        address: "",
      })

      // Redirigir a registro después de 2 segundos
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido"
      setError(errorMessage)
      console.error("Error al crear empresa:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md px-8">
        <h1 className="text-4xl font-bold text-center mb-4">
          Registro de Empresa
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Completa los datos de tu empresa para crear una cuenta en el sistema.
        </p>

        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            ✅ Empresa creada exitosamente
            {companyId && (
              <p className="text-sm mt-2">ID de empresa: {companyId}</p>
            )}
            <p className="text-sm mt-2">Redirigiendo a login...</p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            ❌ Error: {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-normal">
              Nombre de Empresa
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="ejemploSAS"
              className="h-11 bg-gray-50 border-gray-200"
              value={formData.name}
              onChange={handleInputChange}
              required
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
              value={formData.nit}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-normal">
              Correo corporativo
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="empresa@ejemplo.com"
              className="h-11 bg-gray-50 border-gray-200"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-normal">
              Teléfono
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="3182923827"
              className="h-11 bg-gray-50 border-gray-200"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="text-sm font-normal">
              Dirección
            </Label>
            <Input
              id="address"
              type="text"
              placeholder="carrera 87"
              className="h-11 bg-gray-50 border-gray-200"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>

          {/* Botón */}
          <Button
            type="submit"
            className="w-full h-12 bg-black hover:bg-gray-800 text-white font-medium rounded-lg mt-6 disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrar Empresa"}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          ¿Ya tienes una empresa?{" "}
          <a href="/login" className="text-black font-semibold hover:underline">
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  )
}