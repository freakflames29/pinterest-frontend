import {Link, Outlet, useNavigate, NavLink} from "react-router-dom";
import PINSVG from "../assets/images/pinsvg.svg";
import DUCK from "../assets/images/duck.jpeg";
import {userActions} from "../store/userSlice";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import SearchBar from "./SearchBar.jsx";

function Nav() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // console.log("I am from Main Nav component")



    const userInfo = useSelector(state => state.userReducer.user)
    const profileInfo = useSelector(state => state.userReducer.profile)
    const [searchItem,setSearchItem] = useState("")


    //TODO: remove userInfo checking at nav, check where the userLogin required.
    // it checks if user data present in localstorage and if present loads the data redux store
    function localStorageDataToReduxStore() {


        const data = localStorage.getItem("userInfo");
        if (data) {
            let parsedData = JSON.parse(data);
            dispatch(userActions.setUser(parsedData));
        } else {
            navigate("/auth")
        }
    }


    useEffect(() => localStorageDataToReduxStore(), []);

    function logOutHandler() {
        localStorage.clear()
        dispatch(userActions.removeUser())
        navigate("/auth")
    }



    return (
        <>
            <div className="main__nav__container">
                <div className="main__nav__left">
                    <Link to={"/"}>
                        <img src={PINSVG} alt="logo"/>
                    </Link>
                    {/*<span>Home</span>*/}
                    <span className={"main__nav__item"}>explore</span>
                    <span className={"main__nav__item"}>
                        <NavLink to={"/create"}
                                 className={({isActive}) => (isActive && "nav__menu__active")}>Create</NavLink>
                    </span>
                </div>
                <div className="main__nav__middle">
                    <SearchBar/>
                </div>
                <div className="main__nav__right">

                    <div className="nav__right__el">


                        <button className="btn btn_red" onClick={logOutHandler}>Logout</button>
                    </div>
                    <div className="nav__right__el">

                        <Link to={"/profile"}>
                            {profileInfo ? <img src={profileInfo.profile_img} alt="" className={"nav__profile__img"}/> :
                                <img src={DUCK} alt="" className={"nav__profile__img"}/>}
                        </Link>
                    </div>

                </div>
            </div>

            <Outlet/>
        </>
    );
}

export default Nav;
