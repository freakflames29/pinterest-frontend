import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {ROOT_URL} from "../Constants.js";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {boardActions} from "../store/boardSlice.js";
import MainLoader from "./MainLoader.jsx";

const BoadCreateModal = (props) => {


    const modalClose = ()=>{

        props.toggleFun()
    }

    const [boardName,setBoardName] = useState("")

    const userInfo = useSelector(state => state.userReducer.user)
    const boardInfo = useSelector(state => state.boardReducer.boards)

    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)
    const [err,setErr] = useState(null)
    const navigate = useNavigate()

    const BoardNameHandler = (e)=>{
            setBoardName(e.target.value)
    }

    const createBoardHandler = async () =>{
        // console.log(boardName)

        const payload = {
            name: boardName
        }
        const post_url = `${ROOT_URL}/board/`
        try{
            setLoading(true)

            const res = await axios.post(post_url,payload,{
                headers:{
                    Authorization:`Bearer ${userInfo.token}`
                }
            })

            console.log(res.data)
            dispatch(boardActions.addBoard(res.data))

            modalClose()
            navigate("/profile/saved/")



        }
        catch (e){
            console.log(e)
            setErr(e.message)
        }
        finally {
            setLoading(false)
        }

    }

    if (loading){
        return <MainLoader/>
    }
    if (err){
        return <h1>{err}</h1>
    }

    return (
        <div className={"modal__container"} >
            <div className="modalClose" onClick={modalClose}></div>
            <div className="modal__box">
                <h1>Create Board</h1>
                <div className="modal__input">

                    <label htmlFor="board">Name</label>
                    <input type="text" placeholder={"Like 'Places to go' or 'Recipes to make'"} className={"form__field"} id={"board"} value={boardName} onChange={BoardNameHandler}/>
                    <button className={"btn btn__red"} onClick={createBoardHandler}>Create</button>
                </div>
            </div>
        </div>
    );
};

export default BoadCreateModal;