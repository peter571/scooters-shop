import React, { useContext } from "react";
import { ScootersContext } from "../../context/ScootersContext";
import RideCard from "../RideCard/RideCard";

export default function Scooters() {
  const { products } = useContext(ScootersContext);
  console.log(products[0]);
  return (
    <div className="p-5 flex flex-wrap gap-8 h-screen overflow-y-scroll">
      {products.map((item) => {
        if (Number(item.attributes[0].value) === 0) {
          return (
            <RideCard
              key={item.id}
              id={item.id}
              price={item.price.formatted_with_symbol}
              description={item.description}
              imgUrl={item.image.url}
              name={item.name}
            />
          );
        }
      })}
    </div>
  );
}
