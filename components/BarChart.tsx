// import React from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// interface DataPoint {
//   day: string; // Weekday (e.g., "Mon")
//   hours: number; // Hours spent
// }

// interface WeeklyBarChartProps {
//   data?: DataPoint[];
// }

// const WeeklyBarChart: React.FC<WeeklyBarChartProps> = ({
//   data = defaultData,
// }) => {
//   return (
//     <div className="w-[630px] h-[280px]">
//       <ResponsiveContainer width="100%" height="100%">
//         <BarChart
//           data={data}
//           margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
//         >
//           <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
//           <XAxis
//             dataKey="day"
//             tick={{ fill: "#666" }}
//             axisLine={{ stroke: "#ccc" }}
//           />
//           <YAxis
//             tick={{ fill: "#666" }}
//             axisLine={{ stroke: "#ccc" }}
//             tickFormatter={(value) => `${value}h`}
//           />
//           <Tooltip
//             formatter={(value: number) => [`${value} hours`, "Hours"]}
//             contentStyle={{
//               backgroundColor: "rgba(255, 255, 255, 0.95)",
//               borderRadius: "4px",
//               border: "1px solid #ddd",
//             }}
//           />
//           <Bar
//             dataKey="hours"
//             fill="#9333ea" // Tailwind purple-600
//             radius={[12, 12, 0, 0]} // Rounded top corners (mimics rounded-xl)
//           />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// // Default data for the past 7 weekdays (assuming today is Thursday, April 3, 2025)
// const defaultData: DataPoint[] = [
//   { day: "Fri", hours: 5 },
//   { day: "Sat", hours: 3 },
//   { day: "Sun", hours: 7 },
//   { day: "Mon", hours: 4 },
//   { day: "Tue", hours: 6 },
//   { day: "Wed", hours: 2 },
//   { day: "Thu", hours: 8 },
// ];

// export default WeeklyBarChart;

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

interface RawDataPoint {
  date: string; // e.g., "2025-04-01"
  focusTime: number; // total focus time in minutes
}

interface ProcessedDataPoint {
  day: string; // e.g., "Mon"
  hours: number;
}

const WeeklyBarChart: React.FC = () => {
  const rawData: RawDataPoint[] = [
    { date: "2025-04-01", focusTime: 420 }, // 2h
    { date: "2025-04-02", focusTime: 90 }, // 1.5h
    { date: "2025-04-03", focusTime: 150 }, // 2.5h
    { date: "2025-04-04", focusTime: 300 }, // 0.5h
    { date: "2025-04-05", focusTime: 60 }, // 1h
    { date: "2025-04-06", focusTime: 200 }, // 3.3h
    { date: "2025-04-07", focusTime: 240 }, // 3h
  ];

  // 🛠️ Format for chart: { day: "Mon", hours: number }
  const data: ProcessedDataPoint[] = rawData.map(({ date, focusTime }) => ({
    day: moment(date).format("ddd"), // "Mon", "Tue", etc.
    hours: parseFloat((focusTime / 60).toFixed(1)), // convert to hours and round
  }));

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
