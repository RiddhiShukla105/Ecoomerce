import React, { useState , useEffect } from "react";
import appRoute from "./appRoute";
import { NavLink,Link,useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import "./Header.css";
import { ToastContainer, toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";


const Header = ({ active }) => {
  const navRoute = appRoute.filter((item) => item.name);
  console.log(navRoute);

  const navigate=useNavigate()
  const { logoutCart } = useContext(CartContext);


  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  // const token = localStorage.getItem("token");

  // ✅ Check token when component loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // convert to boolean
  }, []);



  // logout function
const handleLogout = () => {
  localStorage.removeItem("token");  // or sessionStorage
   logoutCart(); // ✅ instantly clears cart & token from state
  setIsLoggedIn(false); // instantly update UI

    toast('🦄 You are logged out!', {
position: "top-right",
autoClose: 2000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
transition: Bounce,
});

 setTimeout(() => {
      navigate("/login");
    }, 3000);
};

  return (
    <div className="head">
      <nav>
        <div className="ekart" style={{ fontSize: "26px", fontWeight: "bold" }}>
          <span style={{ fontSize: "36px", fontWeight: "bolder" }}>E</span>kart
        </div>
        <ul>
          {/* {appRoute.map((item,id)=>(
        <li><Link to={item.path} key={id} className='head2'>{item.name}</Link></li>
      ))} */}
          {navRoute.map((item, id) => (
            <li>
              <NavLink
                to={item.path}
                key={id}
                className={({ isActive }) =>
                  isActive ? "head2 active" : "head2"
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
         {/* icons */}
        <div className="hidden lg:flex gap-6 text-2x mt-3">

          {isLoggedIn?(

              <>
          <span
            style={{
              fontSize: "26px",
              fontWeight: "bold",
              paddingRight: "15px",
            }}
          >
            <Link to="/cart" style={{ color: "white" }}>
              <FaCartShopping className="i" />
            </Link>
          </span>

          <span
            style={{ fontSize: "26px", fontWeight: "bold", cursor: "pointer",marginLeft:"10px" }}
            onClick={handleLogout}>
            <Link  style={{ color: "white" }}>
              <AiOutlineLogout className="i"/>
            </Link>
          </span>
          </>
           
            ):(
              <span
            style={{ fontSize: "26px", fontWeight: "bold", cursor: "pointer" }}
          >
            <Link to="/sign" style={{ color: "white" }}>
              <FaUser className="i"/>
            </Link>
          </span>
          )}
        </div>
      </nav>
      <ToastContainer />
    </div>
  );
};

export default Header;


