// import React, { useState } from 'react'
// import assets from '../assets/assets'
// import axios from 'axios'
// import { backendUrl } from '../App'
// import { toast } from 'react-toastify'


// const Add = ({token}) => {

//   const [image1, setImage1] = useState(false)
//   const [image2, setImage2] = useState(false)
//   const [image3, setImage3] = useState(false)
//   const [image4, setImage4] = useState(false)

//   const [name , setName] = useState()
//   const [description , setDescription] = useState()
//   const [price, setPrice]= useState(false)
//   const [category , setCategory]= useState('Men')
//   // const [subCategory , setSubCategory] = useState('Topwear')
//   const [bestSeller , setBestSeller] = useState(false)
//   const [sizes , setSizes] = useState([])

 
  
//   const onSubmitHandler = async (e) =>
//   {
//     e.preventDefault();

//     try {

//       const formData = new FormData()

//       formData.append('name', name)
//       formData.append('description', description)
//       formData.append('price', price)
//       formData.append('category', category)
//       // formData.append('subCategory', subCategory)
//       formData.append('bestSeller', bestSeller)
//       formData.append('sizes', JSON.stringify(sizes))

//       image1 && formData.append('image1', image1)
//       image2 && formData.append('image2', image2)
//       image3 && formData.append('image3', image3)
//       image4 && formData.append('image4', image4)


//      const response = await  axios.post(backendUrl+"/api/product/add" , 
//       formData,{headers:{token}})

//      console.log(response.data)

//      if(response.data.success)
//      {
//       toast.success(response.data.message)
//       setName('')
//       setDescription('')
//       setImage1(false)
//       setImage2(false)
//       setImage3(false)
//       setImage4(false)
//       setPrice('')
//      }
//      else
//      {
//       toast.error(response.data.message)
//      }

//     } 
//     catch (error) {
//       console.error(error)
//       toast.error(error.message)
      
//     }


//   }



//   return (
//     <>

// <form className=' flex flex-col items-start w-full gap-3' onSubmit={onSubmitHandler}>
//   <div>

//   <p className=' mb-2'>Upload Image</p>
//   <div className=' flex gap-2'>
//     <label htmlFor="image1">

//     <img  src={!image1? assets.upload_area: URL.createObjectURL(image1)} className=' w-20' alt="" />
//     <input onChange={(e)=>setImage1(e.target.files[0])} type="file" name="" id="image1" hidden />
//     </label>

// <label htmlFor="image2">

// <img  src={!image2? assets.upload_area: URL.createObjectURL(image2)} alt="" className=' w-20' />
// <input  onChange={(e)=>setImage2(e.target.files[0])} type="file" name="" id="image2" hidden />
// </label>
// <label htmlFor="image3">

// <img  src={!image3? assets.upload_area: URL.createObjectURL(image3)} alt="" className=' w-20'/>
// <input onChange={(e)=>setImage3(e.target.files[0])} type="file" name="" id="image3" hidden />
// </label>

// <label htmlFor="image4">

// <img  src={!image4? assets.upload_area: URL.createObjectURL(image4)} alt="" className=' w-20'/>
// <input  onChange={(e)=>setImage4(e.target.files[0])} type="file" name="" id="image4" hidden />
// </label>
//   </div>
//   </div>
//   <div className=' w-full'>
//     <p className='mb-2'>Product Name</p>
//     <input type="text" placeholder='Product Name' name="" id="" className=' w-full max-w-[500px] px-3 py-2' onChange={(e)=>setName(e.target.value)} value={name} />
//   </div>

//   <div className=' w-full'>
//     <p className='mb-2'>Product Description</p>
//     <textarea type="text" placeholder='Write Description' name="" id="" className=' w-full max-w-[500px] px-3 py-2' onChange={(e)=>setDescription(e.target.value)} value={description} />
//   </div>

// <div className=' flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
//   <div>
//     <p className=' mb-2'>Product Category</p>
//     <select onChange={(e)=>setCategory(e.target.value)} >
//       <option value="Men">Men</option>
//       <option value="Women">Women</option>
//       <option value="Kids">Kids</option>
//     </select>
//   </div>

//   {/* <div>
//     <p className=' mb-2'>Product SubCategory</p>
//     <select onChange={(e)=>setSubCategory(e.target.value)}>
//       <option value="TopWear">TopWear</option>
//       <option value="BottomWear">BottomWear</option>
//       <option value="WinterWear">WinterWear</option>
//     </select>
//   </div> */}
//   <div>
//     <p className=' mb-2'>Product price</p>
//     <input type="number" className=' w-full px-3 py-2 sm:w-[120px]' onChange={(e)=>setPrice(e.target.value)} value={price} placeholder='25' />
//   </div>
// </div>

