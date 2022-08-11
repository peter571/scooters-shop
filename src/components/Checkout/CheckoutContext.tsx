import { CardElement } from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState } from "react";
import { commerce } from "../../context/commerce";
import { ScootersContext } from "../../context/ScootersContext";
import { ShippingDataValues } from "../../type";

interface CheckoutContent {
  shippingData: ShippingDataValues;
  shippingCountries: any;
  shippingSubdivisions: any;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<any>) => void;
  handlePaymentSubmit: (
    e: React.ChangeEvent<any>,
    elements: any,
    stripe: any
  ) => Promise<void>;
}

interface CheckoutProviderProp {
  children: React.ReactNode;
}

export const CheckoutContext = React.createContext<CheckoutContent>(
  {} as CheckoutContent
);

export const CheckoutProvider = ({ children }: CheckoutProviderProp) => {
  const initialshippingData: ShippingDataValues = {
    firstName: "",
    lastName: "",
    zip: "",
    city: "",
    email: "",
    address: "",
    shippingCountry: "",
    shippingSubdivision: "",
  };
  const [shippingData, setShippingData] =
    useState<ShippingDataValues>(initialshippingData);
  const [shippingCountries, setShippingCountries] = useState<any>([]);
  const [shippingSubdivisions, setShippingSubdivisions] = useState<any>([]);
  const { handleCaptureCheckout, checkoutToken } = useContext(ScootersContext);

  function handleChange(e: React.ChangeEvent<any>) {
    setShippingData({ ...shippingData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  const handlePaymentSubmit = async (
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
        line_items: checkoutToken?.live.line_items,
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
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };
      await handleCaptureCheckout(checkoutToken.id, orderData);
    }
  };

  const fetchShippingCountries = async () => {
    const { countries } = await commerce.services.localeListCountries();
    setShippingCountries(countries);
  };

  const fetchSubdivisions = async (countryCode: string) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    setShippingSubdivisions(subdivisions);
  };

  useEffect(() => {
    fetchShippingCountries();
  }, []);

  useEffect(() => {
    fetchSubdivisions(shippingData.shippingCountry);
  }, [shippingData.shippingCountry]);

  return (
    <CheckoutContext.Provider
      value={{
        shippingCountries,
        handleChange,
        handleSubmit,
        shippingData,
        shippingSubdivisions,
        handlePaymentSubmit
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};
