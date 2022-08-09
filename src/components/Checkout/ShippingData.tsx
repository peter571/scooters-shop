import React, { useContext, useState } from "react";
import Input from "./Input";
import Select from "./Select";
import { useWizard } from "react-use-wizard";
import { CheckoutContext } from "./CheckoutContext";

export default function ShippingData() {
  const {
    handleSubmit,
    handleChange,
    shippingData,
    shippingCountries,
    shippingSubdivisions,
  } = useContext(CheckoutContext);
  const { nextStep } = useWizard();
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="w-[50%] p-8 flex flex-col justify-center items-center">
      <h1 className="text-center">Purchase Scooter</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full justify-center"
      >
        <Input
          label={"First Name*"}
          name={"firstName"}
          handleChange={handleChange}
          type={"text"}
          value={shippingData.firstName}
        />
        <Input
          label={"Last Name*"}
          name={"lastName"}
          handleChange={handleChange}
          type={"text"}
          value={shippingData.lastName}
        />
        <Input
          label={"Email*"}
          name={"email"}
          handleChange={handleChange}
          type={"text"}
          value={shippingData.email}
        />
        <Input
          label={"City*"}
          name={"city"}
          handleChange={handleChange}
          type={"text"}
          value={shippingData.city}
        />

        <Input
          label={"Zip*"}
          name={"zip"}
          handleChange={handleChange}
          type={"text"}
          value={shippingData.zip}
        />

        <Input
          label={"Address*"}
          name={"address"}
          handleChange={handleChange}
          type={"text"}
          value={shippingData.address}
        />

        <Select
          label={"Shipping Country"}
          options={Object.entries(shippingCountries).map(([code, name]) => ({
            id: code,
            label: name,
          }))}
          name={"shippingCountry"}
          handleChange={handleChange}
          value={shippingData.shippingCountry}
        />
        <Select
          label={"Shipping Subdivision"}
          options={Object.entries(shippingSubdivisions).map(([code, name]) => ({
            id: code,
            label: name,
          }))}
          name={"shippingSubdivision"}
          handleChange={handleChange}
          value={shippingData.shippingSubdivision}
        />
        <button
          className="px-2 py-1 bg-blue-600 rounded-md my-1 text-white"
          onClick={nextStep}
          disabled={isActive}
        >
          Next
        </button>
      </form>
    </div>
  );
}
