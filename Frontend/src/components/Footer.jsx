import React from 'react'
import { assets } from '../assests/assets/frontend_assets/assets'

const Footer = () => {


    const date = new Date().getFullYear()


  return (
    <>
    

<div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">

<div>
    <img src={assets.logo} className='mb-5 w-32' alt="" />
    <p className='w-full md:w-2/3 text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos dolor autem mollitia necessitatibus dolorum.</p>
</div>

<div>
    <p className=' text-xl font-medium mb-5'>COMPANY</p>
    <ul className=' flex flex-col gap-1 text-gray-600'>
        <li>Home</li>
        <li>About Us</li>
        <li>Delivery</li>
        <li>Privacy Policy</li>
    </ul>
</div>

<div>
    <p className=' text-xl font-medium mb-5'>GET IN TOUCH</p>
    <ul className=' flex flex-col gap-1 text-gray-600'>
        <li>+92-301-66-599</li>
        <li>usamairshad9192@gmail.com</li>
    </ul>
</div>


</div>
<div>
    <hr />
    <p className=' py-5 text-sm text-center'>Copyright {date}@ forever.com - All Right Reserved</p>
</div>


    
    </>
  )
}

export default Footer