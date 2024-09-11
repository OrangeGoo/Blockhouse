"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

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

export const description = "A bar chart with a label"

type BarData = {
  label: string;
  data: number;
};

const chartConfig = {
  data: {
    label: "Data",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function CustomBarChart() {
  const [BarData, setBarData] = useState<BarData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.getBarData().then((data) => {
      const formattedData: BarData[] = data.labels.map((label: string, index: string | number) => {
        return {
          label: label,
          data: data.data[index],
        }
      })
      setBarData(formattedData);
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
          <BarChart
            accessibilityLayer
            data={BarData}
            margin={{
              top: 30,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="data" fill="var(--color-data)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
