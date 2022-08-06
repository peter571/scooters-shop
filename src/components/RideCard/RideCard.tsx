import React from 'react'
import { BiPurchaseTag } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom';
import pic from '../../scooters/vespa-no-bg.png'

export default function RideCard() {
    const navigate = useNavigate();
    
  return (
    <div className='shadow-lg p-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'>
        <img className='object-contain w-96 h-48' src={pic} alt="pic" />
        <hr />
        <div className='flex justify-between flex-row mt-2'>
            <h1 className='font-bold'>$3,999</h1>
            <button onClick={() => navigate('/checkout')} className='px-3 py-1 bg-yellow-500 flex flex-row rounded-2xl align-middle items-center mr-1'>Purchase
            <BiPurchaseTag size={14} />
            </button>
        </div>
        <p className='font-light text-sm text-ellipsis whitespace-nowrap overflow-hidden my-3'>Vespa Scooter Vespa Scooter Vespa Scooter Vespa Scooter Vespa Scooter s</p>
    </div>
  )
}
