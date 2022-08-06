import React from "react";
import { useNavigate } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";

export default function Card() {
  const navigate = useNavigate();

  return (
    <div className={styles.cardWrapper}>
      <h1 className="text-white my-4">
        A new way to get around, with a sleek and compact ride. Top features
        including a rear cargo box, and antitheft alarm and tracking.
      </h1>
      <button onClick={() => navigate("/rides")} className={styles.btn}>
        Explore rides
        <FiExternalLink className="mx-2" size={14} />
      </button>
    </div>
  );
}

const styles = {
  cardWrapper: "w-96 h-48 rounded-2xl bg-black p-4",
  btn: "bg-white rounded-3xl px-3 py-1 my-2 text-sm flex items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300",
};
