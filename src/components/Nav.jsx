import { Link, Outlet, useNavigate } from "react-router-dom";
import PINSVG from "../assets/images/pinsvg.svg";
import DUCK from "../assets/images/duck.jpeg";
import { FaSearch } from "react-icons/fa";
import { userActions } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // it checks if user data present in localstorage and if present loads the data redux store
  function localStorageDataToReduxStore() {
    const data = localStorage.getItem("userInfo");
    if (data) {
      let parsedData = JSON.parse(data);
      dispatch(userActions.setUser(parsedData));
    }
    else{
      navigate("/auth")
    }
  }

  useEffect(() => localStorageDataToReduxStore(), []);

  return (
    <>
      <div className="main__nav__container">
        <div className="main__nav__left">
          <Link to={"/"}>
            <img src={PINSVG} alt="logo" />
          </Link>
          {/*<span>Home</span>*/}
          <span className={"main__nav__item"}>explore</span>
          <span className={"main__nav__item"}>Create</span>
        </div>
        <div className="main__nav__middle">
          <FaSearch />

          <input type="text" placeholder={`Search your ideas here...`} />
        </div>
        <div className="main__nav__right">
          <img src={DUCK} alt="" />
        </div>
      </div>

      <Outlet />
    </>
  );
}

export default Nav;
