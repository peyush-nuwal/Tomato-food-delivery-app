import { useContext, useEffect } from "react";
import { StoreContext } from "../../context/store";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
const cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount,url } =
    useContext(StoreContext);
  const navigate = useNavigate();

  
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div>
                <div className="cart-items-title cart-items-item">
                  <img src={url+"/image/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>{item.price }Rs</p>
                  <p>{cartItems[item._id]}</p>
                  <p>{item.price * cartItems[item._id] }Rs</p> 
                 
                  <p className="cross" onClick={() => removeFromCart(item._id)}>
                    X
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-detail">
            <p>Subtotal</p>
            <p>{getTotalCartAmount()}Rs</p>
          </div>
          <div className="cart-total-detail">
            <p>Delivery Fee</p>
            <p>{(getTotalCartAmount === 0) ? 0 :50}Rs</p>
          </div>
          <div className="cart-total-detail">
            <p>Total</p>
            <p>
              {getTotalCartAmount() === 0
                ? 0
                : getTotalCartAmount() +50  }
              Rs
            </p>
          </div>
          <button onClick={() => navigate("/Order")}>
            PROCEED TO CHECkOUT
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code,Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Promocode" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default cart;
