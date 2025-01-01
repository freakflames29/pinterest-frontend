import {useEffect, useState} from 'react';
import {useLocation, useParams} from "react-router-dom";
import useNewToken from "../hooks/useNewToken.js";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {ROOT_URL} from "../Constants.js";
import MainLoader from "./MainLoader.jsx";
import {pinActions} from "../store/pinSlice.js";
import ImageGrid from "./ImageGrid.jsx";

const UserBoard = () => {
    const params = useParams()

    const userInfo = useSelector(state => state.userReducer.user)
    const pinInfo = useSelector(state => state.pinReducer.allPin)

    const [tokenLoading, tokenErr, fetchToken] = useNewToken(userInfo)

    const boardLocationProp = useLocation() // it recives the state props from useNavigation hook
    console.log(boardLocationProp)

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState(null)
    const [boards, setBoards] = useState([])


    const fetchBoardPins = async (props) => {
        // navigator("/")
        console.log(userInfo)
        // console.log("Board ID: ",props.boardId)

        try {
            setLoading(true)
            const res = await axios(`${ROOT_URL}board/${params.boardId}/pins/`, {
                headers: {
                    "Authorization": `Bearer ${userInfo.token}`
                }
            })

            console.log(res.data)
            dispatch(pinActions.setAllPin(res.data))
            setErr(null)
        } catch (e) {
            if (e.status === 401) {
                // fet
                fetchToken()
                console.log("e)")
            }
            setErr(e.message)

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBoardPins()
    }, [userInfo])


    if (loading || tokenLoading) {
        return <MainLoader/>
    }
    if (err || tokenErr) {
        return <h1>{err}</h1>
    }

    return (
        <div>
            {/*<h1>{params.boardId}</h1>*/}
            <div className="board__title">

                <h1>{boardLocationProp.state.name}</h1>
                <p>{boardLocationProp.state.pinLength} pins</p>
            </div>

            <ImageGrid pinInfo={pinInfo}/>
        </div>
    );
};

export default UserBoard;