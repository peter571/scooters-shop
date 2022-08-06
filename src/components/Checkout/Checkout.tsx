import React from 'react'
import pic1 from "../../scooters/vespa-no-bg.png";
import pic2 from "../../scooters/vespa1-no-bg.png";
import pic3 from "../../scooters/vespa2-no-bg.png";
import CarouselImages from '../Home/CarouselImages';

export default function Checkout() {
  return (
    <div className='flex flex-row justify-center align-middle items-center h-screen'>
        <div className='w-[50%]'>
        <CarouselImages images={[pic1, pic2, pic3]} />
        </div>
        <div>
            stripe
        </div>
    </div>
  )
}
