import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const Login = () => {

  const {token ,setToken , backend_Url , navigate} = useContext(ShopContext)

  const [name , setName] = useState('')
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')

  const [currentState , setCurrentState] = useState('Login')


  const onSubmitHandler = async (e) =>
  {
    e.preventDefault()

    try {

      if(currentState === 'Register')
      {
       const response = await axios.post(backend_Url+'/api/user/register',{name,email,password})
    
       console.log(response.data)

      if(response.data.success)
      {
        setToken(response.data.token)
        localStorage.setItem('token', response.data.token)
      }
      else
      {
        toast.error(response.data.message)
      }
      }
      else
      {
        const response = await axios.post(backend_Url+'/api/user/login',{name,email,password})
      

        if(response.data.success)
        {
          setToken(response.data.token)
          toast.success('login Successfully')
          localStorage.setItem('token', response.data.token)
        }
        else
        {
          toast.error(response.data.message)
        }
      }
      
    } 
    
    catch (error) {
      
      console.error(error)
      toast.error(error.message)
    }

  }


  useEffect(()=>
  {
    if(token)
    {
      navigate('/')
    }

  },[token])

  return (
    <>
    
    <form className=' flex flex-col item-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800' onSubmit={onSubmitHandler}>
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <div className="prata-regular text-3xl">{currentState}</div>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>
      {currentState==='Login'?'':
      <input type="text" className=' w-full px-3 py-2 border border-gray-800' placeholder='First Name' 
      value={name} onChange={(e)=>setName(e.target.value)} />}
      
      <input type="email" className=' w-full px-3 py-2 border border-gray-800' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <input type="password" className=' w-full px-3 py-2 border border-gray-800' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className=' cursor-pointer'>Forgot your Password</p>
        {
          currentState==='Login'
    ?<p className=' cursor-pointer' onClick={()=>setCurrentState('Register')}>Create New Account</p>
    :<p className=' cursor-pointer' onClick={()=>setCurrentState('Login')}>Login Here</p>
        }
      </div>
      <button className=' bg-black text-white font-light px-8 py-2 mt-4 '>{currentState==='Login'?'Login':'Register'}</button>
    </form>


    
    
    
    
    </>
  )
}

export default Login