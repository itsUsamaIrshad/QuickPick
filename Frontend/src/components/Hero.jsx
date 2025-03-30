import React, { useEffect, useState } from 'react'
import { assets } from '../assests/assets/frontend_assets/assets'
import { Link } from 'react-router-dom'

const Hero = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="relative w-full h-[100vh] overflow-hidden">
      {/* Background for larger screens */}
      {!isMobile && (
        <div 
          className="absolute inset-0 bg-cover bg-no-repeat bg-center"
          style={{ backgroundImage: `url(${assets.hero})` }}
        ></div>
      )}

      {/* Image tag for mobile screens (below 768px) */}
      {isMobile && (
        <img
          src={assets.hero}
          alt="Hero banner"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
      )}

      {/* Optional content overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/10">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Discover Our Collection</h1>
          <p className="text-lg md:text-xl mb-8">Premium quality for your everyday life</p>
          <Link to={'/collection'} className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Hero