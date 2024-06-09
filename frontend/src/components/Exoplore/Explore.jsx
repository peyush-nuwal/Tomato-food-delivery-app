
import { menu_list } from '../../assets/assets'
import './Explore.css'

const Explore = ({category,setCategory}) => {
    
  return (
    <div className='explore' id='Explore'>
        <h1>Explore our menu</h1>
        

        <div className='explore-menu'>
          { menu_list.map((item ,index)=>{
               return(
                 <div key={index} onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} className='explore-menu-item'>
                       <img src={item.menu_image} alt="" className={category==item.menu_name?"active":""} />
                       <p>{item.menu_name}</p>
                 </div>
               )
           }) 
            }
        </div>
        <hr />
    </div>
  )
}

export default Explore