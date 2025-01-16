import {Link, Outlet, useNavigate, NavLink} from "react-router-dom";
import PINSVG from "../assets/images/pinsvg.svg";
import DUCK from "../assets/images/duck.jpeg";
import {userActions} from "../store/userSlice";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import SearchBar from "./SearchBar.jsx";
import axios from "axios";
import MainLoader from "./MainLoader.jsx";
import {ROOT_URL} from "../Constants.js";

function Nav() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // console.log("I am from Main Nav component")


    const userInfo = useSelector(state => state.userReducer.user)
    const profileInfo = useSelector(state => state.userReducer.profile)
    const [searchItem, setSearchItem] = useState("")


    //TODO: remove userInfo checking at nav, check where the userLogin required.
    // it checks if user data present in localstorage and if present loads the data redux store
    function localStorageDataToReduxStore() {

        if (!userInfo) {
            console.log("Fetching info from storage")
            const data = localStorage.getItem("userInfo");
            if (data) {
                let parsedData = JSON.parse(data);
                dispatch(userActions.setUser(parsedData));
            } else {
                navigate("/auth")
            }
        } else {
            console.log("Data is in redux")
        }
    }

    const [profileLoading, setProfileLoading] = useState(false)
    const [profileError, setProfileError] = useState(null)

    const fetchUserProfileInfo = async () => {

        console.log("Running")
        if (profileInfo === null) {
            setProfileLoading(true)
            axios.get(`${ROOT_URL}profile/`, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            }).then(res => {
                if (res.status === 200) {
                    dispatch(userActions.setProfile(res.data))
                    setProfileError(null)
                    console.log(res.data)
                }

            })
                .catch(e => {
                    if (e.status === 404) {
                        console.log("No profile details found")
                        navigate("/create-profile")
                    } else {

                        console.log(e)
                        setProfileError(`${e.message} -- profile errro`)
                    }
                })
                .finally(() => setProfileLoading(false))
        }


    }


    useEffect(() => {
        localStorageDataToReduxStore()
        fetchUserProfileInfo()
    }, [userInfo]);
    //
    // function logOutHandler() {
    //     localStorage.clear()
    //     dispatch(userActions.removeUser())
    //     navigate("/auth")
    // }


    return (
        <>
            <div className="main__nav__container">
                <div className="main__nav__left">
                    <Link to={"/"}>
                        <img src={PINSVG} alt="logo"/>
                    </Link>
                    {/*<span>Home</span>*/}
                    <span className={"main__nav__item"}>
                          <NavLink to={"/explore/"}
                                   className={({isActive}) => (isActive && "nav__menu__active")}>Explore</NavLink>

                    </span>
                    <span className={"main__nav__item"}>
                        <NavLink to={"/create"}
                                 className={({isActive}) => (isActive && "nav__menu__active")}>Create</NavLink>
                    </span>
                </div>
                <div className="main__nav__middle">
                    <SearchBar/>
                </div>
                <div className="main__nav__right">

                    {/*<div className="nav__right__el">*/}


                    {/*    /!*<button className="btn btn_red" onClick={logOutHandler}>Logout</button>*!/*/}
                    {/*</div>*/}
                    <div className="nav__right__el">

                        <Link to={"/profile"}>
                            {profileInfo ? <img src={profileInfo.profile_img} alt="" className={"nav__profile__img"}/> :
                                <img src={DUCK} alt="" className={"nav__profile__img"}/>}
                        </Link>
                    </div>

                </div>
            </div>

            {profileLoading ? <MainLoader/> : <Outlet/>}
        </>
    );
}

export default Nav;
