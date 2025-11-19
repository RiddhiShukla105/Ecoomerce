// import React, { useEffect, useState } from 'react'
// import { Zoom } from 'react-slideshow-image';
// import 'react-slideshow-image/dist/styles.css'
// import './Cloth.css'
// import Header from '../header/Header';
// import Button from './Button';
// import Footer from '../footer/Footer';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios'


// const item=[
//     {
//         image:"/img/c7.jpg"
//     },
//      {
//         image:"/img/c8.jpg"
//     },
//      {
//         image:"/img/c9.jpg"
//     },
//      {
//         image:"/img/c10.jpg"
//     },
// ]



// const zoomOutProperties = {
//   duration: 2000,
//   transitionDuration: 500,
//   infinite: true,
//   indicators: true,
//   scale: 0.4,
//   arrows: true
// };

// const Cloth = () => {
//     const [cloth,setCloth]=useState([])
//     const navigate=useNavigate()
//     const handleClick = (e) => {
//   navigate(`/product/${e.id}`, { state: { ...e, source: "cloth" } });
// };


//    useEffect(()=>{
//     axios.get("http://localhost:4004/cloth")
//     .then((res)=>{
//         setCloth(res.data);
//     }).catch((err)=>{
//         console.log(err);
        
//     })
//    },[])
//   return (
//     <>
//         <Header active="Cloth"/>
//         <div className='hi'>
//       <div className="slide-container" >
//               <Zoom {...zoomOutProperties}>
//                 {
//                   item.map((each, index) => <img key={index}  src={each.image} />)
//                 }
//               </Zoom>
//             </div>
//                 <h2 className="collection">Our Latest Collection</h2>
//         <div className="product_card">
//                         {cloth.map((data,id)=>(
//                             <div className="card" style={{width:"18rem"}} key={id}>
//                             <img src={data.image}  style={{width:"100%"}} className="card-img-top" alt="..."/>
//                             <div className="card-body">
//                                 <h5 className="card-title" style={{fontWeight:"bolder"}}>{data.productName}</h5>
//                                 <p className="card-text" style={{fontWeight:"bold",fontSize:"24px"}}>Rs. {data.price}</p>
//                                 {/* <button to="/" onClick={()=>handleClick(item)} className="btn btn-primary">Buy</button> */}
//                                 <div style={{display:"flex" , justifyContent:"space-between"}}>
//                                  <Button name="Buy" />
//                                  <Button name="View More" onClick={() => handleClick(data)}/>
//                                 </div>
//                             </div>
//                             </div>
//                         ))}
                            
//                         </div>
//     </div>

//     <Footer/>
//     </>
//   )
// }

// export default Cloth


import React, { useEffect, useState,useRef } from 'react'
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import './Cloth.css'
import Header from '../header/Header';
// import Button from './Button';
import Footer from '../footer/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Button } from "primereact/button";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Rating } from "primereact/rating";



const item=[
    {
        image:"/img/c7.jpg"
    },
     {
        image:"/img/c8.jpg"
    },
     {
        image:"/img/c9.jpg"
    },
     {
        image:"/img/c10.jpg"
    },
]



const zoomOutProperties = {
  duration: 2000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  scale: 0.4,
  arrows: true
};

const Cloth = () => {
    const [cloth,setCloth]=useState([])
    const navigate=useNavigate()
//     const handleClick = (e) => {
//   navigate(`/product/${e.id}`, { state: { ...e, source: "cloth" } });
// };

const handleClick = (product) => {
  const imageUrl = product.image?.startsWith("/") || product.image?.startsWith("http")
    ? product.image // old products
    : `http://localhost:4004/uploads/${product.image}`; // new uploaded products

  navigate(`/product/${product.id}`, { 
    state: { 
      ...product, 
      image: imageUrl,   // 👈 send proper URL
      source: "cloth" 
    } 
  });
};


  const [products, setProducts] = useState([]);
   const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [priceFilter, setPriceFilter] = useState(""); // "low" or "high"
  const [brandFilter, setBrandFilter] = useState([]); // ["Soch", "Sanch"]


   useEffect(()=>{
    axios.get("http://localhost:4004/cloth")
    .then((res)=>{
        setCloth(res.data);
        setFilteredProducts(res.data);
    }).catch((err)=>{
        console.log(err);
        
    })
   },[])

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
    let filtered = [...cloth];

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
        <Header active="Cloth"/>
        <div className='hi'>
      <div className="slide-container" >
              <Zoom {...zoomOutProperties}>
                {
                  item.map((each, index) => <img key={index}  src={each.image} />)
                }
              </Zoom>
            </div>
                {/* <h2 className="collection">Our Latest Collection</h2> */}
         <div className="cardd">
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
              <input type="checkbox" name="brand" checked={brandFilter.includes("Soch")}
      onChange={() => handleBrandChange("Soch")}/> Soch
            </label>
            <label>
              <input type="checkbox" name="brand" checked={brandFilter.includes("Sanch")}
      onChange={() => handleBrandChange("Sanch")}/> Sanch
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
    </div>

    <Footer/>
    </>
  )
}

export default Cloth

