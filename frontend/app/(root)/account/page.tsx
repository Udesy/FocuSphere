"use client";

import React, { useEffect, useState } from "react";

const page = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <div className="h-screen flex justify-center items-center">
      <h1 className="text-2xl">{message}</h1>
    </div>
  );
};

export default page;
