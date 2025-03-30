import React from 'react'
import Title from '../components/Title'
import { assets } from '../assests/assets/frontend_assets/assets'
import NewsLetter from '../components/NewsLetter'

export const About = () => {

  return (
    <>

<div className=' px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>

  <div>
    
    <div className="text-2xl text-center border-t pt-8">
      <Title text1={'ABOUT'} text2={'US'} />
    </div>

    <div className="my-10 flex flex-col md:flex-row gap-16">
      <img src={assets.about_img} className=' w-full md:max-w-[450px]' alt='img' />
      <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
      <p>Forever was born out of a passion for innovation and a desire to revolation Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima odio perspiciatis quia earum. Corporis suscipit, harum aspernatur similique debitis cumque.</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio vel ipsam sapiente dolor consectetur porro est delectus cupiditate quasi dolores? Soluta ut dicta quia nulla voluptas accusantium, distinctio magnam veniam.</p>
      <b className=' text-gray-800'>Our Mission</b>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut pariatur corporis rem, doloribus molestias repellendus delectus culpa nemo aliquam debitis illum id rerum! Fuga natus architecto dolor placeat optio dolorum.</p>
      </div>
    </div>
<div className="text-xl py-4">
  <Title text1={'WHY'} text2={'CHOOSE US'}/>
</div>
    
    <div className="flex flex-col md:flex-row text-sm mb-20">
      <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
        <b>Quality Assurance</b>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique repellat iusto quia modi libero inventore ducimus dolorem eaque earum reprehenderit! Nihil exercitationem consequuntur excepturi quisquam vel inventore ipsam eveniet veniam.</p>
      </div>
      <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
        <b>Convenience:</b>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique repellat iusto quia modi libero inventore ducimus dolorem eaque earum reprehenderit! Nihil exercitationem consequuntur excepturi quisquam vel inventore ipsam eveniet veniam.</p>
      </div>
      <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
        <b>Exception Customer Service:</b>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique repellat iusto quia modi libero inventore ducimus dolorem eaque earum reprehenderit! Nihil exercitationem consequuntur excepturi quisquam vel inventore ipsam eveniet veniam.</p>
      </div>
    </div>

    <NewsLetter/>

    </div>  
      
</div>
    
    
    
    
    
    
    </>
  )
}
