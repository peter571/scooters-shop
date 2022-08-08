import { Cart } from "@chec/commerce.js/types/cart";
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
  cart: Cart;
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
  const [cart, setCart] = useState<Cart>({} as Cart);
  const [order, setOrder] = useState<CheckoutCaptureResponse>(
    {} as CheckoutCaptureResponse
  );
  const [errorMsg, setErrorMessage] = useState("");
  const [checkoutToken, setCheckoutToken] = useState<CheckoutToken>({} as CheckoutToken);

  async function refreshCart() {
    const item = await commerce.cart.refresh();
    setCart(item);
  }

  async function purchase(id: string) {
    await commerce.cart.add(id, 1);
    await refreshCart();
    const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
    setCheckoutToken(token);
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
      await refreshCart();
    } catch (error) {
      setErrorMessage("An error occured!");
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
      value={{ products, handleCaptureCheckout, purchase, cart, order, checkoutToken }}
    >
      {children}
    </ScootersContext.Provider>
  );
};
