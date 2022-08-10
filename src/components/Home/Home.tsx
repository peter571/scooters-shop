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
    </div>
  );
}

const styles = {
  homeWrapper: "flex h-screen justify-evenly align-middle items-center",
};
