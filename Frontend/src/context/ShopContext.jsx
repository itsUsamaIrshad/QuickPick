import React, { createContext, useEffect, useState } from 'react'
// import { products } from '../assests/assets/frontend_assets/assets';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export const ShopContext = createContext()



const ShopContextProvider = (props) => {
  
  
  const backend_Url = import.meta.env.VITE_BACKEND_URL;
  const currency = '$';
  const delivery_fee = 10;
  const [search , setSearch] = useState('')
  const [showSearch , setShowSearch] = useState(false)
  const [cartItems , setCartItems] = useState({})
  const [products , setProducts] = useState([])
  const [token , setToken] = useState('')
  
  const navigate = useNavigate()


const addToCart = async (itemId, size) => {

  if (!size) {
    toast.error("Please Select Size");
    return;
  }

  if (!token) {  
    toast.error("You need to log in to add items to cart!");
    return;
  }

  let cartData = structuredClone(cartItems);

  if (cartData[itemId]) {
    if (cartData[itemId][size]) {
      cartData[itemId][size] += 1;
    } else {
      cartData[itemId][size] = 1;
    }
  } else {
    cartData[itemId] = {};
    cartData[itemId][size] = 1;
  }



 
  setCartItems(cartData);




  if(token)
    {
      try {
    
        await axios.post(`${backend_Url}/api/cart/add`, { itemId, size }, { headers: { token } });

        
    

      } 
      catch (error) {
    
        console.error(error)
        toast.error(error.message)
        
      }
    }
};


const getCartCount = () =>
{
  let totalCount = 0;
  for(const items in cartItems)
  {
    for(const item in cartItems[items])
    {
      try
      {
        if(cartItems[items][item]>0)
        {
          totalCount += cartItems[items][item]
          // console.log(totalCount)
        }
      }
      catch(error)
      {

        console.error(error)
      }
    }
  }
  return totalCount;
}




const updateQuantity = async(itemId , size , quantity) =>
{

  let cartData = structuredClone(cartItems);

  cartData[itemId][size] = quantity

  
  setCartItems(cartData)

    if(token)
    {
      try {
    
      

        await axios.post(`${backend_Url}/api/cart/update`, { itemId , size , quantity }, { headers: { token } });
        
      } 
      catch (error) {
    
        console.error(error)
        toast.error(error.message)
        
      }
    }
}



const getCartAmount = () =>
{

  let totalAmount = 0;
  for(const items in cartItems)
  {
    let itemInfo = products.find((product)=>product._id===items)
  
    for(const item in cartItems[items])
    {
      try{
        if(cartItems[items][item]>0)
        {
          totalAmount += itemInfo.price * cartItems[items][item]
        }
       
      }
      catch(error){

        console.error(error)
      }
    }
  }
  return totalAmount;
}


const getProductData = async() =>
{

  try {

    const response = await  axios.get(backend_Url+'/api/product/list')

    console.log(response.data.products)
    if(response.data.success)
    {
     setProducts(response.data.products)
    }
    else
    {
      toast.error(response.data.message)
    }
    
  } 
  
  catch (error) {

    console.log(error)
    toast.error(error.message)
    
  }
}


const getUserCart =  async(token) =>
{
  try {

    const response = await axios.post(`${backend_Url}/api/cart/get`, {} , {headers:{token}})

    if( response.data.success)
    {
      setCartItems(response.data.cartData)
    }
    else
    {
      console.error(error)
      toast.error(error.message)
    }
    
  } 
  
  catch (error) {
    
  }

}

useEffect(()=>
{
  if(!token && localStorage.getItem('token'))
  {
    setToken(localStorage.getItem('token'))
    getUserCart(localStorage.getItem('token'))
  }

},[])


useEffect(()=>
{
  getProductData()
},[])


    const value = {currency,delivery_fee,products,search,setSearch,showSearch, setShowSearch,cartItems,setCartItems , addToCart , getCartCount , getCartAmount, updateQuantity , navigate , backend_Url , token, setToken }



 
  return (
    <ShopContext.Provider value={value}>

{props.children}

    </ShopContext.Provider>
  )
}

export default ShopContextProvider;