import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App.jsx'
import { toast } from 'react-toastify'
const Login = ({setToken}) => {

  const [email, setEmail] = useState('')
  const [password , setPassword] = useState('')


  const onSubmitHandler = async(e) =>
  {
    try {

      e.preventDefault();

      console.log(backendUrl)
      const response = await  axios.post(backendUrl+'/api/user/admin',{email,password})
      if(response.data.success)
      {
        setToken(response.data.token)
        
      console.log('Admin Login Successfully')
      }
      else
      {
        toast.error(response.data.message)
      }
  
    }
     catch (error) {
       
console.error(error)
toast.error(error.message)
      
    }
  }


  return (
    <>
    
    <div className="min-h-screen flex justify-center items-center w-full">
<div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

    <form onSubmit={onSubmitHandler}>
      <div className=" mb-3 min-w-72">
        <p className=' font-medium text-sm text-gray-700 mb-2'>Email Address</p>
      <input type="email" className=' w-full px-3 py-2 border border-gray-800' placeholder='Email' onChange={(e)=> setEmail(e.target.value)} />
      
      </div>
     
      <div className=" mb-3 min-w-72">
        <p className=' font-medium text-sm text-gray-700 mb-2'>Email Address</p>
      <input type="password" className=' w-full px-3 py-2 border border-gray-800' placeholder='Email' onChange={(e)=> setPassword(e.target.value)} />
      
      </div>
      <button className=' bg-black text-white rounded-md px-4 py-2 mt-2 w-full '>Login</button>
    </form>
    </div>
</div>
    
    
    
    
    
    
    
    </>
  )
}

export default Login