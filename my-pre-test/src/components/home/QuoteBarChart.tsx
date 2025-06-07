"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartLegend,
  ChartLegendContent,
  ChartTooltipContent,
} from "@/components/ui/chart";

// กำหนดค่าสีและชื่อสำหรับแต่ละ Bar
const chartConfig = {
  upvotes: {
    label: "Upvotes",
    color: "#8bc881",
  },
  downvotes: {
    label: "Downvotes",
    color: "#f87070",
  },
  total: {
    label: "Total",
    color: "#8cdaff", // ใช้สีตัวอักษรหลัก
  },
} satisfies ChartConfig;

// Props ของ Component นี้จะรับข้อมูลที่ผ่านการคำนวณมาแล้ว
interface QuoteTotalsChartProps {
  data: Array<{
    name: string;
    upvotes: number;
    downvotes: number;
    total: number;
  }>;
}

export function QuoteBarChart({ data }: QuoteTotalsChartProps) {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={data} margin={{ top: 20 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="name"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tick={{ fill: "#8bc881" }}
        />
        <YAxis tick={{ fill: "#f87070" }} />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent indicator="dot" chartConfig={chartConfig} />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="upvotes" fill="#8bc881" radius={4} maxBarSize={60} />
        <Bar dataKey="downvotes" fill="#f87070" radius={4} maxBarSize={60} />
      </BarChart>
    </ChartContainer>
  );
}
