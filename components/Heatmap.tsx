// import moment, { Moment } from "moment";
// import React, { useState } from "react";

// const DayName: Record<number, string> = {
//   0: "Sun",
//   1: "Mon",
//   2: "Tue",
//   3: "Wed",
//   4: "Thu",
//   5: "Fri",
//   6: "Sat",
// };

// interface CellProps {
//   value: number;
//   date: string;
//   onHover: (date: string, x: number, y: number) => void;
//   onLeave: () => void;
// }

// const Cell: React.FC<CellProps> = ({ value, date, onHover, onLeave }) => {
//   const cellColor = (value: number): string => {
//     if (value > 8) return "bg-purple-800";
//     if (value > 6) return "bg-purple-600";
//     if (value > 4) return "bg-purple-400";
//     if (value > 2) return "bg-purple-200";
//     return "bg-purple-100";
//   };

//   return (
//     <div
//       className={`w-3 h-3 m-[2px] rounded-[3.5px] border-2 border-transparent hover:border-white
//         ${cellColor(value)}`}
//       onMouseEnter={(e) =>
//         onHover(date, e.currentTarget.offsetLeft, e.currentTarget.offsetTop)
//       }
//       onMouseLeave={onLeave}
//     ></div>
//   );
// };

// interface WeekDayProps {
//   index: number;
// }

// const WeekDay: React.FC<WeekDayProps> = ({ index }) => {
//   return (
//     <div className="w-8 h-3 m-[2px] text-center text-xs flex items-center justify-center">
//       {DayName[index]}
//     </div>
//   );
// };

// interface DataPoint {
//   date: string; // Format: YYYY-MM-DD
//   value: number;
// }

// interface TimelineProps {
//   range: [Moment, Moment];
//   data: DataPoint[];
// }

// const Timeline: React.FC<TimelineProps> = ({ range, data }) => {
//   const [tooltip, setTooltip] = useState<{
//     visible: boolean;
//     date: string;
//     x: number;
//     y: number;
//   }>({
//     visible: false,
//     date: "",
//     x: 0,
//     y: 0,
//   });

//   const days = Math.abs(range[0].diff(range[1], "days"));
//   const startDate = range[0];
//   const weeks: (DataPoint | null)[][] = [];
//   let currentWeek: (DataPoint | null)[] = Array(7).fill(null);

//   for (let i = 0; i <= days; i++) {
//     const date = moment(startDate).add(i, "days");
//     const dayOfWeek = date.day();
//     const dateStr = date.format("YYYY-MM-DD");

//     const value = data.find((d) => d.date === dateStr)?.value || 0;
//     currentWeek[dayOfWeek] = { date: dateStr, value };

//     if (dayOfWeek === 6 || i === days) {
//       weeks.push([...currentWeek]);
//       currentWeek = Array(7).fill(null);
//     }
//   }

//   const monthLabels = weeks.map((week) => {
//     const firstDay = week.find((day) => day !== null);
//     return firstDay ? moment(firstDay.date).format("MMM") : null;
//   });

//   let lastMonth: string | null = null;
//   const displayMonths = monthLabels.map((month) => {
//     if (month && month !== lastMonth) {
//       lastMonth = month;
//       return month;
//     }
//     return null;
//   });

//   return (
//     <div className="relative flex flex-row py-4">
//       {/* Tooltip */}
//       {tooltip.visible && (
//         <div
//           className="absolute bg-black text-white text-xs px-2 py-1 rounded shadow-lg z-50"
//           style={{
//             top: tooltip.y + 20,
//             left: tooltip.x + 20,
//             whiteSpace: "nowrap",
//             pointerEvents: "none",
//           }}
//         >
//           {tooltip.date}
//         </div>
//       )}

//       {/* Weekdays */}
//       <div className="flex flex-col pt-4.5">
//         {Array.from({ length: 7 }).map((_, dayIndex) => (
//           <WeekDay key={dayIndex} index={dayIndex} />
//         ))}
//       </div>

