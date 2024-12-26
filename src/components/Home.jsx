import {ROOT_URL} from "../Constants.js";
import {pinActions} from "../store/pinSlice.js";
import LOADER from "../assets/images/loader.png"

import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import Loader from "./Loader.jsx";
import MainLoader from "./MainLoader.jsx";
import { Link } from "react-router-dom";

function Home() {
    const [loading, setLoading] = useState(true)
    const [err, setErr] = useState(null)

    const pinInfo = useSelector(state => state.pinReducer.pin)
    const dispatch = useDispatch()


    async function fetchData() {
        try {
            setLoading(true)
            const res = await axios(`${ROOT_URL}pin/`)

            dispatch(pinActions.setPin(res.data))
            setErr(null)
            console.log(res.data)


        } catch (e) {
            if (e.response?.data.error) {
                setErr(e.response.data.error)
            } else {
                setErr(e.message)
            }
            console.log(e)
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        fetchData()
    }, []);

    if (loading) {
        return <MainLoader/>
    }
    if(err){
        return <center><h1>{err}</h1></center>
    }

    return (
        <>
            <div className="hero__container">
                <div className="hero__image__section">
                    {
                        pinInfo.map(pin => (
                            <Link to={`pin/${pin.id}`} key={pin.id}>
                            <div  className={"image__list"}>
                                <img src={pin.image} alt=""/>
                                <span>{pin.username}</span>
                            </div>
                            </Link>
                        ))
                    }
                </div>

            </div>
        </>
    );
}

export default Home;
