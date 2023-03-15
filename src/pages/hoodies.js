import Link from 'next/link'
import React from 'react'
import Product from "models/Product"
import mongoose from "mongoose";

const Hoodies = ({products}) => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {Object.keys(products).length === 0 && <div className='text-2xl text-red-900 m-auto'>Sorry all the hoodies are currently out of stock!</div>}
            {Object.keys(products).map((item)=>{ return <Link  key={item._id} href={`/products/${products[item].slug}`} className="lg:w-1/4 md:w-1/2 p-4 w-full hover:shadow-xl border border-gray-200">
              <div className="block relative rounded overflow-hidden ">
                <img alt="ecommerce" className="m-auto h-[30vh] md:h-[36vh] block " src={products[item].img} />
              </div>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{products[item].category}</h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
                <p className="mt-2">₹{products[item].price}</p>
                <div className='mt-2'>
                  {products[item].size.includes('S') && <span className='border border-black rounded px-2 py-1 '>S</span>}
                  {products[item].size.includes('L') && <span className='border border-black rounded px-2 py-1 '>L</span>}
                  {products[item].size.includes('M') && <span className='border border-black rounded px-2 py-1 '>M</span>}
                  {products[item].size.includes('X') && <span className='border border-black rounded px-2 py-1 '>X</span>}
                  {products[item].size.includes('XL') && <span className='border border-black rounded px-2 py-1 '>XL</span> }
                  {products[item].size.includes('XXL') && <span className='border border-black rounded px-2 py-1 '>XXL</span>}
                  <div className='mt-2'>
                  {products[item].color.includes('Red') && <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                  {products[item].color.includes('green') && <button className="border-2 border-gray-300 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                  {products[item].color.includes('blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                  {products[item].color.includes('yellow') && <button className="border-2 border-gray-300 ml-1 bg-yellow-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                  {products[item].color.includes('black') && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                  </div>
                </div>
              </div>
            </Link>
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find({category:'hoody'});
  let hoodies = {};
    for(let item of products){
        if(item.title in hoodies){
            if(!hoodies[item.title].color.includes(item.color) && item.availableQty > 0){
                hoodies[item.title].color.push(item.color);
            }
            if(!hoodies[item.title].size.includes(item.size) && item.availableQty > 0){
                hoodies[item.title].size.push(item.size);
            }
        }else{
            hoodies[item.title] = JSON.parse(JSON.stringify(item));
            if(item.availableQty > 0){
                hoodies[item.title].color = [item.color];
                hoodies[item.title].size = [item.size];
            }
        }
    }
  return {
    props: {products:JSON.parse(JSON.stringify(hoodies))}, // will be passed to the page component as props
  }
}
export default Hoodies
