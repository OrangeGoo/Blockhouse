const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

async function fetchData(endpoint: string) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export const api = {
  getCandlestickData: () => fetchData("/candlestick-data/"),
  getLineData: () => fetchData("/line-chart-data/"),
  getBarData: () => fetchData("/bar-chart-data/"),
  getPieData: () => fetchData("/pie-chart-data/"),
};
