import '@/styles/globals.css'
import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar'

export default function App({ Component, pageProps }) {
  const [cart,setCart ] = useState({});
  const [subtotal,setSubtotal ] = useState(0);
  const [user,setUser] = useState({value:null});
  const [key,setKey] = useState(0);
  const router = useRouter();
  useEffect(()=>{
    router.events.on('routeChangeStart', ()=>{
      setProgress(40);
    })
    router.events.on('routeChangeComplete', ()=>{
      setProgress(100);
    })
    try {
      if(localStorage.getItem("cart")){
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) { 
      console.error(error);
      localStorage.clear()
    }
    const token = localStorage.getItem('token');
    if(token){
      setUser({value:token})
      setKey(Math.random());
    }
  },[router.query])
  const saveCart = (myCart)=>{
    localStorage.setItem('cart',JSON.stringify(myCart));
    let subt = 0;
    let keys = Object.keys(myCart);
    for(let i=0;i< keys.length;i++){
      subt += myCart[keys[i]].price * myCart[keys[i]].quantity;
    }
    setSubtotal(subt);
  }
  const addToCart = (itemCode , quantity , price ,name,size,varient)=>{
    let newCart = cart;
    if(itemCode in cart){
      newCart[itemCode].quantity = cart[itemCode].quantity + quantity;
    }
    else{
      newCart[itemCode] = {quantity:1,price,name,size,varient};
    }
    setCart(newCart);
    saveCart(newCart);
    toast.success('Item added to the cart', {
      position: "top-left",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }
  const logout = ()=>{
    localStorage.removeItem('token');
    setUser({value:null})
    toast.info('Logged-out successfully !!', {
      position: "top-left",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
    setKey(Math.random());
  }
  const buyNow = (itemCode , quantity , price ,name,size,varient) =>{
    saveCart({});
    let newCart = {itemCode:{quantity:1,price,name,size,varient}};
    setCart(newCart);
    saveCart(newCart);
    router.push('/checkout')
  }
  const removeFromCart = (itemCode , quantity , price ,name,size,varient)=>{
    let newCart = cart;
    if(itemCode in cart){
      newCart[itemCode].quantity = cart[itemCode].quantity - quantity;
    }
    if(newCart[itemCode].quantity <=0){
      delete newCart[itemCode]
    }
    setCart(newCart);
    saveCart(newCart);
  }
  const clearCart = ()=>{
    setCart({});
    saveCart({});
  }
  const [progress, setProgress] = useState(0)
  return <div>
      <LoadingBar
        color='#f11946'
        progress={progress}
        waitingTime={300}
        onLoaderFinished={() => setProgress(0)}
      />
    { key && <Navbar logout={logout} user={user} key={key} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal} />}
    <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
     <Component cart={cart} buyNow={buyNow} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal} {...pageProps} />
     <Footer />
  </div>
}
