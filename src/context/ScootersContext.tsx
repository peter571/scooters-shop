import { CheckoutCapture } from "@chec/commerce.js/types/checkout-capture";
import { CheckoutCaptureResponse } from "@chec/commerce.js/types/checkout-capture-response";
import { CheckoutToken } from "@chec/commerce.js/types/checkout-token";
import React, { useEffect, useState } from "react";
import { commerce } from "./commerce";

interface GlobalContent {
  products: any[];
  handleCaptureCheckout: (
    checkoutTokenId: string,
    newOrder: CheckoutCapture
  ) => Promise<void>;
  purchase: (id: string) => Promise<void>;
  order: CheckoutCaptureResponse;
  checkoutToken: CheckoutToken;
}

interface ProviderProps {
  children: React.ReactNode;
}

export const ScootersContext = React.createContext<GlobalContent>(
  {} as GlobalContent
);

export const ScootersProvider = ({ children }: ProviderProps) => {
  const [products, setProducts] = useState<any[]>([]);
  const [order, setOrder] = useState<CheckoutCaptureResponse>(
    {} as CheckoutCaptureResponse
  );
  const [errorMsg, setErrorMessage] = useState("");
  const [checkoutToken, setCheckoutToken] = useState<CheckoutToken>(
    {} as CheckoutToken
  );

  async function purchase(id: string) {
    try {
      const token = await commerce.checkout.generateTokenFrom("product_id", id);
      setCheckoutToken(token);
      console.log("Checkout Token: ", token);
    } catch (error) {
      console.log("Failed to genarate token! :", error);
    }
  }

  async function handleCaptureCheckout(
    checkoutTokenId: string,
    newOrder: CheckoutCapture
  ) {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );

      setOrder(incomingOrder);
    } catch (error) {
      setErrorMessage("An error occured on Capture!");
      console.log("An error occured on Capture!", error);
    }
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await commerce.products.list();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <ScootersContext.Provider
      value={{
        products,
        handleCaptureCheckout,
        purchase,
        order,
        checkoutToken,
      }}
    >
      {children}
    </ScootersContext.Provider>
  );
};
