import { Link } from "react-router-dom";
import LOGO from "../assets/images/icon.png";
import HERO from "../assets/images/hero.png";

import SignUp from "./SignUp";
import { useState } from "react";



function HomeNav() {
  return (
    <div className="container">
      <div className="left">
        <Link to="/" className="logo">
          {/* Image */}

          <img src={LOGO} alt="" className="logo__img" />
          <span className="logo__text">Pinterest</span>
        </Link>
        <span className="nav__item">Today</span>
        <span className="nav__item">Watch</span>
        <span className="nav__item">Explore</span>
      </div>
      <div className="right">
        <button className="btn btn__red nav__btn">Login</button>
        <button className="btn btn__grey nav__btn">Signup</button>
      </div>
    </div>
  );
}
function HomeFooter() {
  return (
    <div className="footer__container">
      <span className="footer__el">Terms and condition</span>
      <span className="footer__el">Privacy Policy</span>
      <span className="footer__el">Help</span>
      <span className="footer__el">Users</span>
      <span className="footer__el">iPhone app</span>
      <span className="footer__el">Android app</span>
    </div>
  );
}

function Auth() {
  const [toggleLogin, setToggleLogin] = useState(true);

  // if toggleLogin == true ==> signup component , else login component
  if (toggleLogin) {
    console.log("Loggin");
  } else {
    console.log("false");
  }

  function toggleHandler() {
    setToggleLogin((prev) => !prev);
  }
  return (
    <>
      <HomeNav />
      <div className="hero__container">
        <div className="hero__background">
          <img src={HERO} alt="hereIng" className="hero__img" />
        </div>
        <div className="hero__section">
          <div className="hero__left">
            <h1 className="hero__text">Signup to get your ideas</h1>
          </div>

          <div className="hero__right">
            <SignUp toggle={toggleHandler} login = {toggleLogin} />
          </div>
        </div>
      </div>
      <HomeFooter />
    </>
  );
}

export default Auth;
