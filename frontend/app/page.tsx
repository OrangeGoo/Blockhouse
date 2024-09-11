import { CustomBarChart } from "./components/BarChart";
import { CustomLineChart } from "./components/LineChart";
import { CustomPieChart } from "./components/PieChart";
import { CustomCandlestickChart } from "./components/CandlestickChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-10">DahsBoard</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Bar Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <CustomBarChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Line Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <CustomLineChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pie Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <CustomPieChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Candlestick Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <CustomCandlestickChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
