import  { useContext} from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/store'
const FoodItem = ({id ,name,desc,image ,price}) => {
    
    const { cartItems, addToCart, removeFromCart,url } = useContext(StoreContext);
    
    if (!cartItems || !id) {
      console.error('CartItems or ID is undefined', { cartItems, id });
      return <div>Error: Unable to load item.</div>;
    }



  return (
    <div className='food-item'>
         <div className="food-item-img-container">
            <img src={url+"/image/"+image} alt="" className='food-item-img' />
            {!cartItems[id]
                ? <img src={assets.add_icon_white} alt='' className='add'  onClick={()=>addToCart(id)}/>
                :
                   <div className='food-item-counter'>
                       <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                       <p>{cartItems[id]}</p>
                       <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
                   </div>
            }
         </div>
         <div className="food-item-info">
            <div className="food-item-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-desc">{desc}</p>
            <p className="food-item-price">{price}Rs   </p>
         </div>

    </div>
  )
}

export default FoodItem