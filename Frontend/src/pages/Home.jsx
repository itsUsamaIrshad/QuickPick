import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import Bestseller from '../components/Bestseller'
import OurPolicy from '../components/OurPolicy'
import NewsLetter from '../components/NewsLetter'

const Home = () => {
  return (
    <>
    
    
    <Hero/>
    <div className=' px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
    <LatestCollection/>
    <Bestseller/>
    <OurPolicy/>
    <NewsLetter/>
    </div>
    </>
  )
}

export default Home