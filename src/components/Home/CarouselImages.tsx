import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarouselCard from "./CarouselCard";

interface CouraselImagesProp {
  images: any[]
}

function CarouselImages(props: CouraselImagesProp) {
  const settings = {
    infinite: true,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false
  };

  return (
    <div className="w-full sm:w-[50%]">
      <Slider {...settings}>
       {props.images.map((item, index) => <CarouselCard key={index} image={item} />)}
      </Slider>
    </div>
  );
}

export default CarouselImages;
