import React, { useState, useRef, useEffect, useContext } from "react";
// import { Link } from 'react-router-dom'
import "./style.css";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Button from "../product/Button";
import { Link } from "react-router-dom";

// import { ThemeContext } from '../../context/themeContext';

function Sign() {
  const inputRef = useRef(null);
  const [state, setState] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpass: "",
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handler = (event) => {
    // inputRef.current.focus();
    const { name, value } = event.target;
    // console.log(name+" "+value);

    setState({ ...state, [name]: value });
  };
  const saveData = async (event) => {
    event.preventDefault();

    
  if (!state.fname || !state.lname || !state.email || !state.password || !state.cpass) {
    Swal.fire({ icon: "warning", title: "Please fill all fields" });
    return;
  }

     if (state.password !== state.cpass) {
    Swal.fire({ icon: "error", title: "Passwords do not match" });
    return;
  }

    const userData = {
      name: `${state.fname} ${state.lname}`,
      email: state.email,
      password: state.password,
    };
    try {
      const res = await axios.post("http://localhost:4004/sign", userData);
      console.log("Response:", res.data);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "You have signed up!",
        showConfirmButton: false,
        timer: 1500,
      });

      event.target.reset();
    } catch (err) {
      console.error("Error:", err);
      Swal.fire({
        icon: "error",
        title: "Signup failed",
        text: err.message,
      });
    }
  };
  return (
    <>
    <Header/>
      {/*Sign-form */}

      <div className="cont">
        <div className="signup-container">
          <div className="head1">Create Account</div>
          {/* <div className="head2">Join our community and start your journey</div> */}
          <form action="#" onSubmit={saveData}>
            <div className="grp">
              <div className="name">
                <div className="label">
                  <h4>First Name</h4>
                  <input
                    type="text"
                    ref={inputRef}
                    name="fname"
                    id="fname"
                    onChange={handler}
                  />
                </div>
                <div className="label">
                  <h4>Last Name</h4>
                  <input
                    type="text"
                    name="lname"
                    id="lname"
                    onChange={handler}
                  />
                </div>
              </div>
            </div>
            <div className="grp">
              <h4>Email Address</h4>
              <input type="text" name="email" id="email" onChange={handler} />
            </div>
            <div className="grp">
              <h4>Password</h4>
              <input type="text" name="password" id="pass" onChange={handler} />
            </div>
            <div className="grp">
              <h4>Confirm Password</h4>
              <input type="text" name="cpass" id="cpass" onChange={handler} />
            </div>
            <div className="grp">
              <div className="check">
                <span>
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    style={{  marginRight: "10px" }}
                  />
                </span>
                <span>
                  <h5>I agree to terms and conditions</h5>
                </span>
              </div>
            </div>
           <div className="btnnn">
             <Button name="Create Account" className="account_btn"/>
           </div>
            <h6 style={{ textAlign: "center",marginTop:"2%" }}>
              Already have an account? <Link to='/login'>Sign-in</Link>
            </h6>
          </form>
          {/* <div className="other">
            <div className="btn">
              <button className="other-btn">Google</button>
              <button className="other-btn" style={{ color: "#00008b" }}>
                Twitter
              </button>
              <button className="other-btn" style={{ color: "#5050ff" }}>
                Facebook
              </button>
            </div>
          </div> */}
        </div>
      </div>
      {/* <Footer/> */}
    </>
  );
}

export default Sign;
