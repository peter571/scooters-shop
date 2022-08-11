import React from "react";
import PaymentForm from "./PaymentForm";
import ShippingData from "./ShippingData";
import { Wizard } from "react-use-wizard";
import { CheckoutProvider } from "./CheckoutContext";

export default function Checkout() {
  return (
    <CheckoutProvider>
      <div className="flex flex-row justify-center align-middle items-center min-h-screen">
        <Wizard>
          <ShippingData />
          <PaymentForm />
        </Wizard>
      </div>
    </CheckoutProvider>
  );
}
