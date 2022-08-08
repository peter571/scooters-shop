import React, { useContext, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import Input from "./Input";
import Select from "./Select";
import { commerce } from "../../context/commerce";
import { ScootersContext } from "../../context/ScootersContext";
import { useWizard } from "react-use-wizard";

export interface ShippingDataValues {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  zip: string;
  city: string;
  shippingCountry: string;
  shippingSubdivision: string;
  shippingOption: string;
}

export default function ShippingData() {
  const [shippingCountries, setShippingCountries] = useState<any>([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState<any>([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState<any>([]);
  const [shippingOption, setShippingOption] = useState("");

  const { checkoutToken } = useContext(ScootersContext);

  const { handleStep, previousStep, nextStep } = useWizard();

  const initialValues: ShippingDataValues = {
    firstName: "",
    lastName: "",
    zip: "",
    city: "",
    email: "",
    address: "",
    shippingCountry: "",
    shippingSubdivision: "",
    shippingOption: "",
  };

  const fetchShippingCountries = async (checkoutTokenId: string) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );

    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubdivisions = async (countryCode: string) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    )
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (
    checkoutTokenId: string,
    country: any,
    stateProvince = undefined
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region: stateProvince }
    );

    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, []);

  return (
    <div className="w-[50%] p-8 flex flex-col justify-center items-center bg-slate-300">
      <h1 className="text-center">Purchase Scooter</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }}
      >
        {(props) => (
          <Form className="flex flex-col w-full justify-center">
            <div className="flex flex-row justify-between gap-4">
              <Input
                label={"First Name*"}
                name={"firstName"}
                handleChange={props.handleChange}
                handleBlur={props.handleBlur}
                type={"text"}
                value={props.values.firstName}
              />
              <Input
                label={"Last Name*"}
                name={"lastName"}
                handleChange={props.handleChange}
                handleBlur={props.handleBlur}
                type={"text"}
                value={props.values.lastName}
              />
            </div>

            <Input
              label={"Address*"}
              name={"cardMonth"}
              handleChange={props.handleChange}
              handleBlur={props.handleBlur}
              type={"text"}
              value={props.values.address}
            />
            <Input
              label={"Email*"}
              name={"email"}
              handleChange={props.handleChange}
              handleBlur={props.handleBlur}
              type={"text"}
              value={props.values.email}
            />
            <Input
              label={"City*"}
              name={"city"}
              handleChange={props.handleChange}
              handleBlur={props.handleBlur}
              type={"text"}
              value={props.values.city}
            />

            <Input
              label={"Zip*"}
              name={"zip"}
              handleChange={props.handleChange}
              handleBlur={props.handleBlur}
              type={"text"}
              value={props.values.zip}
            />

            <Input
              label={"Address*"}
              name={"address"}
              handleChange={props.handleChange}
              handleBlur={props.handleBlur}
              type={"text"}
              value={props.values.address}
            />

            <Select
              label={"Shipping Country"}
              options={Object.entries(shippingCountries)}
              name={"shippingCountry"}
              handleChange={props.handleChange}
              value={props.values.shippingCountry}
            />
            <Select
              label={"Shipping Subdivision"}
              options={shippingSubdivisions}
              name={"shippingSubdivision"}
              handleChange={props.handleChange}
              value={props.values.shippingSubdivision}
            />
            <Select
              label={"Shipping Options"}
              options={shippingOptions}
              name={"shippingOption"}
              handleChange={props.handleChange}
              value={props.values.shippingOption}
            />
<button onClick={() => nextStep()}>Next</button>           
          </Form>
        )}
      </Formik>
    </div>
  );
}

const styles = {
  btn: "px-2 py-1 bg-blue-600 rounded-md text-white",
};
