import { useState } from "react";
import "./Order.css";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets.js";
const Orders = ({ url }) => {
  const [ordersData, setOrdersData] = useState([]);

  const fetchOrders = async () => {
    const res = await axios.get(url + "/api/order/list");
    if (res.data.success) {
      setOrdersData(res.data.data);
     
    } else {
      toast.error(res.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const statusHandler=async(e,orderId)=>{
       const res=await axios.post(url+"/api/order/status",{orderId,status:e.target.value})
       if(res.data.success){
         await fetchOrders();
       }
       
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="Orders add">
      <h3>Order page</h3>
      <div className="orders-list">
        {ordersData.map((order, index) => (
          <div key={index} className="order">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((food, index) => {
                  if (index === order.items.length - 1) {
                    return food.name + " x " + food.quantity;
                  } else {
                    return food.name + " x " + food.quantity + ", ";
                  }
                })}
              </p>
              <p className="order-item-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + ", "}</p>
                <p>
                  {order.address.zipCode +
                    ", " +
                    order.address.city +
                    ", " +
                    order.address.state}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phoneNumber}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <p>{order.amount}</p>
            <select onChange={(e)=>statusHandler(e,order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Deliverd">Deliverd</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
