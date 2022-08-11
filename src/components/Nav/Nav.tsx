import React from "react";
import { BiHomeAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();

  return (
    <nav className="flex flex-row justify-between bg-transparent items-center px-2 md:px-4 py-4 align-middle">
      <div
        className="flex flex-row gap-1 items-center align-middle cursor-pointer"
        onClick={() => navigate("/")}
      >
        <BiHomeAlt size={16} />
        <h1 className="font-bold">Scooters and Bikes</h1>
      </div>
      <h1 className="cursor-pointer font-bold" onClick={() => navigate("/rides")}>
        Rides
      </h1>
    </nav>
  );
}
