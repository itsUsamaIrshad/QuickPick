import React, { useContext, useState } from 'react'
import {assets} from '../assests/assets/frontend_assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { IoSearchSharp } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { RiMenu3Line } from "react-icons/ri";
const Navbar = () => {


    const [visible , setVisible] = useState(false)

    const {setShowSearch , getCartCount , token ,setToken , setCartItems , navigate} = useContext(ShopContext)


    const logout = () =>
    {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

  return (
    <>
    
    <div className="flex items-center justify-between py-5 font-medium px-6 sm:px-12   w-[100%] bg-white">
       <h2 className=' text-white'>Logo</h2>
        <ul className=' hidden sm:flex gap-5 text-sm   text-black'>
            <NavLink to='/' className='flex flex-col items-center gap-1' >
                <p>Home</p>
                <hr  className=' w-2/4 border-none h-[1.5px] bg-[red] hidden'/>
            </NavLink>
            <NavLink to='/collection' className='flex flex-col items-center gap-1' >
                <p>Collection</p>
                <hr  className=' w-2/4 border-none h-[1.5px] bg-[red] hidden'/>
            </NavLink>
            <NavLink to='/about' className='flex flex-col items-center gap-1' >
                <p>About</p>
                <hr  className=' w-2/4 border-none h-[1.5px] bg-[red] hidden'/>
            </NavLink>
            <NavLink to='/contact' className='flex flex-col items-center gap-1' >
                <p>Contact</p>
                <hr  className=' w-2/4 border-none h-[1.5px] bg-[red] hidden'/>
            </NavLink>
        </ul>
        
        <div className="flex items-center gap-4">

<IoSearchSharp  className=' cursor-pointer text-2xl text-black' onClick={()=>setShowSearch(true)} />
<div className="group relative">

    <img src={assets.profile_icon} onClick={()=>token?null:navigate('/login')} className=' w-5 cursor-pointer' alt="" srcset="" />
   {token &&
   <>
  
  
    <div className="group-hover:block hidden absolute right-0 pt-4">
        <div className="flex flex-col gap-2 w-36 px-3 py-5 bg-slate-100 text-gray-500 rounded-lg">
            <div className="cursor-pointer hover:text-black">My Profile</div>
<div className="cursor-pointer hover:text-black" onClick={()=>navigate('/orders')} >Orders</div>
            <div className="cursor-pointer hover:text-black" onClick={logout}>Logout</div>
        </div>
    </div>
    </>
     }
</div>
<Link  to='/cart' className=' relative' >

<FaCartShopping  className=' cursor-pointer text-2xl text-black'/>
<p className=' absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-[red] text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
</Link>

<RiMenu3Line onClick={()=>setVisible(true)} className=' cursor-pointer text-black sm:hidden text-2xl' alt="" />
        </div>


{/* {Side Bar  small Screen} */}



    </div>
<div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full': 'w-0'}`}>

<div className="flex flex-col text-gray-600" onClick={()=>setVisible(false)}>
    <div className="flex items-center gap-4 p-3 cursor-pointer">
        <img src={assets.dropdown_icon} className=' h-4 rotate-180' alt="" />
        <p>Back</p>
    </div>
    
    <NavLink  to='/' className='py-2 pl-6 border' onClick={()=>setVisible(false)} >Home</NavLink>
    <NavLink  to='/collection' className='py-2 pl-6 border' onClick={()=>setVisible(false)} >Collection</NavLink>
    <NavLink  to='/about' className='py-2 pl-6 border' onClick={()=>setVisible(false)} >About</NavLink>
    <NavLink  to='/contact' className='py-2 pl-6 border' onClick={()=>setVisible(false)} >Contact</NavLink>
</div>


</div>
    
    
    
    </>
  )
}

export default Navbar