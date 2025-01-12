import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {ROOT_URL} from "../Constants.js";
import {useDispatch} from "react-redux";
import {userActions} from "../store/userSlice.js";
import axios from "axios";
import MainLoader from "./MainLoader.jsx";
import {Navigate, useNavigate} from "react-router-dom";
import PROFILE_IMG from "../assets/images/capy.jpeg"


const CreateProfile = () => {

    const userInfo = useSelector(state => state.userReducer.user)
    const profileInfo = useSelector(state => state.userReducer.profile)

    const [desc, setDesc] = useState("")
    const [gender, setGender] = useState("M")
    const [image, setImage] = useState(null)
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState(null)

    const dispatch = useDispatch()

    const submitProfile = async () => {
        const payload = {
            desc,
            gender,
            profile_img: image
        }

        console.log(payload)

        try {
            setLoading(true)

            const URL = `${ROOT_URL}profile/create/`
            const res = await axios.post(URL, payload, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                    "Content-Type": "multipart/form-data"
                }
            })


            dispatch(userActions.setProfile(res.data))
            setErr(null)
            navigate("/profile/")


        } catch (e) {
            console.log(e.message)
            setErr(e.message)

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (profileInfo !== null) {
            navigate("/profile/")
        }
    }, [profileInfo]);

    if (loading) {
        return <MainLoader/>

    }
    if (err) {
        return <h1>{err}</h1>
    }


    return (
        <div className={"create__profile__container"}>

            <div className="create__profile">

                <h1 className={"red heading"}>Create your profile</h1>
                <label htmlFor="desc" className={"label"}>Desc</label>
                <textarea name="desc" id="desc" cols="20" rows="5" placeholder={"Pls say something about yourself"}
                          value={desc} onChange={e => setDesc(e.target.value)} className={"form__field"}/> <br/><br/>
                <label htmlFor="gender" className={"label"}>Gender</label>
                <select name="gender" id="gender" value={gender} onChange={e => setGender(e.target.value)}
                        className={"form__field"}>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                </select> <br/><br/>

                <label htmlFor="img" className={"label"}>Choose profile image</label>
                <input type="file" accept={"image/*"} onChange={e => setImage(e.target.files[0])}
                       className={"form__field"}/>
                <br/><br/>

                <button onClick={submitProfile} className={"btn btn__red"}>Save info</button>
            </div>



                <div className="profile__preview">
                    <h1 className={"heading red"}>Profile Preview</h1>
                    <div className="profile__preview__section">
                        <div className="profile_section__image">
                            {image !== null ? <img src={URL.createObjectURL(image)} alt="#" className="big"/> :
                                <img src={PROFILE_IMG} alt="#" className="profile__img big"/>

                            }

                        </div>

                        <h1>{userInfo?.username || "username"}</h1>
                        <p>{userInfo?.email || "abc@abc.com"}</p>
                        <p className={"profile__desc"}>{desc || "Sample Description"}</p>
                    </div>

                </div>



        </div>
    );
};

export default CreateProfile;