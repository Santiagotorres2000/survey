"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Question {
  text: string
  type: string
  options: string[]
}

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [surveyCount, setSurveyCount] = useState<number>(0)
  const [loadingSurveys, setLoadingSurveys] = useState(true)
  const [latestSurveyTitle, setLatestSurveyTitle] = useState<string>("")
  const [latestSurveyDescription, setLatestSurveyDescription] = useState<string>("")

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  })

  const [questions, setQuestions] = useState<Question[]>([])
  const [newOption, setNewOption] = useState<{ [key: number]: string }>({})

  // Fetch survey count and latest survey
  const fetchSurveyCount = async () => {
    try {
      const token = localStorage.getItem("token")
      const companyIdStr = localStorage.getItem("companyId")

      if (!token || !companyIdStr) {
        setLoadingSurveys(false)
        return
      }

      const companyId = Number(companyIdStr)

      const response = await fetch(`http://localhost:8080/api/survey/company/${companyId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })

      if (response.ok) {
        const surveys = await response.json()
        if (Array.isArray(surveys)) {
          setSurveyCount(surveys.length)
          // Get the latest survey (last one in the array)
          if (surveys.length > 0) {
            const latestSurvey = surveys[surveys.length - 1]
            setLatestSurveyTitle(latestSurvey.title || "Sin título")
            setLatestSurveyDescription(latestSurvey.description || "")
          } else {
            setLatestSurveyTitle("No hay encuestas")
            setLatestSurveyDescription("")
          }
        } else {
          setSurveyCount(0)
          setLatestSurveyTitle("No hay encuestas")
          setLatestSurveyDescription("")
        }
      }
    } catch (err) {
      console.error("Error fetching surveys:", err)
    } finally {
      setLoadingSurveys(false)
    }
  }

  useEffect(() => {
    fetchSurveyCount()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const addQuestion = () => {
    setQuestions([...questions, { text: "", type: "TEXT", options: [] }])
  }

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index))
  }

  const updateQuestion = (index: number, field: keyof Question, value: string) => {
    const updatedQuestions = [...questions]
    if (field === "type") {
      updatedQuestions[index] = { ...updatedQuestions[index], [field]: value, options: [] }
    } else {
      updatedQuestions[index] = { ...updatedQuestions[index], [field]: value }
    }
    setQuestions(updatedQuestions)
  }

  const addOption = (questionIndex: number) => {
    const optionText = newOption[questionIndex]?.trim()
    if (!optionText) return

    const updatedQuestions = [...questions]
    updatedQuestions[questionIndex].options.push(optionText)
    setQuestions(updatedQuestions)
    setNewOption({ ...newOption, [questionIndex]: "" })
  }

  const removeOption = (questionIndex: number, optionIndex: number) => {
    const updatedQuestions = [...questions]
    updatedQuestions[questionIndex].options = updatedQuestions[questionIndex].options.filter(
      (_, i) => i !== optionIndex
    )
    setQuestions(updatedQuestions)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    // Validate questions
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i]
      if (!q.text.trim()) {
        setError(`La pregunta ${i + 1} no puede estar vacía`)
        setLoading(false)
        return
      }
      if (q.type === "MULTIPLE_CHOICE" && q.options.length < 2) {
        setError(`La pregunta ${i + 1} debe tener al menos 2 opciones`)
        setLoading(false)
        return
      }
    }

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
          questions: questions.map((q) => ({
            text: q.text,
            type: q.type,
            options: q.type === "MULTIPLE_CHOICE" ? q.options : [],
          })),
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
      setQuestions([])
      setNewOption({})

      // Actualizar el contador de encuestas y última encuesta después de un breve delay
      setTimeout(() => {
        fetchSurveyCount()
      }, 300)

      // Cerrar modal después de 1.5 segundos
      setTimeout(() => {
        setIsModalOpen(false)
        setSuccess(false)
      }, 1500)
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
            <p className="text-4xl font-bold text-gray-800">
              {loadingSurveys ? "..." : surveyCount}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Respuestas totales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-gray-800">0</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Última encuesta publicada
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <p className="font-medium text-gray-800">
              {loadingSurveys ? "Cargando..." : latestSurveyTitle}
            </p>
            {!loadingSurveys && latestSurveyDescription && (
              <p className="text-sm text-gray-600">
                {latestSurveyDescription}
              </p>
            )}
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
              No hay respuestas por ahora, revisa luego
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Nueva Encuesta</h2>
              <button
                onClick={() => {
                  setIsModalOpen(false)
                  setError(null)
                  setSuccess(false)
                  setQuestions([])
                  setNewOption({})
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

              {/* Questions Section */}
              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-medium">Preguntas</Label>
                  <Button
                    type="button"
                    onClick={addQuestion}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 h-8"
                  >
                    + Agregar pregunta
                  </Button>
                </div>

                {questions.map((question, qIndex) => (
                  <div key={qIndex} className="border rounded-lg p-4 bg-gray-50 space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1 space-y-3">
                        <div>
                          <Label className="text-xs text-gray-600">
                            Pregunta {qIndex + 1}
                          </Label>
                          <Input
                            type="text"
                            placeholder="Escribe tu pregunta aquí"
                            className="mt-1 bg-white"
                            value={question.text}
                            onChange={(e) => updateQuestion(qIndex, "text", e.target.value)}
                            required
                          />
                        </div>

                        <div>
                          <Label className="text-xs text-gray-600">Tipo de pregunta</Label>
                          <select
                            className="mt-1 w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
                            value={question.type}
                            onChange={(e) => updateQuestion(qIndex, "type", e.target.value)}
                          >
                            <option value="TEXT">Texto libre</option>
                            <option value="MULTIPLE_CHOICE">Opción múltiple</option>
                          </select>
                        </div>

                        {question.type === "MULTIPLE_CHOICE" && (
                          <div className="space-y-2">
                            <Label className="text-xs text-gray-600">Opciones</Label>
                            <div className="space-y-2">
                              {question.options.map((option, oIndex) => (
                                <div key={oIndex} className="flex gap-2 items-center">
                                  <span className="text-sm text-gray-600 w-6">{oIndex + 1}.</span>
                                  <Input
                                    type="text"
                                    value={option}
                                    className="flex-1 bg-white text-sm"
                                    readOnly
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removeOption(qIndex, oIndex)}
                                    className="text-red-600 hover:text-red-800 text-sm px-2"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ))}
                              <div className="flex gap-2">
                                <Input
                                  type="text"
                                  placeholder="Nueva opción"
                                  className="flex-1 bg-white text-sm"
                                  value={newOption[qIndex] || ""}
                                  onChange={(e) =>
                                    setNewOption({ ...newOption, [qIndex]: e.target.value })
                                  }
                                  onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                      e.preventDefault()
                                      addOption(qIndex)
                                    }
                                  }}
                                />
                                <Button
                                  type="button"
                                  onClick={() => addOption(qIndex)}
                                  className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 h-9"
                                >
                                  Agregar
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => removeQuestion(qIndex)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}

                {questions.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No hay preguntas. Haz clic en "Agregar pregunta" para comenzar.
                  </p>
                )}
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
                    setQuestions([])
                    setNewOption({})
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