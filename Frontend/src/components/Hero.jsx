import React, { useEffect, useState } from 'react'
import { assets } from '../assests/assets/frontend_assets/assets'
import 'swiper/css';
const Hero = () => {


  const [visible , setVisible] = useState(window.innerWidth<768)

  const handleResize = () =>
  {
    setVisible(window.innerWidth<768)
  }

  useEffect(()=>
  {

    window.addEventListener('resize' , handleResize)
    return () => window.removeEventListener('resize' , handleResize)

    
  },[])

  return (
    <>

    {!visible && 
    
    <div className="w-full h-[100vh] bg-cover bg-no-repeat bg-top flex items-center justify-between" 
     style={{ backgroundImage: `url(${assets.hero})` }}>  
</div>
    }

{visible &&

<div className="w-full h-[100vh] bg-cover bg-no-repeat bg-top flex items-center justify-between" 
     style={{ backgroundImage: `url(${assets.heroMobile})` }}>  
</div>
}

    </>
  )
}

export default Hero