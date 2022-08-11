import React from "react";
import { useNavigate } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";

export default function Card() {
  const navigate = useNavigate();

  return (
    <div className="w-[90%] sm:w-64 lg:w-96 h-auto rounded-2xl bg-black p-8">
      <h1 className="text-white font-extrabold text-3xl my-4">
        New ways to get around,
        <br />
        with a sleek and compact ride.
      </h1>
      <button onClick={() => navigate("/rides")} className={styles.btn}>
        Explore rides
        <FiExternalLink className="mx-2" size={14} />
      </button>
    </div>
  );
}

const styles = {
  btn: "bg-white rounded-lg font-bold px-3 py-1 my-2 text-sm flex items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300",
};
