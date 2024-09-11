"use client";

import React, { useEffect, useState } from 'react';
import { ComposedChart, XAxis, YAxis, Tooltip, ReferenceLine, CartesianGrid, Bar} from 'recharts';
import { Card, CardContent } from "@/components/ui/card";
import { api } from '@/lib/api';

type CandlestickData = {
  x: string;
  open: number;
  high: number;
  low: number;
  close: number;
};

// Custom Tooltip Component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip: React.FC<any> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as CandlestickData;
    return (
      <div className="custom-tooltip" style={{ backgroundColor: 'white', padding: '10px', border: '1px solid #ccc' }}>
        <p>Date: {data.x}</p>
        <p>Open: {data.open}</p>
        <p>High: {data.high}</p>
        <p>Low: {data.low}</p>
        <p>Close: {data.close}</p>
      </div>
    );
  }
  return null;
};

export const CustomCandlestickChart: React.FC = () => {
  const [candlestickData, setCandlestickData] = useState<CandlestickData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.getCandlestickData().then((data) => {
      setCandlestickData(data.data);
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
        <ComposedChart width={600} height={400} data={candlestickData}>
          <XAxis dataKey="x" />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip content={<CustomTooltip />} />
          <CartesianGrid stroke="#f5f5f5" />
          <ReferenceLine y={0} stroke="#000" />
          
          {/* Custom Bars to render candles */}
          <Bar
            dataKey="open"
            fill="hsl(var(--chart-6))"
            stackId="candles"
            barSize={20}
            isAnimationActive={false}
          />
          <Bar
            dataKey="close"
            fill="hsl(var(--chart-9))"
            stackId="candles"
            barSize={20}
            isAnimationActive={false}
          />
        </ComposedChart>
      </CardContent>
    </Card>
  );
};


