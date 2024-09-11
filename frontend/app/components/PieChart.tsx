"use client"

import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useState } from "react"
import { api } from "@/lib/api"

export const description = "A pie chart with a label"

type PieData = {
  label: string;
  data: number;
  fill: string;
};

const chartConfig = {
  data: {
    label: "Data",
  },
  Red: {
    label: "Red",
    color: "hsl(var(--chart-6))",
  },
  Blue: {
    label: "Blue",
    color: "hsl(var(--chart-7))",
  },
  Yellow: {
    label: "Yello",
    color: "hsl(var(--chart-8))",
  },
} satisfies ChartConfig

export function CustomPieChart() {
  const [PieData, setLineData] = useState<PieData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.getPieData().then((data) => {
      const formattedData: PieData[] = data.labels.map((label: string, index: string | number) => {
        return {
          label: label,
          data: data.data[index],
          fill: `var(--color-${label})`
        }
      })
      setLineData(formattedData);
    })
    .catch((err) => {
      console.error("An error occurred while obtaining data:", err);
      setError("Failed to obtain data. Please try again later.");
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Card className="flex flex-col">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={PieData} dataKey="data" label nameKey="label" />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
