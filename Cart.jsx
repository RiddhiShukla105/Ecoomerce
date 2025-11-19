import React, { useState,useContext } from 'react'
import './Cart.css'
import { FaHireAHelper } from 'react-icons/fa';
import { useLocation,useParams,Link,useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import Button from './Button';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Cart = () => {
   
   const location=useLocation()
   console.log(location);
   const data = location.state;
  console.log(data);
  const params = useParams();
  console.log(params);
  const navigate=useNavigate()
  //  const token = localStorage.getItem("token");
   
  const{cartItems,removeFromCart,clearCart, increaseQuantity,decreaseQuantity}=useContext(CartContext)

   const total = cartItems.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);
 const pay=()=>{
  toast.info("Project Completed here", {
      position: "top-right",
      autoClose: 2000,
    })
 }


  
  return (
    <>
    <div className='cart_container'>
    <Header/>
    <div style={{marginTop:"8%",marginLeft:"4%"}}>
      {/* <Button name="Back" to="/product"/> */}
      <Button name="Back" onClick={()=>navigate("/product")}/>
    </div>
      <h1 className='ccart'> Your Cart </h1>
      {cartItems.length === 0 ? (
        <div className='bcart'>
        <img src="img\fun-3d-cartoon-teenage-boy-shopping.jpg" alt="" />
        </div>
      ) : (
      <div className="cart_bill" style={{paddingBottom:"14%"}}>
        <table className="cart_table">
            <thead>
              <tr>
                <th className='chead'>Item</th>
                <th className='chead'>Name</th>
                <th className='chead'>Price</th>
                <th className='chead'>Quantity</th>
                <th className='chead'>Amount</th>
                <th className='chead'>Action</th>
                
            </tr>
            </thead>
             {cartItems.map((item) => 
             {console.log("Cart item:", item);
             return(
                <tr key={`${item.productId}-${item.size}-${item.source}`}>
                  <td>
                    {/* <img
                      src={item.image.replace("./", "/")}
                      alt={item.productName}
                       className="cart_img" 
                    /> */}

                   <img
  src={
    item.image?.startsWith("/") || item.image?.startsWith("http")
      ? item.image
      : `http://localhost:4004/uploads/${item.image}`
  }
  alt={item.productName}
  className="cart_img"
/>


                  </td>
                  <td>{item.productName || item.name || "Alpha"}</td>
                  <td>Rs. {item.price}</td>
                  <td>
 <Button name="+" onClick={() => increaseQuantity(item.productId, item.size, item.source)} />
  {item.quantity}
<Button name="-" onClick={() => decreaseQuantity(item.productId, item.size, item.source)} />

</td>
<td>Rs. {item.price * item.quantity}</td>

                  <td>
                    <Button
  name="Remove"
  onClick={() => {
    console.log("Deleting item:", item);
    console.log("productId to send:", item.productId._id || item.productId);
    console.log("size:", item.size);
    console.log("source:", item.source);
    removeFromCart(item.productId._id || item.productId, item.size, item.source);
  }}
/>
                     
                  </td>
                </tr>
              )})}
              <tr>
                <td colSpan="4">
                  <h2>Total</h2>
                </td>
                <td>Rs. {total}</td>
                <td>
                  <Button name="Clear Cart" className="btn btn-warning" onClick={clearCart}/>
                </td>
              </tr>
        </table>
         <div className="pay" onClick={pay}>
          <Button name="Pay Now"/>
         </div>
      </div>
      )}
     
    </div>
    
    <Footer/>
    </>

  )
}

export default Cart
