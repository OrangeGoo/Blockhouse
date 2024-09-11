"use client"

import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

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

export const description = "A line chart with dots"

type LineData = {
  label: string;
  data: number;
};

const chartConfig = {
  data: {
    label: "Data",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function CustomLineChart() {
  const [LineData, setLineData] = useState<LineData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.getLineData().then((data) => {
      const formattedData: LineData[] = data.labels.map((label: string, index: string | number) => {
        return {
          label: label,
          data: data.data[index],
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
    <Card>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={LineData}
            margin={{
              top: 30,
              left: 20,
              right: 20,
              bottom: 5
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="data"
              type="natural"
              stroke="var(--color-data)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-data)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
