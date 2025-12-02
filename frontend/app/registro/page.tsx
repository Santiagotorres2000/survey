"use client"

import { useState, FormEvent, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

interface RegisterData {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  role: string
}

export default function RegistroPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [companyId, setCompanyId] = useState<number | null>(null)

  const [formData, setFormData] = useState<RegisterData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "USER",
  })

  useEffect(() => {
    // Obtener companyId del localStorage (guardado en registro-empresa)
    const savedCompanyId = localStorage.getItem("companyId")
    if (savedCompanyId) {
      setCompanyId(Number(savedCompanyId))
    } else {
      setError(
        "No se encontró empresa. Por favor, crea una empresa primero."
      )
    }
  }, [])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
      // Validaciones básicas
      if (!formData.firstName.trim()) {
        setError("El nombre es requerido")
        setLoading(false)
        return
      }

      if (!formData.email.trim()) {
        setError("El email es requerido")
        setLoading(false)
        return
      }

      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        setError("El email no es válido")
        setLoading(false)
        return
      }

      if (!formData.password.trim()) {
        setError("La contraseña es requerida")
        setLoading(false)
        return
      }

      if (formData.password.length < 6) {
        setError("La contraseña debe tener al menos 6 caracteres")
        setLoading(false)
        return
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Las contraseñas no coinciden")
        setLoading(false)
        return
      }

      if (!companyId) {
        setError("ID de empresa no disponible")
        setLoading(false)
        return
      }

      // Hacer POST al backend
      const response = await fetch(
        "http://localhost:8080/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName || null,
            email: formData.email,
            phone: formData.phone || null,
            password: formData.password,
            role: formData.role,
            companyId: companyId,
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
            errorMessage
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
      }

      setSuccess(true)

      // Limpiar formulario
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        role: "USER",
      })

      // Redirigir a login después de 2 segundos
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error desconocido"
      setError(errorMessage)
      console.error("Error al registrar usuario:", err)
    } finally {
      setLoading(false)
    }
  }

  if (!companyId && !error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-full max-w-md px-8">
          <p className="text-center text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md px-8">
        <h1 className="text-4xl font-bold text-center mb-4">Crear Cuenta</h1>
        <p className="text-center text-gray-600 mb-8">
          Completa tus datos para crear una cuenta en el sistema.
        </p>

        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            ✅ Cuenta creada exitosamente
            <p className="text-sm mt-2">Redirigiendo a login...</p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            ❌ Error: {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Nombre */}
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-sm font-normal">
              Nombre *
            </Label>
            <Input
              id="firstName"
              type="text"
              placeholder="Juan"
              className="h-11 bg-gray-50 border-gray-200"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Apellido */}
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-sm font-normal">
              Apellido
            </Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Pérez"
              className="h-11 bg-gray-50 border-gray-200"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-normal">
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="juan@empresa.com"
              className="h-11 bg-gray-50 border-gray-200"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Teléfono */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-normal">
              Teléfono
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+57 312 1234567"
              className="h-11 bg-gray-50 border-gray-200"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>

          {/* Rol */}
          <div className="space-y-2">
            <Label htmlFor="role" className="text-sm font-normal">
              Rol
            </Label>
            <select
              id="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full h-11 bg-gray-50 border border-gray-200 rounded-md px-3 text-sm"
            >
              <option value="USER">Usuario</option>
              <option value="ADMIN">Administrador</option>
              <option value="EDITOR">Editor</option>
            </select>
          </div>

          {/* Contraseña */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-normal">
              Contraseña *
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••••••"
              className="h-11 bg-gray-50 border-gray-200"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Confirmar Contraseña */}
          <div className="space-y-2">
            <Label
              htmlFor="confirmPassword"
              className="text-sm font-normal"
            >
              Confirmar Contraseña *
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••••••"
              className="h-11 bg-gray-50 border-gray-200"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Botón */}
          <Button
            type="submit"
            className="w-full h-12 bg-black hover:bg-gray-800 text-white font-medium rounded-lg mt-6 disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Registrando..." : "Crear Cuenta"}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="text-black font-semibold hover:underline">
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  )
}
