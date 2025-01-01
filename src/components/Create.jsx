import React, {useRef, useState} from 'react';
import useNewToken from "../hooks/useNewToken.js";
import {useDispatch, useSelector} from "react-redux";
import MainLoader from "./MainLoader.jsx";
import axios from "axios";
import {ROOT_URL} from "../Constants.js";
import {pinActions} from "../store/pinSlice.js";
import {useNavigate} from "react-router-dom";

const Create = () => {
    const userInfo = useSelector(state => state.userReducer.user)
    const allPin = useSelector(state => state.pinReducer.allPin)


    const dispatch = useDispatch()

    const [loading, err, fetchToken] = useNewToken(userInfo)
    const [createLoading, setCreateLoading] = useState(false)
    const [createError, setCreateError] = useState(null)

    const navigator = useNavigate()
    // const [data,]
    const title = useRef()
    const desc = useRef()
    const link = useRef()
    const image = useRef()
    // console.log(title)

    const createHandler = async () => {
        const payload = {
            title: title.current?.value ,
            desc: desc.current?.value,
            link: link.current?.value ,
            image: image.current?.files[0]
        }
        console.table("payload", payload)


        try {
            setCreateLoading(true)
            const url = `${ROOT_URL}pin/create/`
            const res = await axios.post(url, payload, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${userInfo.token}`
                }
            })

            console.log("Success ")
            console.table(res.data)


            dispatch(pinActions.addPinToAllPin(res.data))
            navigator("/")


        } catch (e) {
            console.log(e.message)
            if (e.status === 401) {
                // fetchToken()
                setCreateError("Your token expired")
            } else {

                console.log(e)
                setCreateError(e.message)
            }

        } finally {
            setCreateLoading(false)
        }


    }

    if (loading || createLoading) {
        return <MainLoader/>
    }
    if (err || createError) {
        return <h1>{err || createError}</h1>
    }


    return (
        <div>
            <input type="file" accept={"image/*"} ref={image}/>
            <input type="text" placeholder={"Title"} ref={title}/>
            <textarea name="desc" id="desc" cols="30" rows="10" placeholder={"Enter desc"} ref={desc}/>

            <input type="text" placeholder={"Enter link "} ref={link}/>

            <button onClick={createHandler}>Create Pin</button>
        </div>
    );
};

export default Create;