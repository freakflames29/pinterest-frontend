import { Link } from "react-router-dom";
import LOGO from "../assets/images/icon.png";
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
  return <h1>Home footer</h1>;
}

function Auth() {
  return (
    <>
      <HomeNav />
      {/* <h1>Home bar</h1>
      <HomeFooter /> */}
    </>
  );
}

export default Auth;
