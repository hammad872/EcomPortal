import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

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

  const [username, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [cnic, setCnic] = useState();
  const [phone, setPhone] = useState();
  const [link, setLink] = useState();
  const [role, setRole] = useState();
  const [slug, setSlug] = useState();
  const navigate = useNavigate();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   axios.post('https://my-node-app-nsih.onrender.com/register', {username, email, password, cnic, phone, link})
  //     .then(result => {console.log(result)
  //       navigate('/')
  //       window.location.reload();
  //     })
  //     .catch(error => console.error(error));
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://my-node-app-nsih.onrender.com/register", {
        username,
        email,
        password,
        cnic,
        phone,
        link,
        slug,
        role,
      })
      .then((result) => {
        console.log(result);
        window.location.reload();
        navigate("/");
        window.location.reload();
      })
      .catch((error) => {
        if (error.response.data.error === "Username already exists") {
          Swal.fire({
            icon: "warning",
            title: "Username already exists",
            text: error.response.data.error,
          });
        } else if (error.response) {
          Swal.fire({
            icon: "warning",
            title: error.response,
            text: error.response.data.error,
          });
        } else if (error.response.status === 400) {
          Swal.fire({
            icon: "warning",
            title: error.response.status,
          });
        } else {
          Swal.fire({
            icon: "warning",
            title: error,
            text: error.response,
          });
        }
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
                  <label>Username </label>
                </div>
                <div className="inputForm">
                  <i class="fa fa-user" aria-hidden="true"></i>

                  <input
                    placeholder="Enter your Username"
                    className="input"
                    type="text"
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div className="flex-column">
                  <label>Slug </label>
                </div>
                <div className="inputForm">
                  <i class="fa fa-slack" aria-hidden="true"></i>

                  <input
                    placeholder="Enter the SLUG"
                    className="input"
                    type="text"
                    
                    onChange={(e) => setSlug(e.target.value)}
                  />
                </div>
                  <small>eg. SH, GH ,AB</small>

                <div className="flex-column">
                  <label>Phone </label>
                </div>
                <div className="inputForm">
                  <i
                    style={{ fontSize: "24px" }}
                    class="fa fa-mobile"
                    aria-hidden="true"
                  ></i>

                  <input
                    placeholder="Enter your Phone"
                    className="input"
                    type="number"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="flex-column">
                  <label>CNIC </label>
                </div>
                <div className="inputForm">
                  <i
                    style={{ fontSize: "20px" }}
                    class="fa fa-id-card-o"
                    aria-hidden="true"
                  ></i>

                  <input
                    placeholder="Enter your CNIC Number"
                    className="input"
                    type="number"
                    onChange={(e) => setCnic(e.target.value)}
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
                    onChange={(e) => setLink(e.target.value)}
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
                    onChange={(e) => setEmail(e.target.value)}
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
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <div
                    className="show-pwd-div "
                    id="togglePWD"
                    onClick={showPwd}
                  >
                    <i class="fa fa-eye" aria-hidden="true" id="pwdOpen"></i>
                    <i
                      class="fa fa-eye-slash"
                      aria-hidden="true"
                      id="pwdClose"
                    ></i>
                  </div>
                </div>

                <div className="flex-column">
                  <select
                    id="role"
                    name="role"
                    autoComplete="country-name"
                    className="form-input2"
                    required
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option>Please Enter Role</option>
                    <option>Admin</option>
                    <option>Client</option>
                  </select>
                </div>

                <button className="button-submit">Sign Up</button>
                <p className="p">
                  Already have an account?
                  <a href="/">
                    <span className="span">Login</span>
                  </a>
                </p>
              </form>
            </div>
          </div>
          <div className="col-lg-2"></div>
        </div>
      </div>
    </>
  );
};