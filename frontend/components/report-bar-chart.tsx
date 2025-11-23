"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ReportBarChart() {
  const labels = ["1", "2", "3", "4", "5"];
  const [resolvedColors, setResolvedColors] = useState<string[] | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = getComputedStyle(document.documentElement);
    const vars = ["--chart-1", "--chart-2", "--chart-3", "--chart-4", "--chart-5"];
    const cols = vars.map((v) => root.getPropertyValue(v).trim() || v);
    setResolvedColors(cols);
  }, []);

  const data = useMemo(() => {
    return {
      labels,
      datasets: [
        {
          label: "Respuestas",
          // Valores solicitados: muy insatisfecho 20, insatisfecho 40, neutral 60, satisfecho 80, muy satisfecho 100
          data: [20, 40, 60, 80, 100],
          backgroundColor: resolvedColors ?? [
            "var(--chart-1)",
            "var(--chart-2)",
            "var(--chart-3)",
            "var(--chart-4)",
            "var(--chart-5)",
          ],
          borderRadius: 6,
          maxBarThickness: 48,
        },
      ],
    };
  }, [resolvedColors]);

  const options = useMemo(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        title: { display: false },
      },
      scales: {
        x: {
          grid: { display: false },
        },
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value: any) {
              return `${value}%`;
            },
          },
        },
      },
    } as any;
  }, []);

  return (
    <div className="w-full h-44">
      <Bar data={data} options={options} />
    </div>
  );
}
