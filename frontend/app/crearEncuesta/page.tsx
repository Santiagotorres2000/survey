import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export default function CrearEncuestaPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Crear encuesta</h1>
      <p className="text-sm text-muted-foreground">Genera las encuestas, ingresa los datos y las opciones de campos.</p>

      <div className="mt-6 rounded-lg shadow p-6" style={{ backgroundColor: "var(--color-card)", color: "var(--color-card-foreground)" }}>
        <section className="mb-6">
          <h2 className="text-base font-semibold">Datos básicos</h2>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Nombre encuesta</label>
              <div className="mt-2">
                <Input placeholder="Nombre de la encuesta" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Descripción encuesta</label>
              <div className="mt-2">
                <Input placeholder="Descripción corta" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Fecha de Inicio</label>
              <div className="mt-2">
                <Input placeholder="13/11/2025" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Fecha de Finalización</label>
              <div className="mt-2">
                <Input placeholder="21/11/2025" />
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-base font-semibold">Preguntas de la encuesta</h2>

          <div className="mt-4 grid grid-cols-2 gap-4 items-end">
            <div>
              <label className="text-sm">Tipo pregunta</label>
              <div className="mt-2">
                <Select>
                  <option value="short">respuesta corta</option>
                  <option value="paragraph">parrafo</option>
                  <option value="multiple">opcion multiple</option>
                  <option value="checkbox">casillas de verificacion</option>
                  <option value="file">subir archivo</option>
                </Select>
              </div>
            </div>

            <div className="flex justify-end">
              <Button size="sm">Agregar pregunta</Button>
            </div>

            <div>
              <label className="text-sm">Texto de la pregunta</label>
              <div className="mt-2">
                <Input placeholder="..." />
              </div>
            </div>

            <div>
              <label className="text-sm">Agregar opcion (si aplica)</label>
              <div className="mt-2">
                <Input placeholder="..." />
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <Button className="px-6">Crear</Button>
            <Button variant="outline" className="px-6">Cancelar</Button>
          </div>
        </section>
      </div>
    </div>
  );
}