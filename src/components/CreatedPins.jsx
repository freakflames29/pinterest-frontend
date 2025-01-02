import React, {useEffect, useState} from 'react';
import MainLoader from "./MainLoader.jsx";
import {useSelector} from "react-redux";
import axios from "axios";
import {ROOT_URL} from "../Constants.js";
import ImageGrid from "./ImageGrid.jsx";

const CreatedPins = () => {
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState(null)
    const [pins, setPins] = useState([])
    const userInfo = useSelector(state => state.userReducer.user)

    const fetchPins = async () => {
        try {
            setLoading(true)

            const url = `${ROOT_URL}pin/user/created/`
            const res = await axios(url, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            })
            console.log(res.data)
            setPins(res.data)
            setErr(null)

        } catch (e) {
            setErr(e.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (pins.length === 0) {
            fetchPins()

        }
    }, [userInfo,pins]);

    if (loading) {
        return <MainLoader/>
    }
    if (err) {
        return <h1>{err}</h1>
    }

    return (
        <>
            <ImageGrid pinInfo={pins}/>
        </>
    );
};

export default CreatedPins;