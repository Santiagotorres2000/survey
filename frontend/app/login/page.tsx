"use client"

import { useState, FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

interface LoginData {
  email: string
  password: string
}

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
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

    try {
      // Validaciones básicas
      if (!formData.email.trim()) {
        setError("El email es requerido")
        setLoading(false)
        return
      }

      if (!formData.password.trim()) {
        setError("La contraseña es requerida")
        setLoading(false)
        return
      }

      const response = await fetch(
        "http://localhost:8080/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      )

      if (!response.ok) {
        let errorMessage = `Error ${response.status}`
        try {
          const errorData = await response.json()
          errorMessage =
            errorData.message ||
            errorData.error ||
            "Credenciales inválidas"
        } catch (e) {
          // Si no hay JSON en la respuesta
        }
        throw new Error(errorMessage)
      }

      const data = await response.json()

      // Guardar token en localStorage
      if (data.token) {
        localStorage.setItem("token", data.token)
        localStorage.setItem("userEmail", formData.email)

        // Guardar companyId y role si están disponibles
        if (data.companyId) {
          localStorage.setItem("companyId", data.companyId.toString())
        }
        if (data.role) {
          localStorage.setItem("userRole", data.role)
        }

        // Redirigir al dashboard
        router.push("/dashboard")
      }

      // Limpiar formulario
      setFormData({
        email: "",
        password: "",
      })
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error desconocido"
      setError(errorMessage)
      console.error("Error al iniciar sesión:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md px-8">
        <h1 className="text-4xl font-bold text-center mb-12">
          Iniciar Sesión
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            ❌ Error: {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-normal">
              Correo electrónico
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="usuario@ejemplo.com"
              className="h-11 bg-gray-50 border-gray-200"
              value={formData.email}
              onChange={handleInputChange}
              required
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
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-black hover:bg-gray-800 text-white font-medium rounded-lg mt-8 disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
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

        <p className="text-center text-sm text-gray-600 mt-8">
          ¿No tienes cuenta?{" "}
          <a
            href="/registro"
            className="text-black font-semibold hover:underline"
          >
            Crea una aquí
          </a>
        </p>

        <p className="text-center text-sm text-gray-600 mt-4">
          ¿Primera vez?{" "}
          <a
            href="/registro-empresa"
            className="text-black font-semibold hover:underline"
          >
            Registra tu empresa
          </a>
        </p>
      </div>
    </div>
  )
}