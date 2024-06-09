import { Routes,Route } from 'react-router-dom'
import Navbar from './components/Navbar/navbar'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Verify from './pages/verify/verify'
import MyOrders from './pages/myOrders/myOrders'
import Footer from './components/Footer/Footer'
import { useState } from 'react'
import Login from './components/Login/Login'
const App = () => {
  const [ShowLogin, setShowLogin] = useState(false)
  return (
    <>
    {ShowLogin?<Login setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>

         <Routes>
            <Route path='/' element={<Home/>}/> 
            <Route path='/Cart' element={<Cart/>}/> 
            <Route path='/Order' element={<PlaceOrder/>}/> 
            <Route path='/verify' element={<Verify/>}/> 
            <Route path='/MyOrders' element={<MyOrders/>}/> 
         </Routes>
    </div>
         <Footer/>
    </>
  )
}

export default App