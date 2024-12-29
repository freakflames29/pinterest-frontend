import React, {useEffect, useState} from 'react';
import PROFILE_IMG from "../assets/images/duck.jpeg"
import {useDispatch, useSelector} from "react-redux";
import useNewToken from "../hooks/useNewToken.js";
import MainLoader from "./MainLoader.jsx";
import axios from "axios";
import {ROOT_URL} from "../Constants.js";
import {boardActions} from "../store/boardSlice.js";
import Board from "./Board.jsx";

const Profile = () => {
    const userInfo = useSelector(state => state.userReducer.user)
    const boardInfo = useSelector(state => state.boardReducer.boards)
    const [loading, err, fetchnewToken] = useNewToken(userInfo)

    const dispatch = useDispatch()
    const [boardLoading, setBoardLoading] = useState(false)
    const [boardError, setBoardErr] = useState(null)



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
            if(e.status === 401){
                fetchnewToken()
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

                </div>
            </div>
            <div className="boards__container">
                 {/*<Board name={"Test"}/>*/}
                {
                    boardInfo.map(board=>(
                        <Board name ={board.name} key={board.id} pins={board.pins}/>
                    ))
                }
            </div>
        </>
    );
};

export default Profile;