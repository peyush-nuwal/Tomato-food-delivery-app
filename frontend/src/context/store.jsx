import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  //url link
  const url = "https://tomato-food-delivery-app-1.onrender.com";

  //state variables
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFood_list] = useState([]);

  //functions
  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]:prev[itemId]-1 }));
    if(token){

      await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
      }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      let itemInfo = food_list.find((product) => product._id === item);
      if (cartItems[item] > 0) {
        totalAmount += (itemInfo.price  * cartItems[item]) ;
       
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    const res = await axios.get(url + "/api/food/list");
    setFood_list(res.data.data);
  };





  const loadCartData= async (token)=>{
    try {
      
    const res=await axios.post(url+"/api/cart/get",{},{headers:{token}})
    setCartItems(res.data.data)
      
    } catch (error) {
      console.log(error)
      
    }

  }



  
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
       const storedToken = localStorage.getItem("token");
  
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    token,
    setToken,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
