import React from "react";

interface CarouselCardProp {
  image: string;
}

export default function CarouselCard(props: CarouselCardProp) {
  return (
    <img src={props.image} className="w-[70%] h-screen object-contain m-auto" alt="pic 1" />
  );
}
