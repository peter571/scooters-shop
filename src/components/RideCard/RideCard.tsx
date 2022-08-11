import React, { useContext, useState } from "react";
import { BiPurchaseTag } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { ScootersContext } from "../../context/ScootersContext";
import pic from "../../scooters/vespa-no-bg.png";
import Loader from "../Loader/Loader";

interface RideCardProp {
  id: string;
  price: string;
  description: string;
  imgUrl: string;
  name: string;
}

export default function RideCard(props: RideCardProp) {
  const { purchase } = useContext(ScootersContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handlePurchase() {
    setLoading(true);
    await purchase(props.id);
    navigate("/checkout");
    setLoading(false);
  }

  return (
    <div className={styles.cardWrapper} key={props.id}>
      <img className="object-contain w-[80%] sm:w-96 sm:h-48" src={props.imgUrl} alt="pic" />
      <hr />
      <div className="flex justify-between flex-row mt-2">
        <h1 className="font-bold">{props.price}</h1>
        <button onClick={handlePurchase} className={styles.btnPurchase} disabled={loading}>
          {loading ? (
            `Processing...`
          ) : (
            <>
              Purchase
              <BiPurchaseTag size={14} />
            </>
          )}
        </button>
      </div>
      <p className={styles.description}>{props.name}</p>
    </div>
  );
}

const styles = {
  cardWrapper:
    "shadow-lg p-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300",
  description:
    "font-light text-sm text-ellipsis whitespace-nowrap overflow-hidden my-3 w-[80%] w-96",
  btnPurchase:
    "px-3 py-1 bg-yellow-500 flex flex-row rounded-2xl align-middle items-center mr-1",
};
