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
import {Link, Navigate, Outlet, useLocation,NavLink} from "react-router-dom";
import SavedPins from "./SavedPins.jsx";
import BoardCreateModal from "./BoadCreateModal.jsx"

import {FaPlus} from "react-icons/fa6";


const Profile = () => {
    const userInfo = useSelector(state => state.userReducer.user)
    const boardInfo = useSelector(state => state.boardReducer.boards)
    const [loading, err, fetchnewToken] = useNewToken(userInfo)

    const dispatch = useDispatch()
    const [boardLoading, setBoardLoading] = useState(false)
    const [boardError, setBoardErr] = useState(null)

    const [modalShow, setModalShow] = useState(false)

    const [boardModalToggle, setBoardModalToggle] = useState(false)


    const modalToggleHandler = ()=>{
        setBoardModalToggle(prevState => !prevState)
    }

    // to check the pathname
    const location = useLocation()
    console.log(location.pathname)


    // testing
    function removeUser() {
        dispatch(userActions.polluteRefreshToken())
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


    useEffect(() => {
        fetchBoardDetails()
    }, [userInfo]);


    if (loading || boardLoading) {
        return <MainLoader/>
    }
    if (err || boardError) {
        return <h1>{err}</h1>
    }


    return (<div className={"wrapper__div"}>
        {/*IT will redirect profile to profile/saved/ */}
        {/*<Navigate to={"saved/"}/> */}

        <div className="profile__container">
            <div className="profile__section">
                <img src={PROFILE_IMG} alt="#" className="profile__img"/>
                <h1>{userInfo?.username}</h1>
                <p>{userInfo?.email}</p>
                {/*<button onClick={removeUser}>Clean user Redux store </button>*/}
            </div>
        </div>
        <div className="saved__created__toggle__container">
            {/*TODO: Add navlink instead of link */}
            <NavLink to={"created/"} className={({isActive})=>(isActive ? "navlink__active" :"navlink")}>Created</NavLink>
            <NavLink to={"saved/"} className={({isActive})=>(isActive ? "navlink__active" :"navlink")}>Saved</NavLink>
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