import { Link, Outlet } from "react-router-dom";
import PINSVG from "../assets/images/pinsvg.svg"
import DUCK from "../assets/images/duck.jpeg"
import { FaSearch } from "react-icons/fa";

function Nav() {
  return (
    <>
        <div className="main__nav__container">
            <div className="main__nav__left">
                <img src={PINSVG} alt="logo"/>
                {/*<span>Home</span>*/}
                <span className={"main__nav__item"}>explore</span>
                <span className={"main__nav__item"}>Create</span>
            </div>
            <div className="main__nav__middle">
                <FaSearch/>

                <input type="text" placeholder={`Search your ideas here...`}/>
            </div>
            <div className="main__nav__right">
                <img src={DUCK} alt=""/>
            </div>
        </div>


      <Outlet />
    </>
  );
}

export default Nav;
