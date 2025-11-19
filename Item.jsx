import React, { useContext,useState } from "react";
import "./Item.css";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Item = () => {
  const location = useLocation();
  console.log(location);
  const data = location.state;
  console.log(data);
  const params = useParams();
  console.log(params);
  const navegate=useNavigate()
  const {addToCart}=useContext(CartContext)

  const [selectedSize, setSelectedSize] = useState("");


  const handleClick = (e) => {
    if ((data.source === "product" || data.source==="cloth") && !selectedSize) {
      toast.warn("Please select a size before adding to cart.", {
      position: "top-right",
      autoClose: 2000,
    });
      return;
    }

    //include size
    // const itemToAdd={
    //   ...data,
    //   size:data.source==='product'||'cloth',selectedSize:undefined
    // }

    const itemToAdd = {
  ...data,
  selectedSize,
};


    addToCart(itemToAdd);
    toast.success((`${data.productName} ${selectedSize} added to cart!`),{
       position: "top-right",
      autoClose: 2000,
    });
    //  navegate("/cart",{state:e})
    // console.log(`${data.image}`);
  };

  return (
    <>
    <Header/>
      <div className="item-container">
        <div className="container">
          <div className="row">
            <div className="col-md-4 pic">
              {/* <img
                src={data.image.replace("./", "/")}
                alt={data.productName}
                className="hover-zoom"
              /> */}
              <img
  src={
    data.image?.startsWith("/") || data.image?.startsWith("http")
      ? data.image
      : `http://localhost:4004/uploads/${data.image}`
  }
  alt={data.productName}
  className="hover-zoom"
/>

            </div>
            <div className="col-md-8 right">
              <h1 className="brand">{data.productName}</h1>
              <p className="pg">
                {data.desc}Description Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Maiores enim ratione quod ipsam nulla, ut
                possimus eligendi libero ipsa molestiae, laudantium ullam
                accusantium recusandae autem neque reiciendis provident officia
                voluptatum?
              </p>
             

              {/*Conditional Rendering Based on Source */}
            {data.source === "product" ? (
              <div className="size">
                 <div className="sizes">
      {["5", "6", "7", "8"].map((sz) => (
        <button
          key={sz}
          className={`size-btn ${selectedSize === sz ? "active" : ""}`}
          onClick={() => setSelectedSize(sz)}
        >
          {sz}
        </button>
      ))}
    </div>
              </div> 
            ) : (
              <div className="size">
                 <div className="sizes">
      {["S", "M", "L", "XL"].map((sz) => (
        <button
          key={sz}
          className={`size-btn ${selectedSize === sz ? "active" : ""}`}
          onClick={() => setSelectedSize(sz)}
        >
          {sz}
        </button>
      ))}
    </div>
              </div> 
            )}

              <div className="btns">
                <Link to="/product" className="btn btn-danger l1">
                  {" "}
                  Back{" "}
                </Link>
                <button
                  className="btn btn-danger r1"
                  onClick={() => handleClick(data)}
                >
                  {" "}
                  Add To Cart{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Item;
