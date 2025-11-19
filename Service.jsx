import React from 'react'
import './Service.css'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Button from '../product/Button'


const images = [
  {
    original: "/img/c1.jpg",
    thumbnail: "/img/c1.jpg",
  },
  {
    original: "/img/c2.jpg",
    thumbnail: "/img/c2.jpg",
  },
  {
    original: "/img/c3.jpg",
    thumbnail:"/img/c3.jpg",
  },
  {
    original: "/img/c4.jpg",
    thumbnail:"/img/c4.jpg",
  },
  {
    original: "/img/c5.jpg",
    thumbnail:"/img/c5.jpg",
  }
];


const Service = () => {
    
  return (
    <>
    <Header active="Service"/>
      <div className="top1">
        <div className="head">Services We Provide</div>
       <div className="btn-wrapper">
         <Button name="Explore More"/>
       </div>
      </div>
      <div className="alt">Alteration</div>
      <div className="top2">
        <div className="left">
            <img src="\img\hands-woman-sewing-face-masks.jpg" alt="" />
        </div>
        <div className="rightt">
            <span className='alt'>Clothes Not Fitting? We have a Solution</span>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur labore inventore nostrum neque ullam, exercitationem a, nihil fuga in similique iure cumque dolorem recusandae facilis. Deleniti aliquam ut placeat nulla!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur labore inventore nostrum neque ullam, 
            </p>
        </div>
      </div>
      <div className="alt">Customize</div>
      <div className="top2">
        <div className="left">
            <img src="\img\modern-equipped-computer-lab.jpg" alt="" />
        </div>
        <div className="rightt">
            <span className='alt'>Want something with a personal touch? We are here for you!!</span>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur labore inventore nostrum neque ullam, exercitationem a, nihil fuga in similique iure cumque dolorem recusandae facilis. Deleniti aliquam ut placeat nulla!
            </p>
        </div>
      </div>
      <div className="alt">Our Previous Work</div>
        <div className="work">
            <ImageGallery items={images} className="work"   showThumbnails={false}/>
        </div>
      <Footer/>
    </>
  )
}

export default Service
