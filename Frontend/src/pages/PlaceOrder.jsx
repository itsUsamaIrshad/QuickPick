import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assests/assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {


  const [method , setMethod] = useState('cod')


  const {navigate , backend_Url , token , cartItems, setCartItems, getCartAmount, delivery_fee, products} = useContext(ShopContext)

  const [formData, setFormData] = useState({firstName:'' , lastName:'' , email:'' , street:'' , city:'' , state:'' , zipCode:'' , country:'', phone:''})

const onChangeHandler = (event) =>
{
  const { name, value } = event.target;

  setFormData(data=>({...data,[name]:value}))
}


const onSubmitHandler =  async(event)=>
{
  event.preventDefault();

  try{

    const orderItems = [];

    for(const items in cartItems)
    {
      for( const item in cartItems[items])
      {
        if(cartItems[items][item]>0)
        {
          const itemInfo = structuredClone(products.find(product => product._id === items))
          {
            itemInfo.size = item,
            itemInfo.quantity = cartItems[items][item]
            orderItems.push(itemInfo)
          }
        }
      }
    }

    let orderData ={
      address: formData,
      items: orderItems,
      amount:getCartAmount()+delivery_fee,
    }
    console.log(`${backend_Url}/api/order/place`)

    switch(method)
    {
      case 'cod':
        const response = await axios.post(`${backend_Url}/api/order/place`, orderData,{headers:{token}})

      console.log(response.data.success)

        if(response.data.success)
        {
          setCartItems({})
          navigate('/orders')

        }
        else
        {
          toast.error(response.data.message)
        }
        break;
        case 'stripe' : 
const responseStripe = await axios.post(`${backend_Url}/api/order/stripe`, orderData , {headers:{token}})

if(responseStripe.data.success)
{
  const {session_url} = responseStripe.data;
  window.location.replace(session_url)
}
else
{
  toast.error(responseStripe.data.message)
}
     break;
    }
    
  } 
  
  catch (error) {

    console.error(error)
    
  }


}


  return (
    <>

<div className=' px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>

    
<form className=' flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t' onSubmit={onSubmitHandler}>

{/* left side */}

<div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
  <div className="text-xl sm:text-2xl my-3">
    <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
  </div>
  <div className="flex gap-3">
    <input type="text" required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='First Name' onChange={onChangeHandler} name='firstName' value={formData.firstName} />
    <input type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Last Name'required onChange={onChangeHandler} name='lastName' value={formData.lastName}/>
  </div>
  <input type="email" required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Email' onChange={onChangeHandler} name='email' value={formData.email} />
  <input type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Street'required onChange={onChangeHandler} name='street' value={formData.street} />
  <div className="flex gap-3">
    <input type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='City'required onChange={onChangeHandler} name='city' value={formData.city}/>
    <input type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='State'required onChange={onChangeHandler} name='state' value={formData.state}/>
  </div>
  <div className="flex gap-3">
    <input type="number"required onChange={onChangeHandler} name='zipCode' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='zipCode' value={formData.zipCode}/>
    <input type="text" required onChange={onChangeHandler} name='country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'placeholder='Country' value={formData.country} />
  </div>
  <input type="number" required onChange={onChangeHandler} name='phone' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'placeholder='Phone'value={formData.phone} />
</div>


<div className="mt-8">
  <div className="mt-8 min-w-80">
    <CartTotal/>
  </div>
  <div className="mt-12">
    <Title text1={'PAYMENT'} text2={'METHOD'} />


<div className="flex gap-3 flex-col sm:flex-row">
  <div className="flex items-center gap-3 border p-2 px-3 cursor-pointer" onClick={()=>setMethod('stripe')}>
    <p className={` min-w-3.5 h-3.5 border rounded-full ${method==='stripe'?' bg-green-400':''}`}></p>
    <img src={assets.stripe_logo} className='h-5 mx-4' alt="img" />
  </div>
  
  <div className="flex items-center gap-3 border p-2 px-3 cursor-pointer"onClick={()=>setMethod('cod')}>
    <p className={` min-w-3.5 h-3.5 border rounded-full${method==='cod'?' bg-green-400':''}`}></p>
    <p className=' text-gray-500 text-sm font-medium mx-4' alt="img" >CASH ON DELIVERY</p>
  </div>
</div>
 <div className="w-full text-end mt-8">
  <button type='submit' className=' bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
 </div>

  </div>

</div>


</form>

</div>
    </>
  )
}

export default PlaceOrder