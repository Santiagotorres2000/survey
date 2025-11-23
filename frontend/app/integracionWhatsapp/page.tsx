import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export default function IntegracionWhatsappPage() {
  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Integración Whatsapp</h1>
          <p className="text-sm text-muted-foreground">Configura el número y habilita encuestas.</p>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        {/* Card: número + token */}
        <div className="rounded-lg shadow p-4" style={{ backgroundColor: "var(--color-card)", color: "var(--color-card-foreground)" }}>
          <div className="flex flex-col md:flex-row md:items-center md:gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium">Número de Whatsapp asociado</label>
              <div className="mt-2 flex w-full gap-3">
                <div className="flex-1">
                  <Input placeholder="+57 320 254 3774" className="text-lg" />
                </div>
                <div className="flex-1">
                  <Input placeholder="Token o API key" />
                </div>
                <div className="flex items-center gap-3">
                <Button size="sm">Probar conexión</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card: encuestas habilitables */}
        <div className="rounded-lg shadow p-4" style={{ backgroundColor: "var(--color-card)", color: "var(--color-card-foreground)" }}>
          <h2 className="text-base font-semibold">Encuestas habilitables</h2>

          <div className="mt-4 overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground">
                  <th className="pb-2">Encuesta</th>
                  <th className="pb-2">Fecha</th>
                  <th className="pb-2">Estado</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-t">
                  <td className="py-3">Satisfacción servicio</td>
                  <td className="py-3">11/11/25</td>
                  <td className="py-3">
                    <div className="flex items-center justify-end">
                      <Switch defaultChecked />
                    </div>
                  </td>
                </tr>

                <tr className="border-t">
                  <td className="py-3">Evaluación interna</td>
                  <td className="py-3">16/11/25</td>
                  <td className="py-3">
                    <div className="flex items-center justify-end">
                      <Switch />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}