import React, { useContext, useState } from "react";
import Input from "./Input";
import Select from "./Select";
import { useWizard } from "react-use-wizard";
import { CheckoutContext } from "./CheckoutContext";
import { ScootersContext } from "../../context/ScootersContext";

export default function ShippingData() {
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  const { checkoutToken, order } = useContext(ScootersContext);
  const {
    handleSubmit,
    handleChange,
    shippingData,
    shippingCountries,
    shippingSubdivisions,
  } = useContext(CheckoutContext);
  const { nextStep } = useWizard();

  return (
    <div className=" sm:shadow-md md:w-[80%] lg:w-[50%] p-4 sm:p-8 flex flex-col justify-center items-center">
      <h1 className="text-center font-bold">Enter Shipping Details</h1>
      <form
        onSubmit={(e) => {
          if (checkoutToken) {
            handleSubmit(e);
            nextStep()
          } else {
            setErrorMsg("Token expired!");
          }
        }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full justify-center"
      >
        <Input
          label={"First Name*"}
          name={"firstName"}
          handleChange={handleChange}
          type={"text"}
          value={shippingData.firstName}
          placeholder={"First name"}
        />
        <Input
          label={"Last Name*"}
          name={"lastName"}
          handleChange={handleChange}
          type={"text"}
          value={shippingData.lastName}
          placeholder={"Last name"}
        />
        <Input
          label={"Email*"}
          name={"email"}
          handleChange={handleChange}
          type={"text"}
          value={shippingData.email}
          placeholder={"email"}
        />
        <Input
          label={"City*"}
          name={"city"}
          handleChange={handleChange}
          type={"text"}
          value={shippingData.city}
          placeholder={"city"}
        />

        <Input
          label={"Zip*"}
          name={"zip"}
          handleChange={handleChange}
          type={"text"}
          value={shippingData.zip}
          placeholder={"zip"}
        />

        <Input
          label={"Address*"}
          name={"address"}
          handleChange={handleChange}
          type={"text"}
          value={shippingData.address}
          placeholder={"address"}
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
          type="submit"
        >
          Next
        </button>
      </form>
      <h1 className="text-red-600 text-center py-2">{errorMsg}</h1>
    </div>
  );
}
