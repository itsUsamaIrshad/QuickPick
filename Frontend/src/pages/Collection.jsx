import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assests/assets/frontend_assets/assets'
import Title from '../components/Title'
import ProductItems from '../components/ProductItems'

const Collection = () => {



  const {products , search , showSearch} = useContext(ShopContext)
  const [showFilter , setShowFilter] = useState(false)
  const [filterProduct , setFilterProduct] = useState([])
  const [category , setCategory] = useState([])
   const [SubCategory , setSubCategory] = useState([])
const [sortType, setSortType] = useState('relevant')
  
  
  const toggleCategory = (e)=>
  {
    if(category.includes(e.target.value))
    {
      setCategory(prev=>prev.filter(item => item !== e.target.value))
    }
    else
    {
      setCategory(prev=>[...prev,e.target.value])
    }
  }

  const SubToggleCategory = (e)=>
    {
      if(SubCategory.includes(e.target.value))
      {
        setSubCategory(prev=>prev.filter(item => item !== e.target.value))
      }
      else
      {
        setSubCategory(prev=>[...prev,e.target.value])
      }
    }

  

const applyFilter = () =>
{
  let productsCopy = products.slice()

  if(showSearch && search)
  {
    productsCopy = productsCopy.filter(item=> item.name.toLowerCase().includes(search.toLowerCase()))
  }

  if(category.length>0)
  {
    productsCopy = productsCopy.filter(item=>category.includes(item.category))
  }
  
  if(SubCategory.length > 0)
    {
      productsCopy = productsCopy.filter((item) => SubCategory.includes(item.subCategory))
    }
    setFilterProduct(productsCopy)
}

  


  const sortProduct = () =>
  {
    let fpCopy = filterProduct.slice();
    
    switch(sortType)
    {
      case 'low-high':
        setFilterProduct(fpCopy.sort((a,b)=>(a.price - b.price)));
     break

        case 'high-low':
        setFilterProduct(fpCopy.sort((a,b)=>(b.price - a.price)));
     break

default:
applyFilter()
break
    }
  }


  useEffect(()=>
  {
    applyFilter()
    
  },[category , SubCategory , search , showSearch , products])
  


  useEffect(()=>
  {
   sortProduct()
  },[sortType])
  

  return (
    <>
    <div className=' px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>

    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      
{/* {filter option} */}

<div className="min-w-60 ">
  <p className="my-2 text-xl flex items-center cursor-pointer gap-2" onClick={()=>setShowFilter(!showFilter)}>FILTERS <img src={assets.dropdown_icon} className={` h-3 sm:hidden ${showFilter?' rotate-180':''}`}  /></p>

{/* Category Filter */}

<div className={` border border-gray-300 pl-5   py-3 mt-6 ${showFilter?'':'hidden'} sm:block`}>
<p className=' mb-3 text-sm font-medium'>CATEGORIES </p>
<div className="flex flex-col gap-2 text-sm font-light text-gray-700">
  <p className="flex gap-2">
    <input type="checkbox" className='w-3' value={'Men'} onChange={toggleCategory} />  Men
  </p>
  <p className="flex gap-2">
    <input type="checkbox" className='w-3' value={'Women'} onChange={toggleCategory}/>Women
  </p>
  <p className="flex gap-2">
    <input type="checkbox" className='w-3' value={'Kids'} onChange={toggleCategory} />Kids
  </p>
</div>

</div>




 <div className={` border border-gray-300 pl-5   py-3 mt-6 ${showFilter?'':'hidden'} sm:block`}>
<p className=' mb-3 text-sm font-medium'>Type
  
</p>
<div className="flex flex-col gap-2 text-sm font-light text-gray-700">
  <p className="flex gap-2">
    <input type="checkbox" className='w-3' value={'TopWear'}  onChange={SubToggleCategory}/>Topwear
  </p>
  <p className="flex gap-2">
    <input type="checkbox" className='w-3' value={'BottomWear'} onChange={SubToggleCategory}/>Bottomwear
  </p>
  <p className="flex gap-2">
    <input type="checkbox" className='w-3' value={'WinterWear'} onChange={SubToggleCategory} />Winterwear
  </p>
</div>

</div> 

</div>


<div className="flex-1">
  <div className="flex justify-between text-base sm:text-2xl mb-4">
    <Title text1={'All'} text2={'COLLECTION'}/>

    <select className='border border-gray-300 text-sm px-2' onChange={(e)=>setSortType(e.target.value)}>
      <option value="relavent">Sort by: Relavent</option>
      <option value="low-high">Sort by: Low to High</option>
      <option value="high-low">Sort by: High to Low</option>
    </select>
  </div>
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 gap-y-6">

{filterProduct.map((item , index)=>
(

  <ProductItems key={index} name={item.name} id={item._id} price={item.price} image={item.image} />


))}

  </div>
    </div>
</div>


    
    
    
    </div>
    </>
  )
}

export default Collection