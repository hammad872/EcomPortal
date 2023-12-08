import React, { useState } from "react";
import {  useNavigate } from "react-router-dom"; 
import axios from 'axios'

export const SignupForm = () => {

    const showPwd = () => {
        let openPWd = document.getElementById("pwdOpen");
        let closePWD = document.getElementById("pwdClose");
        let pwdInput = document.getElementById("passwordInputSignup");
    
        if (pwdInput.type === "password") {
            openPWd.style.display = "none";
            closePWD.style.display = "block";
            pwdInput.type = "text";
        } else {
            closePWD.style.display = "none";
            openPWd.style.display = "block";
            pwdInput.type = "password";
        }
    };

    const [username, setUserName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [cnic, setCnic] = useState()
    const [phone, setPhone] = useState()
    const [link, setLink] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post('http://localhost:3001/register', {username, email, password, cnic, phone, link})
        .then(result => {console.log(result)
          navigate('/')
        })
        .catch(error => console.error(error));
    };
    
    
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-2"></div>
          <div className="col-lg-8 py-5">
            <div className="auth-div mt-5">
              <form className="form" onSubmit={handleSubmit}>
                <div className="flex-column">
                  <label>Username </label>
                </div>
                <div className="inputForm">
                <i class="fa fa-user" aria-hidden="true"></i>

                  <input
                    placeholder="Enter your Username"
                    className="input"
                    type="text"
                    onChange={(e) =>setUserName(e.target.value)}
                  />
                </div>

                <div className="flex-column">
                  <label>Phone </label>
                </div>
                <div className="inputForm">
                <i style={{fontSize:'24px'}} class="fa fa-mobile" aria-hidden="true"></i>

                  <input
                    placeholder="Enter your Phone"
                    className="input"
                    type="text"
                    onChange={(e) =>setPhone(e.target.value)}
                  />
                </div>

                <div className="flex-column">
                  <label>CNIC </label>
                </div>
                <div className="inputForm">
                <i style={{fontSize:'20px'}} class="fa fa-id-card-o" aria-hidden="true"></i>

                  <input
                    placeholder="Enter your CNIC Number"
                    className="input"
                    type="number"
                    onChange={(e) =>setCnic(e.target.value)}
                  />
                </div>



                <div className="flex-column">
                  <label>Website Link </label>
                </div>
                <div className="inputForm">
                <i class="fa fa-link" aria-hidden="true"></i>

                  <input
                    placeholder="Enter your Store Link"
                    className="input"
                    type="text"
                    onChange={(e) =>setLink(e.target.value)}
                  />
                </div>






                <div className="flex-column">
                  <label>Email </label>
                </div>
                <div className="inputForm">
                <i class="fa fa-envelope" aria-hidden="true"></i>
                  <input
                    placeholder="Enter your Email"
                    className="input"
                    type="email"
                    onChange={(e) =>setEmail(e.target.value)}
                  />
                </div>





                <div className="flex-column">
                  <label>Password </label>
                </div>
                <div className="inputForm">
                <i class="fa fa-lock" aria-hidden="true"></i>

                  <input
                    id="passwordInputSignup"
                    placeholder="Enter your Password"
                    className="input"
                    type="password"
                    onChange={(e) =>setPassword(e.target.value)}
                  />

                  <div className="show-pwd-div " id="togglePWD" onClick={showPwd}>
                    <i class="fa fa-eye" aria-hidden="true" id="pwdOpen"></i>
                    <i class="fa fa-eye-slash" aria-hidden="true" id="pwdClose"></i>
                  </div>
                </div>



                <div className="flex-row">
                  <div>
                    <input type="radio" />
                    <label className="mx-1">Remember me </label>
                  </div>
                  <span className="span">Forgot password?</span>
                </div>
                <button className="button-submit">Sign Up</button>
                <p className="p">
                  Already have an account? <a href="/"> <span className="span">Login</span></a>
                </p>
                <p className="p line">Or With</p>
                <div className="flex-row">
                  <button className="btn google">
                    <svg
                      xmlSpace="preserve"
                      style={{ enableBackground: "new 0 0 512 512" }}
                      viewBox="0 0 512 512"
                      y="0px"
                      x="0px"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      xmlns="http://www.w3.org/2000/svg"
                      id="Layer_1"
                      width={20}
                      version="1.1"
                    >
                      <path
                        d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256
	c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456
	C103.821,274.792,107.225,292.797,113.47,309.408z"
                        style={{ fill: "#FBBB00" }}
                      />
                      <path
                        d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451
	c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535
	c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z"
                        style={{ fill: "#518EF8" }}
                      />
                      <path
                        d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512
	c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771
	c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z"
                        style={{ fill: "#28B446" }}
                      />
                      <path
                        d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012
	c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0
	C318.115,0,375.068,22.126,419.404,58.936z"
                        style={{ fill: "#F14336" }}
                      />
                    </svg>
                    Google
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-2"></div>
        </div>
      </div>
    </>
  );
};