//       {/* Calendar Cells */}
//       <div className="flex flex-col">
//         <div className="flex flex-row">
//           {displayMonths.map((month, index) => (
//             <div key={index} className="w-3 m-[2px] text-center text-xs">
//               {month || ""}
//             </div>
//           ))}
//         </div>

//         <div className="flex flex-col">
//           {Array.from({ length: 7 }).map((_, dayIndex) => (
//             <div key={dayIndex} className="flex flex-row">
//               {weeks.map((week, weekIndex) => {
//                 const day = week[dayIndex];
//                 return day ? (
//                   <Cell
//                     key={weekIndex}
//                     value={day.value}
//                     date={day.date}
//                     onHover={(date, x, y) =>
//                       setTooltip({ visible: true, date, x, y })
//                     }
//                     onLeave={() => setTooltip({ ...tooltip, visible: false })}
//                   />
//                 ) : (
//                   <div key={weekIndex} className="w-3 h-3 m-[2px]"></div>
//                 );
//               })}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// const App: React.FC = () => {
//   const startDate = moment().subtract(365, "days");
//   const endDate = moment();
//   const dateRange: [Moment, Moment] = [startDate, endDate];

//   const focusDataFromMongo: DataPoint[] = [
//     { date: "2025-04-01", value: 3 },
//     { date: "2025-04-02", value: 1 },
//     { date: "2025-04-04", value: 5 },
//     { date: "2025-04-05", value: 7 },
//   ];

//   return (
//     <div className="flex flex-col overflow-x-hidden">
//       <div className="flex flex-row gap-1 items-center justify-start ml-6 mt-4">
//         <span className="text-[12px]">less</span>
//         <div className="w-3 h-3 bg-purple-100 rounded-[3.5px]"></div>
//         <div className="w-3 h-3 bg-purple-200 rounded-[3.5px]"></div>
//         <div className="w-3 h-3 bg-purple-400 rounded-[3.5px]"></div>
//         <div className="w-3 h-3 bg-purple-600 rounded-[3.5px]"></div>
//         <div className="w-3 h-3 bg-purple-800 rounded-[3.5px]"></div>
//         <span className="text-[12px]">more</span>
//       </div>

//       <div className="container w-[940px] flex justify-center">
//         <Timeline range={dateRange} data={focusDataFromMongo} />
//       </div>
//     </div>
//   );
// };

// export default App;

import moment, { Moment } from "moment";
import React, { useState } from "react";

const DayName: Record<number, string> = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
};

interface CellProps {
  value: number;
  date: string;
  onHover: (date: string, x: number, y: number) => void;
  onLeave: () => void;
}

const Cell: React.FC<CellProps> = ({ value, date, onHover, onLeave }) => {
  const cellColor = (value: number): string => {
    if (value > 36000) return "bg-purple-800";
    if (value > 30000) return "bg-purple-600";
    if (value > 20000) return "bg-purple-400";
    if (value > 10000) return "bg-purple-200";
    return "bg-purple-100";
  };

  return (
    <div
      className={`w-3 h-3 m-[2px] rounded-[3.5px] border-2 border-transparent hover:border-white ${cellColor(
        value
      )}`}
      onMouseEnter={(e) =>
        onHover(date, e.currentTarget.offsetLeft, e.currentTarget.offsetTop)
      }
      onMouseLeave={onLeave}
    ></div>
  );
};

interface WeekDayProps {
  index: number;
}

const WeekDay: React.FC<WeekDayProps> = ({ index }) => {
  return (
    <div className="w-8 h-3 m-[2px] text-center text-xs flex items-center justify-center">
      {DayName[index]}
    </div>
  );
};

interface TimelineProps {
  range: [Moment, Moment];
  data: Record<string, number>;
}

