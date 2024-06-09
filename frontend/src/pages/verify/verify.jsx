import { useNavigate, useSearchParams } from 'react-router-dom'
import './verify.css'
import { useContext, useEffect } from 'react';
import { StoreContext } from '../../context/store';
import axios from 'axios';

const verify = () => {
    const [searchParams,setSearchParams] = useSearchParams();
    const success=searchParams.get('success')
    const orderId=searchParams.get('orderId')
      const {url}=useContext(StoreContext)
      const navigate=useNavigate();
      
      const verifyPay=async()=>{
         const res=await axios.post(url+"/api/order/verify",{success,orderId})

         if(res.data.success){
                navigate("/myOrders")
         }
         else{
            navigate("/")
         }
      }

      useEffect(() => {
        verifyPay()
      }, [])
      
    
  return (
    <div className='verify'>
              <div class="loading">
                 <span></span>
                 <span></span>
                 <span></span>
                 <span></span>
                 <span></span>
                </div>
    </div>
  )
}

export default verify