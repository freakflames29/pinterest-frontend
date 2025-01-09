import React, {useEffect, useState} from 'react';
import PROFILE_IMG from "../assets/images/duck.jpeg"
import {useDispatch, useSelector} from "react-redux";
import useNewToken from "../hooks/useNewToken.js";
import MainLoader from "./MainLoader.jsx";
import axios from "axios";
import {ROOT_URL} from "../Constants.js";
import {boardActions} from "../store/boardSlice.js";
import Board from "./Board.jsx";
import {userActions} from "../store/userSlice.js";
import {Link, Navigate, Outlet, useLocation, NavLink} from "react-router-dom";
import SavedPins from "./SavedPins.jsx";
import BoardCreateModal from "./BoadCreateModal.jsx"

import {FaPlus} from "react-icons/fa6";
import {FaPencil} from "react-icons/fa6";
import Loader from "./Loader.jsx";


const Profile = () => {
    const userInfo = useSelector(state => state.userReducer.user)
    const profileInfo = useSelector(state => state.userReducer.profile)
    const boardInfo = useSelector(state => state.boardReducer.boards)
    const [loading, err, fetchnewToken] = useNewToken(userInfo)

    const dispatch = useDispatch()
    const [boardLoading, setBoardLoading] = useState(false)
    const [boardError, setBoardErr] = useState(null)

    const [modalShow, setModalShow] = useState(false)

    const [boardModalToggle, setBoardModalToggle] = useState(false)

    const [imageChangeModal, setImageChangeModal] = useState(false)
    const [imageChangeLoader, setImageChangeLoader] = useState(false)
    const [imageChangeError, setImageChangeError] = useState(null)

    const [profileLoading, setProfileLodaing] = useState(false)
    const [profileError, setProfileError] = useState(null)

    const [profileImage, setProfileImage] = useState(null)


    const modalToggleHandler = () => {
        setBoardModalToggle(prevState => !prevState)
    }

    const imageModalToggle = () => {
        setImageChangeModal(prevState => !prevState)
    }

    // to check the pathname
    const location = useLocation()
    console.log(location.pathname)


    // testing
    // function removeUser() {
    //     dispatch(userActions.polluteRefreshToken())
    // }


    const fetchUserProfileInfo = async () => {
        setProfileLodaing(true)
        axios.get(`${ROOT_URL}profile`, {
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
                console.log(e)
                setProfileError(e.message)
            })
            .finally(() => setProfileLodaing(false))


    }

    async function fetchBoardDetails() {
        try {
            setBoardLoading(true)

            const res = await axios(`${ROOT_URL}board/`, {
                headers: {
                    "Authorization": `Bearer ${userInfo.token}`
                }
            })


            console.table(res.data)
            dispatch(boardActions.setBoards(res.data))
            setBoardErr(null)
        } catch (e) {
            console.log(e.status)
            if (e.status === 401) {
                console.log("Im here")
                await fetchnewToken()
            }
            setBoardErr(e.message)
        } finally {
            setBoardLoading(false)
        }
    }


    const imagePatchHandler = async () => {
        //     TODO: add image patch request here.
        //     payload
        const payload = {
            profile_img: profileImage
        }

        try {
            setImageChangeLoader(true)
            const URL = `${ROOT_URL}profile/update/`
            const res = await axios.patch(URL, payload, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`, "Content-Type": "multipart/form-data"
                }
            })

            const new_profile_img = res.data.profile_img
            dispatch(userActions.setProfileImage(new_profile_img))
            setImageChangeError(null)
            imageModalToggle()

            // console.table(res.data)

        } catch (e) {
            console.log(e)
            setImageChangeError(e.message)


        } finally {
            setImageChangeLoader(false)
        }


    }

    const imageChangeHandler = (e) => {
        setProfileImage(e.target.files[0])
        console.log(e.target.files[0])

    }

    useEffect(() => {
        fetchBoardDetails()
        fetchUserProfileInfo()


    }, [userInfo]);


    if (loading || boardLoading || profileLoading) {
        return <MainLoader/>
    }
    if (err || boardError || profileError) {
        return <h1>{err}</h1>
    }


    return (<div className={"wrapper__div"}>
        {/*IT will redirect profile to profile/saved/ */}
        {/*<Navigate to={"saved/"}/> */}


        <div className="profile__container">
            <div className="profile__section">
                <div className="profile_section__image">


                    <label className="profile__image__hover" onClick={imageModalToggle}>


                        <FaPencil/>


                    </label>
                    {profileInfo ? <img src={profileInfo.profile_img} alt="#" className="profile__img"/> :
                        <img src={PROFILE_IMG} alt="#" className="profile__img"/>}


                    {imageChangeModal && <div className="image__change__modal__container">

                        {imageChangeLoader && <Loader/>}
                        {imageChangeError && <h2>{imageChangeError}</h2>}

                        <div className="image__change__modal">
                            <div className="triangel"></div>

                            <label htmlFor="profileImg"> <FaPencil/> Choose Image</label>

                            <input type="file" accept={"image/*"} id={"profileImg"} onChange={imageChangeHandler}
                                   className={"file__field"}/>


                            {profileImage ? <img src={URL.createObjectURL(profileImage)} alt=""
                                                 className={"profile__img__preview"}/> :
                                <img src={PROFILE_IMG} alt="" className={"profile__img__preview"}/>

                            }
                            <div className="buttons">

                                <button className={"btn btn__grey"} onClick={imageModalToggle}>Cancel</button>
                                <button onClick={imagePatchHandler} className={"btn btn__red"}>Update</button>
                            </div>
                        </div>

                    </div>}
                </div>

                <h1>{userInfo?.username}</h1>
                <p>{userInfo?.email}</p>
                {profileInfo && <p className={"profile__desc"}>{profileInfo.desc}</p>}

                {/*<button onClick={removeUser}>Clean user Redux store </button>*/}
            </div>
        </div>
        <div className="saved__created__toggle__container">
            {/*TODO: Add navlink instead of link */}
            <NavLink to={"created/"}
                     className={({isActive}) => (isActive ? "navlink__active" : "navlink")}>Created</NavLink>
            <NavLink to={"saved/"}
                     className={({isActive}) => (isActive ? "navlink__active" : "navlink")}>Saved</NavLink>
        </div>

        <div className="create__btn__container ">
            <div className={`create__btn ${modalShow && "active"}`}
                 onClick={() => setModalShow(prevState => !prevState)}>

                <FaPlus/>
            </div>

            {modalShow && <div className="modal">
                <span>Create</span>
                <Link to={"/create"} className="modal_title">
                    Pin
                </Link>
                <span className="modal_title" onClick={modalToggleHandler}>
                        Board
                </span>
            </div>}


        </div>


        <Outlet/>

        {/* if location pathname is profile i want to show the boards if changed to boards the boards will be there if created path the created pins will be there*/}
        {location.pathname === "/profile" && <div className="boards__container">


            {boardInfo.map(board => (<Board name={board.name} key={board.id} pins={board.pins} boardId={board.id}/>))}

        </div>}

        {boardModalToggle && <BoardCreateModal toggle={boardModalToggle} toggleFun={modalToggleHandler}/>}


    </div>);
};

export default Profile;