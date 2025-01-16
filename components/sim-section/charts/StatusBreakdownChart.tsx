"use client";

import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useSimStats } from "@/context/sim-store";

export const StatusBreakdownChart = () => {
  const { statusBreakdown } = useSimStats();

  const chartData = [
    {
      name: "Active",
      value: statusBreakdown.Active,
      fill: "hsl(var(--chart-1))",
    },
    {
      name: "Inactive",
      value: statusBreakdown.Inactive,
      fill: "#52525b",
    },
    {
      name: "Draft",
      value: statusBreakdown.Draft,
      fill: "hsl(var(--chart-2))",
    },
  ];

  const chartConfig = {
    Active: {
      label: "Active",
    },
    Inactive: {
      label: "Offline",
    },
    Draft: {
      label: "Draft",
    },
  } satisfies ChartConfig;

  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const renderLegend = (props: any) => {
    const { payload } = props;
    return (
      <ul className="flex flex-wrap justify-center gap-2">
        {payload.map((entry: any, index: number) => (
          <li key={`item-${index}`} className="flex items-center gap-2">
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            ></span>
            <span>{entry.value}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <Card className="flex flex-col border-none shadow-none">
        <CardHeader className="items-center pb-0">
          {/* <CardTitle className="text-lg">Sim Stat</CardTitle> */}
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[520px] pb-0  [&_.recharts-text]:fill-background"
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent nameKey="value" />} />
              <Pie
                data={chartData}
                dataKey="value"
                labelLine={false}
                label={renderCustomLabel}
              />
              <ChartLegend content={renderLegend} />
            </PieChart>
          </ChartContainer>
          <CardFooter className="flex items-center justify-center">
            <CardDescription className="text-gray-400 flex items-center justify-center">
              Nombre de sim par status
            </CardDescription>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
};
