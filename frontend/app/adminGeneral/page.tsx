import { Button } from "@/components/ui/button";

export default function AdminGeneralPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Administración General</h1>

      <div
        className="mt-6 rounded-lg shadow p-6"
        style={{ backgroundColor: "var(--color-card)", color: "var(--color-card-foreground)" }}
      >
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground">
                <th className="pb-2">Empresa</th>
                <th className="pb-2">Encuestas</th>
                <th className="pb-2">Usuarios</th>
                <th className="pb-2 text-right">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {[
                { name: "Alpha", surveys: 12, users: 10 },
                { name: "Beta", surveys: 21, users: 8 },
                { name: "Gamma", surveys: 9, users: 20 },
                { name: "Delta", surveys: 10, users: 10 },
              ].map((c) => (
                <tr key={c.name} className="border-t">
                  <td className="py-4 text-muted-foreground">{c.name}</td>
                  <td className="py-4">{c.surveys}</td>
                  <td className="py-4">{c.users}</td>
                  <td className="py-4">
                    <div className="flex justify-end items-center gap-3">
                      <Button variant="outline" size="sm">✏️</Button>
                      <Button variant="outline" size="sm">🗑️</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}