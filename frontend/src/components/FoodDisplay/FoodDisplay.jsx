import { useContext } from "react"
import { StoreContext } from "../../context/store"
import FoodItem from "../FoodItem/FoodItem"
import './FoodDisplay.css'

const FoodDisplay = ({category}) => {
    const {food_list} =useContext(StoreContext)

  return (
    <div className="food-display">
        <h2>Top dishes near you</h2>
        <div className="food-display-list">
            {food_list.map((item,index)=>{
                if(category==="All"||category===item.category){

                    return(
                        <FoodItem key={index} id={item._id} name={item.name} desc={item.description}  price={item.price} image={item.image}/>
                    )
                }
            })}
        </div>
    </div>
  )
}

export default FoodDisplay