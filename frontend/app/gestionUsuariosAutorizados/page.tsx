import { Button } from "@/components/ui/button";

export default function GestionUsuariosPage() {
  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Gestión de Usuarios Autorizados</h1>
          <p>Administra los usuarios de tu empresa: crea, edita o desactiva cuentas.</p>
        </div>

        <div className="flex items-center gap-3">
          <Button>Agregar usuario autorizado</Button>
        </div>
      </div>

      <div className="mt-6 rounded-lg shadow p-4" style={{ backgroundColor: "var(--color-card)", color: "var(--color-card-foreground)" }}>
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground">
                <th className="pb-2">Nombre</th>
                <th className="pb-2">Correo</th>
                <th className="pb-2">Rol</th>
                <th className="pb-2">Estado</th>
                <th className="pb-2">Acciones</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-t">
                <td className="py-3">Ana Gómez</td>
                <td className="py-3">ana@empresa.com</td>
                <td className="py-3">Creador</td>
                <td className="py-3">Activo</td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <button className="h-8 w-8 rounded-md bg-black text-white flex items-center justify-center">✏️</button>
                    <button className="h-8 w-8 rounded-md bg-black text-white flex items-center justify-center">⚙️</button>
                    <button className="h-8 w-8 rounded-md bg-black text-white flex items-center justify-center">🗑️</button>
                  </div>
                </td>
              </tr>

              <tr className="border-t">
                <td className="py-3">Luis Torres</td>
                <td className="py-3">luis@empresa.com</td>
                <td className="py-3">Analista</td>
                <td className="py-3">Inactivo</td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <button className="h-8 w-8 rounded-md bg-black text-white flex items-center justify-center">✏️</button>
                    <button className="h-8 w-8 rounded-md bg-black text-white flex items-center justify-center">⚙️</button>
                    <button className="h-8 w-8 rounded-md bg-black text-white flex items-center justify-center">🗑️</button>
                  </div>
                </td>
              </tr>

              <tr className="border-t">
                <td className="py-3">María Ruiz</td>
                <td className="py-3">maria@empresa.com</td>
                <td className="py-3">Creador</td>
                <td className="py-3">Activo</td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <button className="h-8 w-8 rounded-md bg-black text-white flex items-center justify-center">✏️</button>
                    <button className="h-8 w-8 rounded-md bg-black text-white flex items-center justify-center">⚙️</button>
                    <button className="h-8 w-8 rounded-md bg-black text-white flex items-center justify-center">🗑️</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}