import React, { useContext } from "react"
import { ScootersContext } from "../../context/ScootersContext"
import { MdOutlineKeyboardBackspace } from "react-icons/md"
import { TiTick } from "react-icons/ti"
import { Link } from "react-router-dom"

export default function Complete() {
  const { order } = useContext(ScootersContext)

  return (
    <div className="flex items-center align-middle justify-center">
      <div className="flex flex-col justify-items-center items-center align-middle mt-[10%] w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] bg-green-200 p-3">
        <div className="">
          <h4 className="font-bold">
            Thank you for your purchase, {order.customer.firstname}{" "}
            {order.customer.lastname}!
          </h4>
          <p className="font-bold">
            <span>Order ref: {order?.customer_reference}</span>
          </p>
          <div className="flex items-center align-middle justify-center">
            <TiTick size={35} color="green" />
          </div>
        </div>
        <Link
          className="flex align-middle items-center gap-1"
          type="button"
          to="/"
        >
          <MdOutlineKeyboardBackspace size={35} color="#292B83" />
          <span className="font-bold">Back to home</span>
        </Link>
      </div>
    </div>
  );
}
