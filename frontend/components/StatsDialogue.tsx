import { CircleUserRound, X } from "lucide-react";
import React, { useEffect, useRef } from "react";
import Heatmap from "./Heatmap";
import Graph from "./Graph";
import BarChart from "./BarChart";
import gsap from "gsap";

interface StatsDialogueProps {
  setOpenStats: (open: boolean) => void;
}

const StatsDialogue: React.FC<StatsDialogueProps> = ({ setOpenStats }) => {
  const statRef = useRef(null);

  useEffect(() => {
    gsap.set(statRef.current, {
      opacity: 0,
    });
    gsap.to(statRef.current, {
      opacity: 1,
      duration: 0.2,
    });
  }, []);
  return (
    <div
      className="fixed inset-0 h-full w-full flex items-center justify-center bg-black/50 backdrop-blur-md z-50"
      onClick={() => setOpenStats(false)}
      ref={statRef}
    >
      <div
        className="relative bg-slate-300/50 border border-black w-[1000px] h-[680px] flex justify-between rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute right-4 top-2 bg-background hover:bg-background/80 rounded-xl p-1.5">
          <X onClick={() => setOpenStats(false)} color="#000000" />
        </div>
        <div className="flex flex-col w-full items-center gap-8 p-4 overflow-y-scroll scrollbar-track-bg-neutral-900 scrollbar-thumb-gray-800">
          <div className="flex flex-row items-center justify-between gap-[38px] w-full mt-9 text-[22px] bg-slate-300/50 rounded-xl px-4 py-7 ">
            <div className="flex flex-row items-center justify-center gap-4">
              <div>
                <CircleUserRound size={50} />
              </div>
              <div className="flex flex-col items-center">
                <h1>Username</h1>
                <p className="text-[12px] text-gray-600">DD-MM-YYYY</p>
              </div>
            </div>
            <div className="bg-gray-700 h-full w-1.5 rounded-full" />
            <div className="flex flex-col items-center justify-center gap-3">
              <h1>Focus started</h1>
              <p className="text-3xl mt-3">00</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-3">
              <h1>Breaks Taken</h1>
              <p className="text-3xl mt-3">00</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-3">
              <h1>Total time Focused</h1>
              <p className="text-3xl mt-3">00</p>
            </div>
          </div>
          <div className="flex flex-row gap-5">
            <div className="rounded-xl bg-slate-300/50">
              <BarChart />
            </div>
            <div className="w-[300px] h-[280px] rounded-xl flex flex-col items-center justify-evenly bg-slate-300/50">
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-xl">Total Focus this Week</h1>
                <p className="mt-4 text-3xl">00</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-xl">Best Focus Time</h1>
                <p className="mt-4 text-3xl">00</p>
              </div>
            </div>
          </div>
          <div className=" bg-slate-300/50 rounded-xl w-full">
            <Heatmap />
          </div>
          <div className="flex flex-row gap-5">
            <div className="">
              <Graph />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsDialogue;
