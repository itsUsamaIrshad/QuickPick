import React from 'react'
import Title from '../components/Title'
import { assets } from '../assests/assets/frontend_assets/assets'

const Contact = () => {
  return (
    <>
    <div className=' px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>

    <div>

<div className="text-center text-2xl pt-10 border-t">
  <Title text1={'CONTACT'} text2={'US'} />
</div>

<div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
  <img src={assets.contact_img} className='w-full md:max-w-[480px]' alt="img" />
  <div className="flex flex-col justify-center items-start gap-6">
    <p className=' font-semibold text-xl text-gray-600'>Our Store</p>
    <p className=' text-gray-500'>kohinnor ity 1 <br />Faisalabad, Pakistan</p>
    <p className=' text-gray-500'>Tel: (03016613599) <br /> Email: admin@gmail.com</p>
    <p className=' font-semibold text-xl text-gray-600'>Careers at Forever</p>
    <p className=' text-gray-500'>Learn more about our team and job openings</p>
    <button className=' border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
  </div>
</div>

    </div>
    
    </div>
    
    
    
    
    
    
    </>
  )
}

export default Contact