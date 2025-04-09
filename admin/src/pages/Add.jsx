
import React, { useState } from 'react'
import { Upload, X, ChevronDown } from 'lucide-react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

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
  const [subCategory, setSubCategory] = useState('TopWear')
  const [bestSeller, setBestSeller] = useState(false)
  const [sizes, setSizes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false)

  const categories = ['Men', 'Women', 'Kids']
  const subCategories = ['TopWear', 'BottomWear', 'WinterWear']
    
  

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
      formData.append('subCategory', subCategory)
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

        {/* Category, Subcategory and Sizes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Category Dropdown */}
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
                        setSubCategory(subCategories[cat][0]) // Reset subcategory when category changes
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

          {/* Subcategory Dropdown */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subcategory
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsSubCategoryOpen(!isSubCategoryOpen)}
                className="w-full flex justify-between items-center px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-1 focus:ring-primary focus:border-primary"
              >
                <span>{subCategory}</span>
                <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isSubCategoryOpen ? 'rotate-180' : ''}`} />
              </button>
              {isSubCategoryOpen && (
  <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 border border-gray-200 max-h-60 overflow-y-auto">
    {subCategories.map((subCat) => (
      <button
        key={subCat}
        type="button"
        onClick={() => {
          setSubCategory(subCat);
          setIsSubCategoryOpen(false);
        }}
        className={`block w-full text-left px-4 py-2 text-sm ${
          subCategory === subCat ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        {subCat}
      </button>
    ))}
  </div>
)}
            </div>
          </div>

          {/* Sizes Selection */}
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
            className={`w-full md:w-auto px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-black hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
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