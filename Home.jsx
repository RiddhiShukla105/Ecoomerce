import React from 'react'
import './Home.css'
import Button from '../product/Button'
import Header from '../header/Header'
import Footer from '../footer/Footer'

const Home = () => {
    
  return (
    <>
    <Header active="Home"/>
    <div style={{paddingBottom:"12%"}}>
       <div className="top1">
            <p>Match Your Style With Our Collection</p>
            <div className='btn-wrapper'>
                <Button name="Let's Get Started"  to="/product" />
            </div>
            
        </div>
         <h1 className='a'>About Us</h1>
        <div className="about">
            <div className="left">
                <img src="/img/about_img.png" alt="" />
            </div>
            <div className="right">
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla nihil expedita optio excepturi qui laborum voluptatum aliquid maiores, libero temporibus perspiciatis. Cupiditate nesciunt, quasi adipisci ipsum alias ea facilis consequuntur.Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla nihil expedita optio excepturi qui laborum voluptatum aliquid maiores, libero temporibus perspiciatis. Cupiditate nesciunt, quasi adipisci ipsum alias ea facilis consequuntur.
                </p>
            </div>
        </div>
        <h1 className='a'>Any Query ?</h1>
        <div className="about">
            <div className="left">
                <img src="/img/contact_img.png" alt="" />
            </div>
            <div className="right">
            <div className="b">
            <div>Write to Us....</div>
            </div>
                <form action="">
                    <div className='query'>
                        <input type="text" name="" id="" placeholder='Enter your name' />
                    </div>
                    <div className='query'>
                        <input type="email" name="" id="" placeholder='Enter your email' />
                    </div>
                    <div className='query'>
                        <textarea name="" id="" rows="5"></textarea>
                    </div>
                     <Button name="Submit"/>
                </form>
            </div>
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default Home
