import Image from 'next/image'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import Kmart from '../public/Kmart.png'
import {AiOutlineShoppingCart,AiFillCloseCircle,AiFillPlusCircle,AiFillMinusCircle} from 'react-icons/ai'
import {BsFillBagCheckFill,BsBagXFill} from 'react-icons/bs'
import {MdOutlineAccountCircle} from 'react-icons/md'
const Navbar = ({logout,user,cart,addToCart,removeFromCart,clearCart,subtotal}) => {
  const [dropDown,setDropDown] = useState(false);
  const toggleCart = ()=>{
    if(ref.current.classList.contains('translate-x-full')){
      ref.current.classList.remove('translate-x-full')
      ref.current.classList.add('translate-x-0')
    }
    else{
      ref.current.classList.remove('translate-x-0')
      ref.current.classList.add('translate-x-full')
    }

  }
  const ref = useRef();
  return (
    <div className='flex flex-col md:flex-row justify-between items-center shadow-xl sticky top-0 bg-white z-50'>
      <div className="logo mx-3">
        <Link href={'/'}><Image src={Kmart} alt="logo" height={70} width={90} /></Link>
      </div>
      <div className="nav">
        <ul className='flex font-bold'>
          <Link href={"/tshirts"}><li className='px-3 hover:text-red-500'>Tshirts</li></Link>
          <Link href={"/hoodies"}><li className='px-3 hover:text-red-500'>Hoodies</li></Link>
          <Link href={"/mugs"}><li className='px-3 hover:text-red-500'>Mugs</li></Link>
        </ul>
      </div>
      <div className='flex'>
      {user.value && <div className='cursor-pointer px-3 py-3 text-2xl'><MdOutlineAccountCircle onMouseLeave={()=>{setDropDown(false)}} onMouseOver={()=>{setDropDown(true)}} className='hover:text-red-500'/></div>}
         
      {dropDown && <div onMouseLeave={()=>{setDropDown(false)}} onMouseOver={()=>{setDropDown(true)}}  className="absolute right-14 top-8 bg-red-500 rounded p-5 shadow-lg">
       <ul>
        <Link href={'/account'}><li className='font-bold p-1 text-white text-center hover:text-black'>Account</li></Link>
        <Link href={'/orders'}><li className='font-bold p-1 text-white text-center hover:text-black'>Orders</li></Link>
        <li onClick={logout} className='cursor-pointer font-bold p-1 text-white text-center hover:text-black'>Logout</li>
       </ul>
      </div>}

      {!user.value && <Link href={'/login'}><button className='text-white px-3 m-2 py-1 border border-black rounded bg-red-500 hover:bg-red-800'>Login</button></Link>}
      <div onClick={toggleCart} className='cursor-pointer px-3 py-3 text-2xl'><AiOutlineShoppingCart className='hover:text-red-500'/></div>
      </div>
   
      <div ref={ref} className={`z-50 cart w-72 h-[100vh] overflow-y-scroll shadow-lg absolute top-0 right-0 bg-red-200 p-10 transform transition-transform ${Object.keys(cart).length !== 0 ? 'translate-x-0':'translate-x-full' }`}>
        <h2 className='font-bold text-xl text-center'>Cart Items</h2>
        <span onClick={toggleCart} className="cursor-pointer text-red-700 hover:text-red-900 text-2xl absolute right-2 top-2"><AiFillCloseCircle/></span>
        <ol className='list-decimal font-semibold'>
          {Object.keys(cart).length == 0 && <div className='m-4 '>Your cart is empty !!</div>}
         {Object.keys(cart).map((k)=>{ return <li key={k}>
            <div className='item flex my-3'> 
              <div className='w-2/3 font-semibold'>{cart[k].name}({cart[k].size}/{cart[k].varient})</div>
              <div className='w-1/3 font-semibold flex items-center justify-center'> <AiFillMinusCircle onClick={()=>{removeFromCart(k,1,cart[k].price,cart[k].name,cart[k].size,cart[k].varient)}} className='mx-2 text-red-700 hover:text-red-900 text-2xl cursor-pointer'/>{cart[k].quantity}<AiFillPlusCircle onClick={()=>{addToCart(k,1,cart[k].price,cart[k].name,cart[k].size,cart[k].varient)}} className='mx-2 text-red-700 hover:text-red-900 text-2xl cursor-pointer'/></div>
            </div>
        </li>
         })} 
        </ol>
        <div className='font-bold py-2'>Total amount to pay: ₹{subtotal}</div>
        <div className='flex items-center justify-center'>
        <Link href={'/checkout'}><button className='flex items-center justify-center px-4 mx-1 py-3 cursor-pointer border border-black rounded bg-red-700 hover:bg-red-900 text-white'><BsFillBagCheckFill className='mx-2'/> Checkout</button></Link>
        <button onClick={clearCart} className='flex items-center justify-center px-4 mx-1 py-3 cursor-pointer border border-black rounded bg-red-700 hover:bg-red-900 text-white'><BsBagXFill className='mx-2'/> Clearcart</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
