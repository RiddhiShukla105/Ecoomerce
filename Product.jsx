// import React,{useContext,useEffect,useState} from 'react'
// import './Product.css'
// import { Zoom } from 'react-slideshow-image';
// import 'react-slideshow-image/dist/styles.css'
// import { ThemeContext } from '../../context/themeContext';
// import axios from 'axios';
// import {Link, useNavigate} from 'react-router-dom';
// import Button from './Button';
// import Header from '../header/Header';
// import Footer from '../footer/Footer.jsx'


// const testimonail=[
//   {
//     name:"Rajeev",
//     star:"✨✨✨✨✨",
//     msg:"Outstanding Product",
//     desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum itaque illo omnis"
//   },
//   {
//     name:"Sajeev",
//     star:"✨✨✨",
//     msg:"Easy Comfort",
//     desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum itaque illo omnis"
//   },
//   {
//     name:"Maneet",
//     star:"✨✨✨✨",
//     msg:"Same as shown in pic",
//     desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum itaque illo omnis"
//   },
//   {
//     name:"Sumit",
//     star:"✨✨",
//     msg:"Comfortable Material",
//     desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum itaque illo omnis"
//   }
// ]

// const pic=[
//   {
//   img:'/shoe/red.jpg'
//   },
//   {
//   img:'/shoe/red2.jpg'
//   },
//   {
//   img:'/shoe/red3.jpg'
//   },
//   {
//   img:'/shoe/red4.jpg'
//   }
// ]

// const zoomOutProperties = {
//   duration: 2000,
//   transitionDuration: 500,
//   infinite: true,
//   indicators: true,
//   scale: 0.4,
//   arrows: true
// };

// const Product = () => {

//     //  const {theme,handleOnClick}=useContext(ThemeContext);
//      const[item,setItem]=useState([]);

//     const navigate=useNavigate();

//     // const handleClick=(e)=>{
//     //       console.log(e);
//     //       navigate(`/product/${e.id}`,{state:e})
//     // }

//     const handleClick = (e) => {
//     navigate(`/product/${e.id}`, { state: { ...e, source: "product" } });
//     };


//     useEffect(() => {
//     // axios.get("http://localhost:3006/product")
//     axios.get("http://localhost:4004/product")
//       .then((res)=>{
//         console.log("API Response:",res.data);   // <-- Check here
//         setItem(res.data);                       // <-- use res.data, not res
//       })
//       .catch((err)=>{
//         console.error("Error fetching products:", err);
//       });
//   },[]);

//   return (
//     <>
//         <Header active="Shoe"/>
//         <div className="product_container">
//              <div className="slide-container" >
//         <Zoom {...zoomOutProperties}>
//           {
//             pic.map((each, index) => <img key={index}  src={each.img} />)
//           }
//         </Zoom>
//       </div>

//         {/* product */}
//             <div className="products">
//                 <h2 className="collection">Our Latest Collection</h2>
//                 <div className="product_card">
//                 {item.map((data,id)=>(
//                     <div className="card" style={{width:"18rem"}} key={id}>
//                     <img src={data.image} className="card-img-top" alt="..."/>
//                     <div className="card-body">
//                         <h5 className="card-title" style={{fontWeight:"bolder"}}>{data.productName}</h5>
//                         <h6 className="card-title">{data.category}</h6>
//                         <p className="card-text">{data.desc}</p>
//                         <p className="card-text" style={{fontWeight:"bold",fontSize:"24px"}}>Rs. {data.price}</p>
//                         {/* <button to="/" onClick={()=>handleClick(item)} className="btn btn-primary">Buy</button> */}
//                         <div style={{display:"flex" , justifyContent:"space-between"}}>
//                          <Button name="Buy" onClick={() => handleClick(data)}/>
//                          <Button name="View More" onClick={() => handleClick(data)}/>
//                         </div>
//                     </div>
//                     </div>
//                 ))}
                    
//                 </div>
//             </div>
//             <div className='poster'>
//                 <img src="./shoe/red.jpg" alt="" />
//             </div>

//             {/*Testimonails */}

//             <h1 className="collection">Our Happy Customers</h1>
//             <div className="container" style={{marginBottom:"8%"}}>
//             {testimonail.map((each)=>(

