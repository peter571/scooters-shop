import React, { useState } from "react";
import Bikes from "../Bikes/Bikes";
import Scooters from "../Scooters/Scooters";

type ID = "scooters" | "bikes";

export default function Rides() {
  const [currentId, setCurrentId] = useState<ID>("scooters");

  return (
    <div className="h-screen flex flex-row">
      <div className="w-[10%] flex align-middle flex-col justify-center gap-6 shadow-md px-3">
        <h1
          onClick={() => setCurrentId("scooters")}
          className={`text-black cursor-pointer px-2 font-bold py-3 ${
            currentId === "scooters" && "bg-yellow-500"
          }`}
        >
          Scooters
        </h1>
        <h1
          onClick={() => setCurrentId("bikes")}
          className={`text-black font-bold cursor-pointer px-2 py-3 ${
            currentId === "bikes" && "bg-yellow-500"
          }`}
        >
          Bikes
        </h1>
      </div>
      <div className="w-[80%]">
        {currentId === "scooters" ? <Scooters /> : <Bikes />}
      </div>
    </div>
  );
}
