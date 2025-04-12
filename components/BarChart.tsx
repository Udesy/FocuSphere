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
import moment from "moment";

interface WeeklyBarChartProps {
  focusSessions: Record<string, number>; // date string: focus time in seconds
}

interface ProcessedDataPoint {
  day: string;
  hours: number;
}

const WeeklyBarChart: React.FC<WeeklyBarChartProps> = ({ focusSessions }) => {
  const last7Days = Array.from({ length: 7 }, (_, i) =>
    moment()
      .subtract(6 - i, "days")
      .format("YYYY-MM-DD")
  );

  const data: ProcessedDataPoint[] = last7Days.map((dateStr) => {
    const seconds = focusSessions?.[dateStr] ?? 0;
    return {
      day: moment(dateStr).format("ddd"),
      hours: parseFloat((seconds / 3600).toFixed(1)),
    };
  });

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
            ticks={[0, 2, 4, 6, 8]}
            domain={[0, 8]}
            tick={{ fill: "#666" }}
            axisLine={{ stroke: "#ccc" }}
            tickFormatter={(value) => `${value}h`}
          />
          <Tooltip
            formatter={(value: number) => [`${value} hours`, "Focus"]}
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderRadius: "4px",
              border: "1px solid #ddd",
            }}
          />
          <Bar dataKey="hours" fill="#9333ea" radius={[12, 12, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyBarChart;
