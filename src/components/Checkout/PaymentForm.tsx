import React, { useContext } from "react";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ScootersContext } from "../../context/ScootersContext";
import { useWizard } from "react-use-wizard";
import { CheckoutContext } from "./CheckoutContext";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_KEY);

export default function PaymentForm() {
  const { checkoutToken } = useContext(ScootersContext);
  const { handlePaymentSubmit } = useContext(CheckoutContext);

  return (
    <div className="w-[50%]">
      <h1 className="mb-8 font-bold">Make Payment</h1>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form
              className=""
              onSubmit={(e) => handlePaymentSubmit(e, elements, stripe)}
            >
              <div className="">
                <CardElement options={cardStyle} />
              </div>
              <br /> <br />
              <div className="bg-gray-500 p-2 rounded flex max-w-[50%] flex-col">
                <h1 className="font-bold">Item Details</h1>
                <h1>{checkoutToken.live.line_items[0].name}</h1>
                <h1>{checkoutToken.live.subtotal.formatted_with_symbol}</h1>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  className="px-2 py-1 bg-blue-600 rounded-md my-1 text-white"
                  type="submit"
                  disabled={!stripe}
                >
                  Pay {checkoutToken.live.subtotal.formatted_with_symbol}
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
