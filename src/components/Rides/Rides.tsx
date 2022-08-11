import React, { useContext, useState } from "react";
import { ScootersContext } from "../../context/ScootersContext";
import Bikes from "../Bikes/Bikes";
import Scooters from "../Scooters/Scooters";

type ID = "scooters" | "bikes";

export default function Rides() {
  const [currentId, setCurrentId] = useState<ID>("scooters");

  return (
    <div className="h-screen flex flex-col align-middle items-center sm:flex-row">
      {/* Side bar */}
      <div className="sm:w-[20%] lg:w-[10%] hidden sm:flex align-middle flex-col justify-center gap-6 px-3">
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
      {/* Nav Bar */}
      <div className="sm:hidden flex align-middle items-center flex-row justify-center gap-6 px-3">
        <h1
          onClick={() => setCurrentId("scooters")}
          className={`text-black cursor-pointer px-1 py-1 sm:px-2 font-bold sm:py-3 ${
            currentId === "scooters" && "bg-yellow-500"
          }`}
        >
          Scooters
        </h1>
        <h1
          onClick={() => setCurrentId("bikes")}
          className={`text-black cursor-pointer px-1 py-1 sm:px-2 font-bold sm:py-3 ${
            currentId === "bikes" && "bg-yellow-500"
          }`}
        >
          Bikes
        </h1>
      </div>

      <div className="w-full">
        {currentId === "scooters" ? <Scooters /> : <Bikes />}
      </div>
    </div>
  );
}