const Timeline: React.FC<TimelineProps> = ({ range, data }) => {
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    date: string;
    x: number;
    y: number;
  }>({
    visible: false,
    date: "",
    x: 0,
    y: 0,
  });

  const days = Math.abs(range[0].diff(range[1], "days"));
  const startDate = range[0];
  const weeks: ({ date: string; value: number } | null)[][] = [];
  let currentWeek: ({ date: string; value: number } | null)[] =
    Array(7).fill(null);

  for (let i = 0; i <= days; i++) {
    const date = moment(startDate).add(i, "days");
    const dayOfWeek = date.day();
    const dateStr = date.format("YYYY-MM-DD");

    const value = data[dateStr] || 0;
    currentWeek[dayOfWeek] = { date: dateStr, value };

    if (dayOfWeek === 6 || i === days) {
      weeks.push([...currentWeek]);
      currentWeek = Array(7).fill(null);
    }
  }

  const monthLabels = weeks.map((week) => {
    const firstDay = week.find((day) => day !== null);
    return firstDay ? moment(firstDay.date).format("MMM") : null;
  });

  let lastMonth: string | null = null;
  const displayMonths = monthLabels.map((month) => {
    if (month && month !== lastMonth) {
      lastMonth = month;
      return month;
    }
    return null;
  });

  return (
    <div className="relative flex flex-row py-4">
      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="absolute bg-black text-white text-xs px-2 py-1 rounded shadow-lg z-50"
          style={{
            top: tooltip.y + 20,
            left: tooltip.x + 20,
            whiteSpace: "nowrap",
            pointerEvents: "none",
          }}
        >
          {tooltip.date}
        </div>
      )}

      {/* Weekdays */}
      <div className="flex flex-col pt-4.5">
        {Array.from({ length: 7 }).map((_, dayIndex) => (
          <WeekDay key={dayIndex} index={dayIndex} />
        ))}
      </div>

      {/* Calendar Cells */}
      <div className="flex flex-col">
        <div className="flex flex-row">
          {displayMonths.map((month, index) => (
            <div key={index} className="w-3 m-[2px] text-center text-xs">
              {month || ""}
            </div>
          ))}
        </div>

        <div className="flex flex-col">
          {Array.from({ length: 7 }).map((_, dayIndex) => (
            <div key={dayIndex} className="flex flex-row">
              {weeks.map((week, weekIndex) => {
                const day = week[dayIndex];
                return day ? (
                  <Cell
                    key={weekIndex}
                    value={day.value}
                    date={day.date}
                    onHover={(date, x, y) =>
                      setTooltip({ visible: true, date, x, y })
                    }
                    onLeave={() => setTooltip({ ...tooltip, visible: false })}
                  />
                ) : (
                  <div key={weekIndex} className="w-3 h-3 m-[2px]"></div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface HeatmapProps {
  data: Record<string, number>;
}

const Heatmap: React.FC<HeatmapProps> = ({ data = {} }) => {
  const startDate = moment().subtract(365, "days");
  const endDate = moment();
  const dateRange: [Moment, Moment] = [startDate, endDate];

  return (
    <div className="flex flex-col overflow-x-auto">
      {/* Gradient Legend */}
      <div className="flex flex-row gap-1 items-center justify-start ml-6 mt-4">
        <span className="text-[12px]">less</span>
        <div className="w-3 h-3 bg-purple-100 rounded-[3.5px]"></div>
        <div className="w-3 h-3 bg-purple-200 rounded-[3.5px]"></div>
        <div className="w-3 h-3 bg-purple-400 rounded-[3.5px]"></div>
        <div className="w-3 h-3 bg-purple-600 rounded-[3.5px]"></div>
        <div className="w-3 h-3 bg-purple-800 rounded-[3.5px]"></div>
        <span className="text-[12px]">more</span>
      </div>

      <div className="w-[940px] flex justify-center overflow-hidden">
        <Timeline range={dateRange} data={data} />
      </div>
    </div>
  );
};

export default Heatmap;
