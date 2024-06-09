import { useContext, useState } from "react";
import "./Login.css";
import { assets } from "../../assets/assets.js";
import { StoreContext } from "../../context/store.jsx";
import axios from "axios";
const Login = ({ setShowLogin }) => {
   //all state variables  
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [currState, setCurrState] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
       

  //context variable
  const {url,token,setToken}=useContext(StoreContext)
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    console.log(password);
  };

  const onChnageHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const passwordHandler = (e) => {
    handlePasswordChange(e);
    onChnageHandler(e);
  };

  const onLogin=async(e)=>{
       e.preventDefault()
       let newUrl=url;
       if(currState==="login"){
           newUrl+="/api/user/login";

       }
       else{
         newUrl+="/api/user/register";
       }
       const res=await axios.post(newUrl,data)
       if(res.data.success){
         setToken(res.data.token)
         localStorage.setItem("token",res.data.token)
         setShowLogin(false)
       }
       else{
         alert(res.data.message)
       }

      
  }

  return (
    <div className="Login">
      <form  onSubmit={onLogin} className="Login-container" >
        <div className="login-container-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="Login-inputs">
          {currState === "sign-up" ? (
            <input
              name="name"
              onChange={onChnageHandler}
              type="text"
              placeholder="Your Name"
              required
            />
          ) : (
            <></>
          )}
          <input
            name="email"
            onChange={onChnageHandler}
            type="email"
            placeholder="Your Email"
            required
          />

          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            onChange={passwordHandler}
            value={password}
          />

          <span className="toggle" onClick={toggleShowPassword}>
            {showPassword ? "Hide" : "Show"}{" "}
          </span>
        </div>
        <button type='submit' >{currState ==="login" ? "Login" : "Create account"}</button>

        <div className="Login-condition">
          <input type="checkbox" required />
          <p>By continue, i agree to the terms of use & privacy policy.</p>
        </div>
        {currState == "sign-up" ? (
          <p>
            already have an Account?{" "}
            <span className="span" onClick={() => setCurrState("login")}>
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new Account?{" "}
            <span className="span" onClick={() => setCurrState("sign-up")}>
              Click here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