//               <div className="col-md-3">
//                 <div className="card" style={{padding:"5%"}}>
//               <h1>{each.name}</h1>
//               <h3>{each.star}</h3>
//               <h3>{each.msg}</h3>
//                <p className="card-text" style={{marginTop:"3%",fontSize:"24px",fontWeight:"200"}}>{each.desc}</p>
//             </div>
//               </div>

//             ))}
              
//             </div>
//       </div>
//          <Footer/>
//     </>
//   )
// }

// export default Product

import React,{useContext,useEffect,useState,useRef} from 'react'
import './Product.css'
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { ThemeContext } from '../../context/themeContext';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
// import Button from './Button';
import Header from '../header/Header';
import Footer from '../footer/Footer.jsx'
import { Button } from "primereact/button";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Rating } from "primereact/rating";
import { FaStar, FaRegStar } from "react-icons/fa";



const testimonail=[
  {
    name:"Rajeev",
    star:"✨✨✨✨✨",
    msg:"Outstanding Product",
    desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum itaque illo omnis"
  },
  {
    name:"Sajeev",
    star:"✨✨✨",
    msg:"Easy Comfort",
    desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum itaque illo omnis"
  },
  {
    name:"Maneet",
    star:"✨✨✨✨",
    msg:"Same as shown in pic",
    desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum itaque illo omnis"
  },
  {
    name:"Sumit",
    star:"✨✨",
    msg:"Comfortable Material",
    desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum itaque illo omnis"
  }
]

const pic=[
  {
  img:'/shoe/red.jpg'
  },
  {
  img:'/shoe/red2.jpg'
  },
  {
  img:'/shoe/red3.jpg'
  },
  {
  img:'/shoe/red4.jpg'
  }
]

const zoomOutProperties = {
  duration: 2000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  scale: 0.4,
  arrows: true
};

