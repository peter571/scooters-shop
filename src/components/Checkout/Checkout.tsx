import React from "react";
import PaymentForm from "./PaymentForm";
import ShippingData from "./ShippingData";
import { Wizard, useWizard } from "react-use-wizard";

export default function Checkout() {
  return (
    <div className="flex flex-row justify-center align-middle items-center h-screen">
      <Wizard>
        <ShippingData />
        <PaymentForm />
      </Wizard>
    </div>
  );
}
