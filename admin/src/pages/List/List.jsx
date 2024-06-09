import {useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import {toast} from 'react-toastify'
const List = ({url}) => {
  
  const [list, setList] = useState([])

  const fetchData = async () => {
    try {
      const res = await axios.get(`${url}/api/food/list`)
      if(res.data.success){
        
        setList(res.data.data)
        }
        else{
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
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchData()
   
  }, [])
      
  const removeFood = async (id) => {
      const del=await axios.post(`${url}/api/food/delete/${id}`)
      await fetchData();
         
       if(del.data.success){
        toast.success(del.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          
          });
       }  else{
        toast.error(del.data.message, {
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

  }

 
  return (
    <div className='List add flex-col'>
      <p>All Food List</p>
         <div className="list-table">
            <div className="list-table-format title">
              <b>No.</b>
              <b>Image</b>
              <b>Name</b>
              <b>Category</b>
              <b>Price</b>
              <b>Action</b>
            </div>
           

            {
              list.map((item,index)=>{
                return(
                  <>
                  <div key={item} className='list-table-format'>
                        <p>{index+1}.</p>
                       <img src={`${url}/image/`+item.image} alt="" />
                       <p>{item.name}</p>
                       <p>{item.category}</p>
                       <p>{item.price}Rs</p>
                       <p className='cursor' onClick={()=>removeFood(item._id)}>x</p>
                   </div>
                  </>
                )
                })
                }
              
         </div>

    </div>
  )
}

export default List