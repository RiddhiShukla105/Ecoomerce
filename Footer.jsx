import React from 'react'
import './footer.css'


const Footer = () => {
  return (
    <>
      <div className="footer">
        {/* <div className="container f1">
            <div className="row">
                <div className="col-md-8">Stay Upto Date About</div>
                <div className="col-md-4"><input type="search" name="" id="" placeholder='Enter your Email address....' /></div>
            </div>
             <div className="row">
                <div className="col-md-8">Our Latest Offers</div>
                <div className="col-md-4"><input type="search" name="" id="" placeholder='Subscribe to news letter' /></div>
            </div>
        </div> */}
        <div className="container-fluid f2">
        <div className="row">
            <div className="col-md-4 format f3">
                <h3 className='shop'>Ekart</h3>
                <p className='shop2'>We have shoes that suit your style and which you are proud to wear. From women to men.</p>
                <div className='icons'>
                <i class="fa fa-github" aria-hidden="true"></i>
                <i class="fa fa-instagram" aria-hidden="true"></i>
                <i class="fa fa-linkedin-square" aria-hidden="true"></i>
                <i class="fa fa-facebook-official" aria-hidden="true"></i>
                </div>
            </div>
            <div className="col-md-2 format">
  <h4>COMPANY</h4>
  <ul>
    <li>About</li>
    <li>Features</li>
    <li>Work</li>
    <li>Career</li>
  </ul>
</div>

<div className="col-md-2 format">
  <h4>HELP</h4>
  <ul>
    <li>Customer Support</li>
    <li>Delivery Details</li>
    <li>Terms & Conditions</li>
    <li>Privacy Policy</li>
  </ul>
</div>

<div className="col-md-2 format">
  <h4>FAQ</h4>
  <ul>
    <li>Account</li>
    <li>Manage Account</li>
    <li>Order</li>
    <li>Payment</li>
  </ul>
</div>

<div className="col-md-2 format">
  <h4>RESOURCES</h4>
  <ul>
    <li>Free e-Books</li>
    <li>Development Tutorial</li>
    <li>YouTube Playlist</li>
    <li>How-to Blog</li>
  </ul>
</div>

        </div>
             <hr />
             <div className="bottom">
                Shop.co <i class="fa fa-copyright"></i> 2000-2003. All Rights Reserved.
             </div>
        </div>
       
        
      </div>
    </>
  )
}

export default Footer
