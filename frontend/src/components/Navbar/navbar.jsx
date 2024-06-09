
 import './navbar.css'
 import { assets } from '../../assets/assets'
import { useContext, useState } from 'react'
import {Link, useNavigate }from 'react-router-dom' 
import { StoreContext } from '../../context/store'
const navbar = ({setShowLogin}) => {

     const [menu, setMenu] = useState("Home");
     const navigate=useNavigate();
     const {getTotalCartAmount,setToken,token} = useContext(StoreContext);
     const logout=()=>{
             localStorage.removeItem('token')
             setToken("");
             navigate("/")
     }
     
  return (
    <div className='navbar'>
       <Link to="/">

      <img src={assets.logo} alt="" className='logo' />
       </Link>
         <ul className="navbar-menu">
           <Link to="/" className={menu=="Home"?"active":""}  onClick={()=>setMenu("Home")}>Home</Link>
           <a href='#Explore' className={menu=="Menu"?"active":""}    onClick={()=>setMenu("Menu")}>Menu</a>
           <a href='#App-download' className={menu=="Mobile-app"?"active":""}  onClick={()=>setMenu("Mobile-app")}>Mobile-app</a>
           <a href='#Footer' className={menu=="Contact-us"?"active":""}  onClick={()=>setMenu("Contact-us")}>Contact-us</a>
         </ul>
                <div className='navbar-right'>
                  
                  <div className='cart-logo'>
                    <Link to="/Cart">
                    <img src={assets.basket_icon} alt="" />
                    </Link> 
                         <div className={getTotalCartAmount()===0?"":'dot'}></div>
                  </div>
                  {!token?
                   <button onClick={()=>setShowLogin(true)}>sign in</button>
                  :
                      <div className="navbar-profile">
                        <img src={assets.profile_icon}
                         alt="" />
                         <ul className='navbar-profile-dropdown' >
                            <li onClick={()=>navigate("/MyOrders")}><img src={assets.bag_icon} alt="" />
                            <p>Orders</p>
                            </li>
                            <hr />
                            <li onClick={logout}><img src={assets.logout_icon} alt="" />
                             <p>logout</p>
                            </li>
                         </ul>
                      </div>
                  }
                 
                </div> 
    </div>
  )
}

export default navbar