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
import {Link, Outlet} from "react-router-dom";
import SavedPins from "./SavedPins.jsx";

const Profile = () => {
    const userInfo = useSelector(state => state.userReducer.user)
    const boardInfo = useSelector(state => state.boardReducer.boards)
    const [loading, err, fetchnewToken] = useNewToken(userInfo)

    const dispatch = useDispatch()
    const [boardLoading, setBoardLoading] = useState(false)
    const [boardError, setBoardErr] = useState(null)


    // testing
    function removeUser(){
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
            if(e.status === 401){
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


    return (
        <>
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
                <Link to={"created/"}>Created</Link>
                <Link to={"saved/"}>Saved</Link>
            </div>

            <Outlet/>



        </>
    );
};

export default Profile;