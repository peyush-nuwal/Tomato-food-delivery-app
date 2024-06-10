import Navbar from "./components/Navabar/Navbar";
import SideBar from "./components/SideBar/SideBar";
 import {Routes, Route} from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function App() {
  const url="https://tomato-backend-flax.vercel.app/"; 
  return (
    <div>
      <ToastContainer />
      <Navbar/>
      <hr />
      <div className="app-content">
      <SideBar/>
      <Routes>
        <Route path="/add" element={<Add url={url}/>} />
        <Route path="/Orders" element={<Orders url={url}/>}/>
        <Route path="/List" element={<List url={url}/>}/>

      </Routes>

      
      </div>
    </div>
  );
}

export default App;
