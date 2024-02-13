import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
// import withReactContent from 'sweetalert2-react-content';

// const MySwal = withReactContent(Swal);

export const LoginForm = ({ setLoggedIn }) => {
  const showPwd = () => {
    let openPWd = document.getElementById("pwdOpen");
    let closePWD = document.getElementById("pwdClose");
    let pwdInput = document.getElementById("passwordInputLogin");

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

  const [password, setPassword] = useState("");
  const [inputValue, setInputValue] = useState(""); // Single input for email or username
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Determine whether the input is an email or username
    const isEmail = inputValue.includes("@");
    const dataToSend = isEmail
      ? { email: inputValue, password }
      : { username: inputValue, password };

    axios
      .post("http://localhost:3001/login", dataToSend)
      .then((result) => {
        console.log(result);

        if (result.data.message === "Login success") {
          // Successful login, redirect to home
          navigate("/dashboard");
          
          let data = isEmail ? { email: inputValue } : { username: inputValue };
          localStorage.setItem("loginToken", JSON.stringify(result.data.user));
          // console.log(localStorage.getItem("loginToken"));
          Swal.fire({
            icon: "success",
            title: "Login Success",
          });
        } else {
          // Handle other cases, e.g., incorrect password, user not found
          console.log("Login failed:", result.data.error);
          Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: result.data.error,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Username Or Password is incorrect",
          text: "Check Your Username Or Password!",
          confirmButtonText: "Try Again !",
        });
      });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-2"></div>
          <div className="col-lg-8 py-5">
            <div className="auth-div mt-5">
              <img src="\assets\logo-black.png" alt="" />
              <form className="form" onSubmit={handleSubmit}>
                <div className="flex-column">
                  <label>Email or Username </label>
                </div>
                <div className="inputForm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    viewBox="0 0 32 32"
                    height={20}
                  >
                    <g data-name="Layer 3" id="Layer_3">
                      <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z" />
                    </g>
                  </svg>
                  <input
                    className="input"
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter Your Email or Username"
                  />
                </div>
                <div className="flex-column">
                  <label>Password </label>
                </div>
                <div className="inputForm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    viewBox="-64 0 512 512"
                    height={20}
                  >
                    <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" />
                    <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" />
                  </svg>
                  <input
                    placeholder="Enter your Password"
                    id="passwordInputLogin"
                    className="input"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <div
                    className="show-pwd-div "
                    id="togglePWD"
                    onClick={showPwd}
                  >
                    <i className="fa fa-eye" aria-hidden="true" id="pwdOpen"></i>
                    <i
                      className="fa fa-eye-slash"
                      aria-hidden="true"
                      id="pwdClose"
                    ></i>
                  </div>
                </div>
                <button className="button-submit">Login</button>
              </form>
            </div>
          </div>
          <div className="col-lg-2"></div>
        </div>
      </div>
    </>
  );
};
