import { Button } from "@/components/ui/button";

export default function ReportesPage() {
  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Reportes/Resultados</h1>
          <p>Visualiza, filtra y descarga resultados por empresa y encuesta.</p>
        </div>

        <div className="flex items-center gap-3">
          <Button size="sm">descargar .xls</Button>
          <Button variant="outline" size="sm">descargar .pdf</Button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-12 grid-rows-12 gap-4">
        <div
          className="col-span-6 row-span-4 rounded-lg shadow p-6 flex flex-col"
          style={{ backgroundColor: "var(--color-card)", color: "var(--color-card-foreground)" }}
        >
          <h2 className="text-lg font-semibold">Reporte 1</h2>

          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="flex flex-col items-start">
              <span className="text-3xl font-bold">24</span>
              <span className="text-sm text-muted-foreground">Encuestas creadas</span>
            </div>

            <div className="flex flex-col items-start">
              <span className="text-3xl font-bold">1,256</span>
              <span className="text-sm text-muted-foreground">Respuestas</span>
            </div>

            <div className="flex flex-col items-start">
              <span className="text-3xl font-bold">4.3</span>
              <span className="text-sm text-muted-foreground">Promedio general</span>
            </div>
          </div>
        </div>

        <div
          className="col-span-6 row-span-6 rounded-lg shadow p-6 flex flex-col"
          style={{ backgroundColor: "var(--color-card)", color: "var(--color-card-foreground)" }}
        >
          <h2 className="text-lg font-semibold">Reporte 2</h2>

          {/* Sección 1: Satisfacción por pregunta (gráfico de torta) */}
          <div className="mt-3 flex gap-6 items-start">
            <div className="flex-shrink-0">
              <div
                className="w-36 h-36 rounded-full shadow-sm"
                role="img"
                aria-label="Gráfico de torta de satisfacción"
                style={{
                  background: `conic-gradient(
                    var(--chart-1) 0% 10%,
                    var(--chart-2) 10% 25%,
                    var(--chart-3) 25% 50%,
                    var(--chart-4) 50% 80%,
                    var(--chart-5) 80% 100%
                  )`,
                }}
              />
            </div>

            <div className="flex-1">
              <div className="text-sm font-medium">Satisfacción por pregunta</div>
              <p className="text-xs text-muted-foreground mt-1">Distribución porcentual de respuestas</p>

              {/* Sección 2: Resultado por pregunta + leyenda de colores */}
              <div className="mt-4">
                <div className="text-sm font-medium">Resultado por pregunta</div>
                <div className="mt-2 grid grid-cols-1 gap-2">
                  {/* Leyenda en el orden solicitado */}
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-4 h-4 rounded-sm" style={{ backgroundColor: 'var(--chart-1)' }} />
                    <span className="text-sm">Muy insatisfecho</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-4 h-4 rounded-sm" style={{ backgroundColor: 'var(--chart-2)' }} />
                    <span className="text-sm">Insatisfecho</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-4 h-4 rounded-sm" style={{ backgroundColor: 'var(--chart-3)' }} />
                    <span className="text-sm">Neutral</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-4 h-4 rounded-sm" style={{ backgroundColor: 'var(--chart-4)' }} />
                    <span className="text-sm">Satisfecho</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-4 h-4 rounded-sm" style={{ backgroundColor: 'var(--chart-5)' }} />
                    <span className="text-sm">Muy satisfecho</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto flex justify-end">
            <Button variant="outline" size="sm">Ver</Button>
          </div>
        </div>

        <div
          className="col-span-6 row-span-8 rounded-lg shadow p-6 flex flex-col"
          style={{ backgroundColor: "var(--color-card)", color: "var(--color-card-foreground)" }}
        >
          <h2 className="text-lg font-semibold">Reporte 3</h2>
          <p className="text-sm text-muted-foreground">Distribución de respuestas (1-5)</p>

          {/* Mejor diseño: barras con valores encima, colores temáticos, hover */}
          <div className="mt-4 w-full">
            <div className="relative w-full h-44 bg-transparent">
              <div className="absolute inset-0 flex items-end gap-4 px-3">
                {([40, 80, 60, 100, 70] as number[]).map((value, i) => {
                  const colors = [
                    'var(--chart-1)',
                    'var(--chart-2)',
                    'var(--chart-3)',
                    'var(--chart-4)',
                    'var(--chart-5)'
                  ];
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center">
                      <div className="text-sm font-semibold mb-2">{value}%</div>
                      <div
                        title={`${value}%`}
                        className="w-full max-w-[56px] md:max-w-none mx-auto rounded-t-lg transition-transform duration-200 hover:scale-y-105"
                        style={{
                          height: `${value}%`,
                          background: `linear-gradient(180deg, ${colors[i]} 0%, ${colors[i]} 100%)`
                        }}
                      />
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="w-full flex gap-4 px-3 mt-3 text-sm text-muted-foreground">
              {[1, 2, 3, 4, 5].map((n) => (
                <div key={n} className="flex-1 text-center">
                  {n}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto flex justify-end">
            <Button variant="outline" size="sm">Ver</Button>
          </div>
        </div>

        <div
          className="col-span-6 row-span-6 rounded-lg shadow p-6 flex flex-col"
          style={{ backgroundColor: "var(--color-card)", color: "var(--color-card-foreground)" }}
        >
          <h2 className="text-lg font-semibold">Reporte 4</h2>

          <div className="mt-4 overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground">
                  <th className="pb-2">Fecha</th>
                  <th className="pb-2">Usuario</th>
                  <th className="pb-2">Empresa</th>
                  <th className="pb-2">Encuesta</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="py-2">2025-11-01</td>
                  <td className="py-2">juan.perez</td>
                  <td className="py-2">ACME S.A.</td>
                  <td className="py-2">Satisfacción 2025</td>
                </tr>
                <tr className="border-t">
                  <td className="py-2">2025-11-10</td>
                  <td className="py-2">maria.lopez</td>
                  <td className="py-2">Beta Ltda</td>
                  <td className="py-2">Onboarding</td>
                </tr>
                <tr className="border-t">
                  <td className="py-2">2025-11-15</td>
                  <td className="py-2">carlos.r</td>
                  <td className="py-2">Gamma Corp</td>
                  <td className="py-2">Net Promoter</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}