import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assests/assets/frontend_assets/assets'
import RelatedProduct from './RelatedProduct'

const Product = () => {
  

  const {productId} = useParams()
  const {products , currency ,  addToCart} = useContext(ShopContext)
  const [productData , setProductData] = useState(null)
  const [image , setImage] = useState('')
   const [size ,  setSizes] = useState('')

 


  const fetchProductData = () =>
  {
    products.map((item)=>
    {
      if(item._id === productId)
      {
        setProductData(item)
        //  console.log(productData)
        setImage(item.image[0])
        return 
      }
    })
  }

  console.log(productData)


  useEffect(()=>
  {
    fetchProductData()
  },[productId , products])


  return productData ? (
    <>
    <div className=' px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>

    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">

{/* Product Data */}

<div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
  <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
    {productData.image.map((item , index)=>(
      <img src={item} key={index} className=' w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' onClick={()=>setImage(item)}/>
    ))}
  </div>
  
  <div className=' w-full sm:w-[80%]'>
    <img src={image} className='w-full h-auto' alt="" />
  </div>

<div>
  <h1 className=' font-medium text-2xl mt-2'>{productData.name}</h1>
  <div className="flex items-center gap-1 mt-2">
    <img src={assets.star_icon} className='w-3 5' alt="" />
    <img src={assets.star_icon} className='w-3 5' alt="" />
    <img src={assets.star_icon} className='w-3 5' alt="" />
    <img src={assets.star_icon} className='w-3 5' alt="" />
    <img src={assets.star_dull_icon} className='w-3 5' alt="" />
    <p className=' pl-2'>(122)</p>
  </div>
  <p className="mt-3 text-3xl font-medium">{currency}{productData.price}</p>
  <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
  <div className="flex flex-col gap-4 my-8">
    <p>Select Sizes</p>
    <div className=' flex gap-2'>
      {productData.sizes.map((item , index)=>
      (
        <button key={index} onClick={()=>setSizes(item)} className={` border py-2 px-4 bg-gray-100 ${item===size ? 'border-orange-500':''} `}>{item}</button>
      ))}
    </div>
  </div>
  <button className=' bg-black text-white px-8 py-3 text-sm active:bg-gray-700' onClick={()=>addToCart(productData._id,size)}>ADD TO CART</button>


  
  <hr  className=' mt-8 sm:w-4/5'/>
  <div className="text-sm text-gray-500 mt-5 flex-col gap-1">
    <p>100% Original product.</p>
    <p>Cash on delivery is available on this product</p>
    <p>Easy Return and exchange policy wihtin 7 days.</p>
  </div>
</div>

    </div>

    {/* Description and Review Section */}
    <div className="mt-20">
      <div className="flex">
        <b className="border px-5 py-3 text-sm">Description</b>
        <p className="border px-5 py-3 text-sm">Review (122)</p>
      </div>
      <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque, maiores ducimus quod corrupti harum explicabo delectus veritatis earum in optio quia nam eveniet laboriosam providen Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas perferendis veritatis harum amet culpa voluptatum numquam vero neque, maiores veniam blanditiis consequuntur, consectetur voluptatem facilis.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem eveniet nulla quod mollitia quos ipsum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit atque itaque repellat non! Cum voluptas dolore ea minus iste officiis perspiciatis quas dolorum accusamus sunt.</p>
      </div>
    </div>

    {/* Display related Product */}

    <RelatedProduct category={productData.category} subCategory={productData.subCategory} />
    
      </div>
      </div>
    </>
  )
  : <div className=' opacity-0'></div>
}

export default Product


