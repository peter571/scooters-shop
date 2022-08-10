import React, { useContext, useState } from "react";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ScootersContext } from "../../context/ScootersContext";
import { useWizard } from "react-use-wizard";
import { CheckoutContext } from "./CheckoutContext";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_KEY);

export default function PaymentForm() {
  const { checkoutToken } = useContext(ScootersContext);
  const { handlePaymentSubmit } = useContext(CheckoutContext);
  const navigate = useNavigate();
  const { previousStep } = useWizard();
  const [loading, setLoading] = useState(false);
  return (
    <div className="w-[50%] shadow-md p-3">
      <h1 className="mb-8 font-bold">Payment Summary</h1>
      <div className="bg-gray-500 p-2 mb-8 rounded flex max-w-[50%] flex-col">
        <h1 className="font-bold">Item Details</h1>
        <h1>{checkoutToken.live.line_items[0].name}</h1>
        <h1>{checkoutToken.live.subtotal.formatted_with_symbol}</h1>
      </div>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form
              className=""
              onSubmit={async (e) => {
                try {
                  setLoading(true);
                  await handlePaymentSubmit(e, elements, stripe);
                  setLoading(false);
                  navigate("/success");
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              <div className="">
                <CardElement options={cardStyle} />
              </div>
              <br /> <br />
              <div className="flex justify-between my-1">
                <button className="px-2 py-1 bg-slate-200 rounded-md" onClick={() => previousStep()}>Back</button>
                <button
                  className="px-2 py-1 bg-blue-600 rounded-md text-white"
                  type="submit"
                  disabled={!stripe && loading}
                >
                  {loading ? `processing...` : `Pay ${checkoutToken.live.subtotal.formatted_with_symbol}`}
                </button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </div>
  );
}

const cardStyle = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: "Arial, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      borderColor: "#000000",
      "::placeholder": {
        color: "#32325d",
      },
    },
    invalid: {
      fontFamily: "Arial, sans-serif",
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};
