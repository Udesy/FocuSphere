import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

// Define interfaces for our data and props
interface DataPoint {
  month: string;
  value: number;
  previous: number;
}

interface MonthlyAreaChartProps {
  data?: DataPoint[];
}

const MonthlyAreaChart: React.FC<MonthlyAreaChartProps> = ({
  data = defaultData,
}) => {
  const formatTooltipValue = (value: number): string => {
    return `${value.toLocaleString()}`;
  };

  return (
    <div className="w-[950px] h-[240px] p-4 bg-slate-300/50 rounded-xl shadow-md">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 10,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6b46c1" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#6b46c1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="month"
            tick={{ fill: "#666" }}
            axisLine={{ stroke: "#ccc" }}
          />
          <YAxis
            tick={{ fill: "#666" }}
            axisLine={{ stroke: "#ccc" }}
            tickFormatter={(value) => value.toLocaleString()}
          />
          <Tooltip
            formatter={(value: ValueType, name: NameType) => [
              formatTooltipValue(value as number),
              name,
            ]}
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderRadius: "4px",
              border: "1px solid #ddd",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          />
          <Legend verticalAlign="top" height={36} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#6b46c1" // Tailwind purple-700
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorValue)"
            name="Current Year"
            activeDot={{
              r: 8,
              fill: "#6b46c1",
              stroke: "#fff",
              strokeWidth: 2,
            }}
            dot={{ fill: "#6b46c1", stroke: "#fff", strokeWidth: 2, r: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

// Default data to use if none is provided
const defaultData: DataPoint[] = [
  { month: "Jan", value: 4000, previous: 3200 },
  { month: "Feb", value: 3000, previous: 2800 },
  { month: "Mar", value: 5000, previous: 3600 },
  { month: "Apr", value: 2780, previous: 2900 },
  { month: "May", value: 1890, previous: 2400 },
  { month: "Jun", value: 2390, previous: 2200 },
  { month: "Jul", value: 3490, previous: 2800 },
  { month: "Aug", value: 4200, previous: 3100 },
  { month: "Sep", value: 3800, previous: 3400 },
  { month: "Oct", value: 4300, previous: 3700 },
  { month: "Nov", value: 5100, previous: 4200 },
  { month: "Dec", value: 4800, previous: 4600 },
];

export default MonthlyAreaChart;
