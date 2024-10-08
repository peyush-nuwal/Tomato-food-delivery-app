import { createContext, useEffect, useState, useCallback } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  // URL link
  const url = "http://localhost:4000";

  // State variables
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFood_list] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Functions
  const fetchFoodList = useCallback(async () => {
    try {
      setLoading(true); // Start loading
      const res = await axios.get(`${url}/api/food/list`);
      setFood_list(res.data.data);
    } catch (err) {
      console.error("Error fetching food list:", err);
      setError(err); // Set error state
    } finally {
      setLoading(false); // End loading
    }
  }, [url]);

  const loadCartData = useCallback(async (token) => {
    try {
      const res = await axios.post(
        `${url}/api/cart/get`,
        {},
        { headers: { token } }
      );
      setCartItems(res.data.data);
    } catch (err) {
      console.error("Error loading cart data:", err);
      setError(err); // Set error state
    }
  }, [url]);

  const addToCart = useCallback(async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/add`,
          { itemId },
          { headers: { token } }
        );
      } catch (err) {
        console.error("Error adding to cart:", err);
        setError(err); // Set error state
      }
    }
  }, [token, url]);

  const removeFromCart = useCallback(async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) - 1), // Prevent negative values
    }));

    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/remove`,
          { itemId },
          { headers: { token } }
        );
      } catch (err) {
        console.error("Error removing from cart:", err);
        setError(err); // Set error state
      }
    }
  }, [token, url]);

  const getTotalCartAmount = useCallback(() => {
    return Object.keys(cartItems).reduce((total, itemId) => {
      const itemInfo = food_list.find((product) => product._id === itemId);
      if (cartItems[itemId] > 0 && itemInfo) {
        total += itemInfo.price * cartItems[itemId];
      }
      return total;
    }, 0);
  }, [cartItems, food_list]);

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
  }, [fetchFoodList, loadCartData]);

  const contextValue = {
    food_list,
    cartItems,
    token,
    setToken,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    loading,
    error,
    url,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
