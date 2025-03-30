import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import {  Heart, Share2, Star, Truck, Check, Shield } from 'lucide-react'
import RelatedProducts from './RelatedProduct'

const Product = () => {
  const { productId } = useParams()
  const { products, currency, addToCart } = useContext(ShopContext)
  const [productData, setProductData] = useState(null)
  const [mainImage, setMainImage] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [isWishlisted, setIsWishlisted] = useState(false)

  useEffect(() => {
    const product = products.find(item => item._id === productId)
    if (product) {
      setProductData(product)
      setMainImage(product.image[0])
    }
  }, [productId, products])

  if (!productData) return <div className="min-h-screen"></div>

  return (
    <div className="bg-white">
      {/* Breadcrumb Navigation */}
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center text-sm text-gray-500">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to={`/category/${productData.category}`} className="hover:text-primary">
            {productData.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{productData.name}</span>
        </div>
      </nav>

      {/* Main Product Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          {/* Image Gallery */}
          <div className="mb-8 lg:mb-0">
            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-50 mb-4">
              <img
                src={mainImage}
                alt={productData.name}
                className="h-full w-full object-contain transition-opacity duration-300"
              />
              <div className="absolute top-4 right-4 flex space-x-2">
                <button 
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-2 rounded-full backdrop-blur-sm ${isWishlisted ? 'text-red-500' : 'text-gray-700 bg-white/80'}`}
                >
                  <Heart className="h-5 w-5" fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>
                <button className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-700">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-3">
              {productData.image.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(img)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 ${mainImage === img ? 'border-primary' : 'border-transparent'}`}
                >
                  <img
                    src={img}
                    alt={`${productData.name} thumbnail ${index}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{productData.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="h-5 w-5" 
                    fill={i < 4 ? 'currentColor' : 'none'} 
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-500">(122 reviews)</span>
            </div>

            <div className="mb-6">
              <span className="text-3xl font-bold text-gray-900">
                {currency}{productData.price.toLocaleString()}
              </span>
              {productData.oldPrice && (
                <span className="ml-2 text-lg text-gray-400 line-through">
                  {currency}{productData.oldPrice.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-gray-700 mb-8">{productData.description}</p>

            {/* Size Selection */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Select Size</h3>
              <div className="flex flex-wrap gap-2">
                {productData.sizes.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${selectedSize === size ? 'border-primary bg-primary/10 text-primary' : 'border-gray-300 hover:border-gray-400'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="mb-8">
              <div className="flex items-center space-x-6">
                <div className="flex items-center border rounded-md">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:text-gray-900"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 border-x">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:text-gray-900"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => addToCart(productData._id, selectedSize, quantity)}
                  disabled={!selectedSize}
                  className={`flex-1 py-3 px-6 rounded-md font-medium text-white transition-colors ${!selectedSize ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'}`}
                >
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Delivery & Returns */}
            <div className="border-t border-b border-gray-200 py-6 mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-700">Free shipping</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-700">100% Original</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-700">7-day returns</span>
                </div>
              </div>
            </div>

            {/* Product Meta */}
            <div className="text-sm text-gray-500 space-y-1">
              <p>Category: <span className="text-gray-900">{productData.category}</span></p>
              <p>SKU: <span className="text-gray-900">{productData._id.slice(0, 8)}</span></p>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('description')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'description' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'reviews' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                Reviews (122)
              </button>
            </nav>
          </div>
          <div className="py-8">
            {activeTab === 'description' ? (
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque, maiores ducimus quod corrupti harum explicabo delectus veritatis earum in optio quia nam eveniet laboriosam providen Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                </p>
                <p className="text-gray-700">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem eveniet nulla quod mollitia quos ipsum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit atque itaque repellat non!
                </p>
              </div>
            ) : (
              <div className="text-gray-700">
                {/* Reviews content would go here */}
                <p>Reviews section coming soon</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <RelatedProducts 
          category={productData.category} 
          subCategory={productData.subCategory} 
          currentProductId={productData._id}
        />
      </div>
    </div>
  )
}

export default Product