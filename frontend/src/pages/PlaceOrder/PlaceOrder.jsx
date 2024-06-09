import { useContext, useState } from "react";
import { StoreContext } from "../../context/store";
import axios from 'axios'
import "./PlaceOrder.css";
const placeOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phoneNumber: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const orderPlace = async (e) => {
    e.preventDefault();


    let orderItems = [];


    food_list.map((item) => {
      if (cartItems[item._id] > 0) {

          let itemInfo = item;
          itemInfo["quantity"] = cartItems[item._id];
          orderItems.push(itemInfo);
        
      }
    });

    let orderData={
       address:data,
       items:orderItems,
       amount:getTotalCartAmount()+50
    }
    let res=await axios.post(url+"/api/order/place",orderData,{headers:{token}})
    
    if(res.data.success){
      const {session_url}=res.data;
      window.location.replace(session_url)

    }
    else{
      alert("error")
    }
    
  };

  return (
    <form onSubmit={orderPlace} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First Name"
          />
          <input
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="text"
          placeholder="Email adress"
        />
        <input
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
        />
        <div className="multi-fields">
          <input
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
          />
          <input
            name="state"
            type="text"
            onChange={onChangeHandler}
            value={data.state}
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            name="zipCode"
            onChange={onChangeHandler}
            value={data.zipCode}
            type="text"
            placeholder="Zip code"
          />
          <input
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          name="phoneNumber"
          onChange={onChangeHandler}
          value={data.phoneNumber}
          type="text"
          placeholder="Phone Number"
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-detail">
            <p>Subtotal</p>
            <p>{getTotalCartAmount()}Rs</p>
          </div>
          <div className="cart-total-detail">
            <p>Delivery Fee</p>
            <p>{getTotalCartAmount() === 0 ? 0 : 50}Rs</p>
          </div>
          <div className="cart-total-detail">
            <p>Total</p>
            <p>
              {" "}
              {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 50}
              Rs
            </p>
          </div>
          <button type="submit">PROCEED TO CHECkOUT</button>
        </div>
      </div>
    </form>
  );
};

export default placeOrder;
