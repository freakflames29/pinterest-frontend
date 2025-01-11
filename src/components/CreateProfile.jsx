import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {ROOT_URL} from "../Constants.js";
import {useDispatch} from "react-redux";
import {userActions} from "../store/userSlice.js";
import axios from "axios";
import MainLoader from "./MainLoader.jsx";
import {Navigate, useNavigate} from "react-router-dom";

const CreateProfile = () => {

    const userInfo = useSelector(state => state.userReducer.user)
    const profileInfo = useSelector(state => state.userReducer.profile)

    const [desc,setDesc] = useState("")
    const [gender,setGender] = useState("M")
    const [image,setImage] = useState()
    const navigate = useNavigate()

    const [loading,setLoading] = useState(false)
    const [err,setErr] = useState(null)

    const dispatch = useDispatch()

    const submitProfile  = async ()=>{
        const payload ={
            desc,
            gender,
            profile_img:image
        }

        console.log(payload)

        try{
            setLoading(true)

            const URL = `${ROOT_URL}profile/create/`
            const res = await axios.post(URL,payload,{
                headers:{
                    Authorization:`Bearer ${userInfo.token}`,
                    "Content-Type":"multipart/form-data"
                }
            })


                dispatch(userActions.setProfile(res.data))
                setErr(null)
                navigate("/profile/")


        }catch (e){
            console.log(e.message)
            setErr(e.message)

        }finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (profileInfo!==null){
            navigate("/profile/")
        }
    }, [profileInfo]);

    if (loading){
        return  <MainLoader/>

    }
    if (err){
        return <h1>{err}</h1>
    }



    return (
        <div>

            <label htmlFor="desc">Desc</label>
            <textarea name="desc" id="desc" cols="30" rows="10" placeholder={"Pls say something about yourself"} value={desc} onChange={e=>setDesc(e.target.value)}/> <br/><br/>
            <label htmlFor="gender">Gender</label>
            <select name="gender" id="gender" value={gender} onChange={e=>setGender(e.target.value)}>
                <option value="M">Male</option>
                <option value="F">Female</option>
            </select> <br/><br/>

            <label htmlFor="img">Choose profile image</label>
            <input type="file" accept={"image/*"} onChange={e=>setImage(e.target.files[0])}/>
            <br/><br/>

            <button onClick={submitProfile}>Save info</button>
        </div>
    );
};

export default CreateProfile;