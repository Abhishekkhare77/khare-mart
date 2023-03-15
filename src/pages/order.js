import React from 'react'

const Order = () => {
  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Animated Night Hill Illustrations</h1>
              <p className="leading-relaxed mb-4">Your order has been placed successfully</p>
              <div className="flex mb-4">
                <a className="flex-grow text-red-500 border-b-2 border-red-500 py-2 text-lg px-1">Description</a>
                <a className="flex-grow text-red-500 border-b-2 border-red-500 py-2 text-lg px-1">Quantity</a>
                <a className="flex-grow text-red-500 border-b-2 border-red-500 py-2 text-lg px-1">Price</a>
              </div>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">a</span>
                <span className="ml-auto text-gray-900">1</span>
                <span className="ml-auto text-gray-900">₹999</span>
              </div>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">a</span>
                <span className="ml-auto text-gray-900">1</span>
                <span className="ml-auto text-gray-900">₹999</span>
              </div>
              <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                <span className="text-gray-500">a</span>
                <span className="ml-auto text-gray-900">1</span>
                <span className="ml-auto text-gray-900">₹499</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="title-font font-medium text-2xl text-gray-900">Total amount: ₹58.00</span>
                <button className='border border-black bg-red-700 hover:bg-red-900 rounded px-4 py-2 text-white'>Track Order</button>
              </div>
            </div>
            <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://m.media-amazon.com/images/I/810QkVguBPL._UY879_.jpg"/>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Order