// <div>
//   <p className=' mb-2'>Product Sizes</p>
//   <div className=' flex gap-2'>
//     <div onClick={()=>setSizes(prev => prev.includes("S")? prev.filter(item => item !== "S"):[...prev,"S"])}>
//       <p className={` ${sizes.includes("S") ? ' bg-blue-200': ' bg-slate-300'} px-3 py-1 cursor-pointer`}>S</p>
//     </div>
//     <div onClick={()=>setSizes(prev => prev.includes("M")? prev.filter(item => item !== "M"):[...prev,"M"])}>
//       <p className={` ${sizes.includes("M") ? ' bg-blue-200': ' bg-slate-300'} px-3 py-1 cursor-pointer`}>M</p>
//     </div>
//     <div onClick={()=>setSizes(prev => prev.includes("L")? prev.filter(item => item !== "L"):[...prev,"L"])}>
//       <p className={` ${sizes.includes("L") ? ' bg-blue-200': ' bg-slate-300'} px-3 py-1 cursor-pointer`}>L</p>
//     </div>
//     <div onClick={()=>setSizes(prev => prev.includes("XL")? prev.filter(item => item !== "XL"):[...prev,"XL"])}>
//       <p className={` ${sizes.includes("XL") ? ' bg-blue-200': ' bg-slate-300'} px-3 py-1 cursor-pointer`}>XL</p>
//     </div>
//     <div onClick={()=>setSizes(prev => prev.includes("XXL")? prev.filter(item => item !== "XXL"):[...prev,"XXL"])}>
//       <p className={` ${sizes.includes("XXL") ? ' bg-blue-200': ' bg-slate-300'} px-3 py-1 cursor-pointer`}>XXL</p>
//     </div>
//   </div>
// </div>
// <div className=' flex gap-2 mt-2'>
//   <input type="checkbox" id='bestSeller' onChange={()=>setBestSeller(prev => !prev)}  checked={bestSeller}/>
//   <label htmlFor="bestSeller" className=' cursor-pointer'>Add to bestSeller</label>
// </div>
// <button className=' w-28 py-3 mt-4 bg-black text-white'>Add</button>
//   </form>  

    
    
//     </>
//   )
// }

// export default Add


import React, { useState } from 'react'
import assets from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { Upload, X, Check, ChevronDown } from 'lucide-react'

const Add = ({ token }) => {
  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null
  })
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Men')
  const [bestSeller, setBestSeller] = useState(false)
  const [sizes, setSizes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)

  const categories = ['Men', 'Women', 'Kids']

  const handleImageChange = (e, imageKey) => {
    const file = e.target.files[0]
    if (file) {
      setImages(prev => ({ ...prev, [imageKey]: file }))
    }
  }

  const removeImage = (imageKey) => {
    setImages(prev => ({ ...prev, [imageKey]: null }))
  }

  const toggleSize = (size) => {
    setSizes(prev => 
      prev.includes(size) 
        ? prev.filter(item => item !== size)
        : [...prev, size]
    )
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('description', description)
      formData.append('price', price)
      formData.append('category', category)
      formData.append('bestSeller', bestSeller)
      formData.append('sizes', JSON.stringify(sizes))

      Object.entries(images).forEach(([key, value]) => {
        if (value) formData.append(key, value)
      })

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: { token }
      })

      if (response.data.success) {
        toast.success(response.data.message)
        // Reset form
        setName('')
        setDescription('')
        setPrice('')
        setImages({
          image1: null,
          image2: null,
          image3: null,
          image4: null
        })
        setSizes([])
        setBestSeller(false)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Add New Product</h1>
      
      <form onSubmit={onSubmitHandler} className="space-y-6">
        {/* Image Upload Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Images (Upload up to 4 images)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((num) => {
              const imageKey = `image${num}`
              const image = images[imageKey]
              return (
                <div key={num} className="relative">
                  <label
                    htmlFor={imageKey}
                    className={`flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-lg cursor-pointer ${
                      image ? 'border-transparent' : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {image ? (
                      <>
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Preview ${num}`}
                          className="h-full w-full object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeImage(imageKey)
                          }}
                          className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                        >
                          <X className="h-4 w-4 text-gray-600" />
                        </button>
                      </>
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">Image {num}</span>
                      </>
                    )}
                  </label>
                  <input
                    id={imageKey}
                    type="file"
                    onChange={(e) => handleImageChange(e, imageKey)}
                    className="hidden"
                    accept="image/*"
                  />
                </div>
              )
            })}
          </div>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-primary focus:border-primary"
              placeholder="Enter product name"
              required
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full pl-8 px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-primary focus:border-primary"
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-primary focus:border-primary"
              placeholder="Detailed product description..."
              required
            />
          </div>
        </div>

        {/* Category and Sizes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="w-full flex justify-between items-center px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-1 focus:ring-primary focus:border-primary"
              >
                <span>{category}</span>
                <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
              </button>
              {isCategoryOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 border border-gray-200">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setCategory(cat)
                        setIsCategoryOpen(false)
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        category === cat ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Available Sizes
            </label>
            <div className="flex flex-wrap gap-2">
              {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    sizes.includes(size)
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Best Seller */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="bestSeller"
            checked={bestSeller}
            onChange={() => setBestSeller(!bestSeller)}
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label htmlFor="bestSeller" className="ml-2 block text-sm text-gray-700">
            Mark as Best Seller
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full md:w-auto px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              'Add Product'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Add