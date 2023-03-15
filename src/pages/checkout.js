import Link from 'next/link'
import React from 'react'
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai'
import { BsFillBagCheckFill, BsBagXFill } from 'react-icons/bs'
import Head from 'next/head'
import Script from 'next/script'

const Checkout = ({ cart, subtotal, addToCart, removeFromCart }) => {
  const intiatePayment = async () => {
    let Oid = Math.floor( Math.random() * Date.now());
    //Geting a transaction token
    
    const data = { cart,subtotal,Oid ,email:'email'};

    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    let txnToken = await a.json()
    var config = {
      "root": "",
      "flow": "DEFAULT",
      "data": {
        "orderId":Oid, /* update order id */
        "token": txnToken, /* update token value */
        "tokenType": "TXN_TOKEN",
        "amount": subtotal /* update amount */
      },
      "handler": {
        "notifyMerchant": function (eventName, data) {
          console.log("notifyMerchant handler function called");
          console.log("eventName => ", eventName);
          console.log("data => ", data);
        }
      }
    };
    window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
      // after successfully updating configuration, invoke JS Checkout
      window.Paytm.CheckoutJS.invoke();
    }).catch(function onError(error) {
      console.log("error => ", error);
    });
  }
  return (
    <div>
      <Head><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" /></Head>
      <Script type="application/javascript" src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js"`} crossorigin="anonymous" />
      <h1 className='font-bold text-center text-2xl mt-4'>Checkout</h1>
      <h2 className='font-bold text-xl text-center mt-3'>1. Delivery Details</h2>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-8 mx-auto">
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                  <input type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                  <input type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
                  <textarea id="address" name="address" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
                  <input type="text" id="phone" name="phone" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="pin" className="leading-7 text-sm text-gray-600">Pin</label>
                  <input type="number" id="pin" name="pin" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
                  <input type="text" id="state" name="state" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
                  <input type="text" id="city" name="city" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <h2 className='font-bold text-xl text-center mt-3'>2. Review Cart</h2>
      <div className="p-10">
        <ol className='list-none font-semibold'>
          {Object.keys(cart).length == 0 && <div className='m-4 '>Your cart is empty !!</div>}
          {Object.keys(cart).map((k) => {
            return <li key={k}>
              <div className='item flex justify-around my-3 border border-red-200 rounded p-3 '>
                <div className='font-semibold'>{cart[k].name}({cart[k].size}/{cart[k].varient})</div>
                <div className='font-semibold flex items-center justify-center'> <AiFillMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].varient) }} className='mx-2 text-red-700 hover:text-red-900 text-2xl cursor-pointer' />{cart[k].quantity}<AiFillPlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].varient) }} className='mx-2 text-red-700 hover:text-red-900 text-2xl cursor-pointer' /></div>
              </div>
            </li>
          })}
        </ol>
        <div className="total flex items-center justify-around bg-green-200 rounded border border-black p-4 ">
          <div className='font-bold'>Total amount to pay: ₹{subtotal}</div>
          <button onClick={intiatePayment} className='flex items-center justify-center px-4 mx-1 py-3 cursor-pointer border border-black rounded bg-red-700 hover:bg-red-900 text-white'> Click here to Pay</button>
        </div>
      </div>

    </div>
  )
}

export default Checkout
