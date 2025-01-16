import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const StatsChart = ({ data }: any) => {
  const chartData = [
    { label: "Products Sold", value: data.totalProductsSold },
    { label: "Margins", value: data.totalMargins },
    { label: "Margin Expected", value: data.totalMarginExpected},
    { label: "Selling Price", value: data.totalSellingPrice },
    { label: "Sales", value: data.totalSales },
  ];

  const chartConfig = {
    value: {
      label: "Value",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Statistics</CardTitle>
        <CardDescription>Overview of product statistics</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            margin={{
            //   top: 20,
              right: 0,
              left: 0,
              bottom: 0,
            }}
            width={300}
            height={150}
            data={chartData}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 6)}
            />
            {/* <YAxis /> */}
            <Tooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            {/* <Legend /> */}
            <Bar dataKey="value" fill="var(--color-value)" radius={8}>
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
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total statistics for the selected period
        </div>
      </CardFooter> */}
    </Card>
  );
};
