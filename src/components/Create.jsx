import React, {useRef, useState} from 'react';
import useNewToken from "../hooks/useNewToken.js";
import {useDispatch, useSelector} from "react-redux";
import MainLoader from "./MainLoader.jsx";
import axios from "axios";
import {ROOT_URL} from "../Constants.js";
import {pinActions} from "../store/pinSlice.js";
import {useNavigate} from "react-router-dom";

import {GrUploadOption} from "react-icons/gr";
import { MdEdit } from "react-icons/md";


const Create = () => {
    const userInfo = useSelector(state => state.userReducer.user)
    const allPin = useSelector(state => state.pinReducer.allPin)


    const dispatch = useDispatch()

    const [loading, err, fetchToken] = useNewToken(userInfo)
    const [createLoading, setCreateLoading] = useState(false)
    const [createError, setCreateError] = useState(null)


    const navigator = useNavigate()
    const [image, setImage] = useState(null)
    // const [data,]
    const title = useRef()
    const desc = useRef()
    const link = useRef()
    // const image = useRef()
    // console.log(title)

    // const imageHandler = e =>{
    //     setImage(e.target.files[0])
    // }


    const createHandler = async () => {
        //
        // console.log(image)
        // const img = URL.createObjectURL(image)
        // console.log(img)
        // return;
        const payload = {
            title: title.current?.value,
            desc: desc.current?.value,
            link: link.current?.value,
            image: image
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
            navigator("/") //TODO: CHange it to user pin create section


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
        <>
            <div className="create__heading">
                <div className="heading__elm">

                    <h2>Create Pin</h2>
                    <button className={"btn btn__red"}
                            onClick={createHandler}>{loading || createLoading ? "Publishing..." : "Publish"}</button>
                </div>
            </div>
            <div className="create__container">
                <div className="create__section">
                    <div className="create__image__upload">
                        <input type="file" id={"img"} accept={"image/*"}
                               onChange={(e) => setImage(e.target.files[0])} className={"image__file__field"}/>

                        {image === null ?
                            <>
                                <label htmlFor="img" className={"create__image__section"}>
                                    <GrUploadOption/>
                                    Choose an Image

                                </label>


                            </> :

                            <div className="selected__img">

                                <img src={URL.createObjectURL(image)} alt=""/>
                                <label htmlFor="img">
                                    <MdEdit />
                                    Choose another
                                </label>
                            </div>
                        }

                    </div>

                    <div className="create__info__section">
                        <input type="text" placeholder="Enter title of the pin" ref={title} className={"form__field"}/>
                        <input type="text" placeholder={"Enter link of the pin "} ref={link} className={"form__field"}/>
                        <textarea name="desc" id="desc" cols="30" rows="10" placeholder={"Enter desc about the pin"}
                                  ref={desc}
                                  className={"form__field"}/>
                    </div>
                </div>
            </div>

        </>
    )
        ;
};

export default Create;