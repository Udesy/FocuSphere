import moment, { Moment } from "moment";
import { px } from "motion/react";
import React from "react";

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
}

const Cell: React.FC<CellProps> = ({ value }) => {
  const cellColor = (value: number): string => {
    if (value > 8) return "bg-purple-800";
    if (value > 6) return "bg-purple-600";
    if (value > 4) return "bg-purple-400";
    if (value > 2) return "bg-purple-200";
    return "bg-purple-100";
  };

  return (
    <div
      className={`w-3 h-3 m-[2px] rounded-[3.5px] ${cellColor(value)}`}
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

interface DataPoint {
  date: Moment;
  value: number;
}

interface TimelineProps {
  range: [Moment, Moment];
  data: DataPoint[];
}

const Timeline: React.FC<TimelineProps> = ({ range, data }) => {
  const days = Math.abs(range[0].diff(range[1], "days"));
  const startDate = range[0];
  const DayFormat = "DDMMMYYYY";

  const weeks: (DataPoint | null)[][] = [];
  let currentWeek: (DataPoint | null)[] = Array(7).fill(null);

  for (let i = 0; i < days; i++) {
    const date = moment(startDate).add(i, "day");
    const dayOfWeek = date.day();
    const value =
      data.find(
        (d) =>
          moment(date).format(DayFormat) === moment(d.date).format(DayFormat)
      )?.value || 0;
    currentWeek[dayOfWeek] = { date, value };

    if (dayOfWeek === 6 || i === days - 1) {
      weeks.push([...currentWeek]);
      currentWeek = Array(7).fill(null);
    }
  }

  const monthLabels = weeks.map((week) => {
    const firstDay = week.find((day) => day !== null);
    return firstDay ? firstDay.date.format("MMM") : null;
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
    <div className="flex flex-row py-4 ">
      <div className="flex flex-col pt-4.5">
        {Array.from({ length: 7 }).map((_, dayIndex) => (
          <WeekDay key={dayIndex} index={dayIndex} />
        ))}
      </div>

      <div className="flex flex-col">
        <div className="flex flex-row ">
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
                  <Cell key={weekIndex} value={day.value} />
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

const App: React.FC = () => {
  const startDate = moment().add(-365, "days");
  const dateRange: [Moment, Moment] = [startDate, moment()];
  const data: DataPoint[] = Array.from({ length: 365 }).map((_, index) => ({
    date: moment(startDate).add(index, "day"),
    value: Math.floor(Math.random() * 10),
  }));

  return (
    <div className="container w-[940px] flex justify-center">
      <Timeline range={dateRange} data={data} />
    </div>
  );
};

export default App;
