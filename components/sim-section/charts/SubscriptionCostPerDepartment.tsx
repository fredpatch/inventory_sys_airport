"use client";

import { TrendingUp } from "lucide-react";
import { LabelList, Legend, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useSimStats } from "@/context/sim-store";

export const SubscriptionCostPerDepartment = () => {
  const { subscriptionCostPerDepartment } = useSimStats();

  const chartData = Object.keys(subscriptionCostPerDepartment).map(
    (department: any, index) => ({
      name: department,
      value: subscriptionCostPerDepartment[department],
      fill: `hsl(var(--chart-${(index % 6) + 1}))`, // Cycle through color vars
    })
  );

  const chartConfig = {
    Name: { label: "name" },
    Value: { label: "value" },
  } satisfies ChartConfig;

  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    value,
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
        <tspan
          x={x}
          y={y + 15}
          className="text-[14rem]!"
        >{`${value.toLocaleString(0)} HT`}</tspan>
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
              nameKey={"name"}
              labelLine={false}
              label={renderCustomLabel}
              isAnimationActive={true}
            />
            <ChartLegend content={renderLegend} />
            {/* <Legend
              align="center"
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              content={renderLegend}
            /> */}
          </PieChart>
        </ChartContainer>
        <CardFooter className="flex items-center justify-center">
          <CardDescription className="text-gray-400 flex items-center justify-center">
            Charges d'abonnement par département
          </CardDescription>
        </CardFooter>
      </CardContent>
    </Card>
  );
};
