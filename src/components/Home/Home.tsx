import React from "react";
import Card from "./Card";
import CarouselImages from "./CarouselImages";
import pic1 from "../../scooters/vespa-no-bg.png";
import pic2 from "../../scooters/vespa1-no-bg.png";

export default function Home() {
  return (
    <div className={styles.homeWrapper}>
      <CarouselImages images={[pic1, pic2]} />
      <Card />
      <h1 className="absolute font-extrabold text-2xl top-1">Scooters and Bikes</h1>
    </div>
  );
}

const styles = {
  homeWrapper: "relative flex flex-col sm:flex-row min-h-screen justify-evenly align-middle items-center bg-gradient-to-r from-[#DEDEDE] to-pink-500",
};