const Product = () => {

    //  const {theme,handleOnClick}=useContext(ThemeContext);
     const[item,setItem]=useState([]);
const [products, setProducts] = useState([]);
    const navigate=useNavigate();
     const [showMenu, setShowMenu] = useState(false);
      const menuRef = useRef(null);
      const [filteredProducts, setFilteredProducts] = useState(products);
      const [priceFilter, setPriceFilter] = useState(""); // "low" or "high"
      const [brandFilter, setBrandFilter] = useState([]); // ["Soch", "Sanch"]
    

    // const handleClick=(e)=>{
    //       console.log(e);
    //       navigate(`/product/${e.id}`,{state:e})
    // }

    const handleClick = (e) => {
    navigate(`/product/${e.id}`, { state: { ...e, source: "product" } });
    };


    useEffect(() => {
    // axios.get("http://localhost:3006/product")
    axios.get("http://localhost:4004/product")
      .then((res)=>{
        console.log("API Response:",res.data);   // <-- Check here
        setItem(res.data);                       // <-- use res.data, not res
      })
      .catch((err)=>{
        console.error("Error fetching products:", err);
      });
  },[]);

  useEffect(() => {
  if (item.length > 0) {
    setFilteredProducts(item); // show all products by default
  }
}, [item]);

  
      // 🔹 Close menu when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setShowMenu(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
  
  
     // 🔹 Handle brand checkbox toggling
    const handleBrandChange = (brand) => {
      setBrandFilter((prev) =>
        prev.includes(brand)
          ? prev.filter((b) => b !== brand)
          : [...prev, brand]
      );
    };
  
    // 🔹 Apply filters when user clicks "Apply"
    const handleApplyFilters = () => {
      let filtered = [...item];
  
      // Filter by brand
      if (brandFilter.length > 0) {
        filtered = filtered.filter((p) => brandFilter.includes(p.productName));
      }
  
      // Sort by price
      if (priceFilter === "low") {
        filtered.sort((a, b) => a.price - b.price);
      } else if (priceFilter === "high") {
        filtered.sort((a, b) => b.price - a.price);
      }
  
      setFilteredProducts(filtered);
      setShowMenu(false);
    };

   const itemTemplate = (product) => {
      if (!product) return null;
  
        return (
          <div className="product-card" key={product.id}>
  <div className="product-image-container">
    {/* <img
      src={product.image}
      alt={product.productName}
      className="product-image"
    /> */}
    <img
  src={`http://localhost:4004/uploads/${product.image}`}
  alt={product.productName}
  className="product-image"
/>

Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum vero facere
  </div>
  <h3>{product.productName}</h3>
  <Rating value={4} readOnly cancel={false} className="star" />
  <span className="product-price">₹{product.price}</span>
  <Button
    icon="pi pi-shopping-cart"
    className="cart-btn p-button-rounded p-button-success"
    onClick={() => handleClick(product)}
  />
</div>

        );
      }

  return (
    <>
        <Header active="Shoe"/>
        <div className="product_container">
             <div className="slide-container" >
        <Zoom {...zoomOutProperties}>
          {
            pic.map((each, index) => <img key={index}  src={each.img} />)
          }
        </Zoom>
      </div>

        {/* product */}
            <div className="products">
                <h2 className="collection">Our Latest Collection</h2>
                 <div className="filter-container" ref={menuRef}>
      {/* Filter Icon */}
      <div className="filter-icon" onClick={() => setShowMenu(!showMenu)}>
        <i className="pi pi-filter-fill"></i>
      </div>

      {/* Filter Menu */}
      {showMenu && (
        <div className="price_filter_b">
          <div className="filter-header">
            <i className="pi pi-filter-fill"></i>
            <h3>Filter Options</h3>
          </div>

          <div className="filter-section">
            <h4>Price Range</h4>
            <label>
              <input type="radio" name="price" checked={priceFilter === "low"}
      onChange={() => setPriceFilter("low")}/> Low to High
            </label>
            <label>
              <input type="radio" name="price" checked={priceFilter === "high"}
      onChange={() => setPriceFilter("high")} /> High to Low
            </label>
          </div>

          <div className="filter-section">
            <h4>Brand Preference</h4>
            <label>
              <input type="checkbox" name="brand" checked={brandFilter.includes("Nike")}
      onChange={() => handleBrandChange("Nike")}/> Nike
            </label>
            <label>
              <input type="checkbox" name="brand" checked={brandFilter.includes("Jordan")}
      onChange={() => handleBrandChange("Jordan")}/> Jordan
            </label>
            <label>
              <input type="checkbox" name="brand" checked={brandFilter.includes("Puma")}
      onChange={() => handleBrandChange("Puma")}/> Nike
            </label>
            <label>
              <input type="checkbox" name="brand" checked={brandFilter.includes("Metro")}
      onChange={() => handleBrandChange("Metro")}/> Metro
            </label>
            <label>
              <input type="checkbox" name="brand" checked={brandFilter.includes("Adidas")}
      onChange={() => handleBrandChange("Adidas")}/> Adidas
            </label>
          </div>

          <button className="apply-btn" onClick={handleApplyFilters}>Apply Filters</button>
        </div>
      )}
    </div>
               <DataView
                 value={filteredProducts}
                 layout="grid"
                 itemTemplate={itemTemplate}
                 header={""}
               />
            </div>
            <div className='poster'>
                <img src="./shoe/red.jpg" alt="" />
            </div>

            {/*Testimonails */}

            <h1 className="collection">Our Happy Customers</h1>
            {/* <div className="container" style={{marginBottom:"8%"}}>
            {testimonail.map((each)=>(

              <div className="col-md-3">
                <div className="card" style={{padding:"5%"}}>
              <h1>{each.name}</h1>
              <h3>{each.star}</h3>
              <h3>{each.msg}</h3>
               <p className="card-text" style={{marginTop:"3%",fontSize:"24px",fontWeight:"200"}}>{each.desc}</p>
            </div>
              </div>

            ))}
              
            </div> */}

            <div className="container my-5">
  <div className="row g-4">
    {testimonail.map((each, index) => (
      <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
        <div className="testimonial-card shadow p-4 text-center">

          <div className="testimonial-avatar mb-3">
            <img
              src={`https://ui-avatars.com/api/?name=${each.name}&background=random`}
              alt={each.name}
            />
          </div>

          <h5 className="fw-bold mb-2">{each.name}</h5>

          <div className="text-warning mb-2" style={{ fontSize: "18px" }}>
           <h3>{each.star}</h3>
          </div>

          <p className="text-secondary fw-semibold mb-2">{each.msg}</p>

          <p className="testimonial-desc">{each.desc}</p>
        </div>
      </div>
    ))}
  </div>
</div>

      </div>
         <Footer/>
    </>
  )
}

export default Product



