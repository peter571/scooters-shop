import React, { useContext } from "react";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ScootersContext } from "../../context/ScootersContext";
import { useWizard } from "react-use-wizard";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_KEY);

export default function PaymentForm() {
    const { handleStep, previousStep, nextStep } = useWizard();

    const { handleCaptureCheckout, checkoutToken } = useContext(ScootersContext);

    const handleSubmit = async (
      event: React.FormEvent<HTMLFormElement>,
      elements: any,
      stripe: any
    ) => {
      event.preventDefault();
      if (!stripe || !elements) return;
      const cardElement = elements.getElement(CardElement);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });
  
      if (error) {
        console.log("[error]", error);
      } else {
        const orderData = {
          line_items: checkoutToken.live.line_items,
          customer: {
            firstname: shippingData.firstName,
            lastname: shippingData.lastName,
            email: shippingData.email,
          },
          shipping: {
            name: "International",
            street: shippingData.address,
            town_city: shippingData.city,
            county_state: shippingData.shippingSubdivision,
            postal_zip_code: shippingData.zip,
            country: shippingData.shippingCountry,
          },
          fulfillment: { shipping_method: shippingData.shippingOption },
          payment: {
            gateway: "stripe",
            stripe: {
              payment_method_id: paymentMethod.id,
            },
          },
        }
        handleCaptureCheckout(checkoutToken.id, orderData);
      }
    };
  
  return (
    <div className="bg-blue-300 w-[50%]">
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement options={cardStyle} />
              <br /> <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button type="submit" disabled={!stripe} color="primary">
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
      borderColor: "#000",
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
