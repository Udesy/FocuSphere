import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DataPoint {
  day: string; // Weekday (e.g., "Mon")
  hours: number; // Hours spent
}

interface WeeklyBarChartProps {
  data?: DataPoint[];
}

const WeeklyBarChart: React.FC<WeeklyBarChartProps> = ({
  data = defaultData,
}) => {
  return (
    <div className="w-[630px] h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="day"
            tick={{ fill: "#666" }}
            axisLine={{ stroke: "#ccc" }}
          />
          <YAxis
            tick={{ fill: "#666" }}
            axisLine={{ stroke: "#ccc" }}
            tickFormatter={(value) => `${value}h`}
          />
          <Tooltip
            formatter={(value: number) => [`${value} hours`, "Hours"]}
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderRadius: "4px",
              border: "1px solid #ddd",
            }}
          />
          <Bar
            dataKey="hours"
            fill="#9333ea" // Tailwind purple-600
            radius={[12, 12, 0, 0]} // Rounded top corners (mimics rounded-xl)
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Default data for the past 7 weekdays (assuming today is Thursday, April 3, 2025)
const defaultData: DataPoint[] = [
  { day: "Fri", hours: 5 }, // Mar 28
  { day: "Sat", hours: 3 }, // Mar 29
  { day: "Sun", hours: 7 }, // Mar 30
  { day: "Mon", hours: 4 }, // Mar 31
  { day: "Tue", hours: 6 }, // Apr 1
  { day: "Wed", hours: 2 }, // Apr 2
  { day: "Thu", hours: 8 }, // Apr 3
];

export default WeeklyBarChart;
