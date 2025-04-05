import React from "react";

const Clock = () => {
  return (
    <div className="flex flex-row gap-8">
      <div className="flex flex-col w-70 h-50  justify-center items-center">
        <img
          src="/12-Hour.jpg"
          className="w-full h-full object-cover rounded-xl"
        />
        <h1 className="mt-4">12-Hour Clock</h1>
      </div>
      <div className="flex flex-col w-70 h-50 justify-center items-center">
        <img
          src="/24-Hour.jpg"
          className="w-full h-full object-cover rounded-xl"
        />
        <h1 className="mt-4">24-Hour Clock</h1>
      </div>
    </div>
  );
};

export default Clock;
