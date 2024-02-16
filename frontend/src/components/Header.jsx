import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [divVisible, setDivVisible] = useState(false);

  const handleAccountCard = () => {
    // Toggle the visibility state
    setDivVisible(!divVisible);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loginToken");
    navigate("/");
  };

  
  let userData = JSON.parse(localStorage.getItem("loginToken"));
  const [innerUsername, setUser_name] = useState();
  const [innerWebsite, setUser_website] = useState();
  const [innerEmail, setUser_email] = useState();
  const [innerSlug, setUser_slug] = useState()

  useEffect(() => {
    // This code will run when the component mounts
    setUser_name(userData.userInfo.username);
    setUser_website(userData.userInfo.email);
    setUser_email(userData.userInfo.link);
    setUser_slug(userData.userInfo.slug)
  }, [userData.userInfo.username,userData.userInfo.email,userData.userInfo.link,userData.userInfo.slug]); // The empty dependency array ensures this effect runs only once


  return (
    <header className="dashboard-header">
      <div className="d-flex justify-content-end pt-2 px-3">
        <div className="text-right user_div mx-2">
          <div className="user_profile_icon" onClick={handleAccountCard}>
            {innerSlug}
          </div>
          {divVisible && (
            <div className="card p-5" id="profile_card">
              <div
                className="card__title text-uppercase"
              > {innerUsername}</div>
              <div
                className="card__subtitle"
              >
                {innerWebsite}
              </div>
              <div
                className="card__title "
              >
                <a  href={"https://"+innerEmail} target="_blank">{innerEmail}</a>
              </div>
              
              <div className="card__wrapper">
                <button className="card__btn mx-1" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="notification-container">
          <div className="text-right bell-noti mx2">
            <button className="button">
              <svg viewBox="0 0 448 512" className="bell">
                <path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"></path>
              </svg>
              <div className="notification-number">5</div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;