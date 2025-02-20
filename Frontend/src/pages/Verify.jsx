import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useEffect } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useSearchParams } from 'react-router-dom';

const Verify = () => {


    const {navigate , token , setCartItems , backend_Url} = useContext(ShopContext)
    const [searchParams , setSearchParams] = useSearchParams()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const verifyPayment = async() =>
    {
        try{

            if(!token)
            {
                return null
            }

            const response = await axios.post(`${backend_Url}/api/order/verifyStripe`,{success , orderId}, {headers:{token}})

            console.log(response.data.success)

            if(response.data.success)
            {
                setCartItems({})
                navigate('/orders')
            }
            else
            {
                navigate('/cart')
            }
            
        }
         catch (error) {

            console.error(error)
            toast.error(error.message)
            
        }

    }

    useEffect(()=>
    {
verifyPayment()
    },[token])

  return (
  <></>
  )
}

export default Verify