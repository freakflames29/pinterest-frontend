import React, {useRef, useState} from "react";
import LOGO from "../assets/images/icon.png";
import LOADER from "../assets/images/loader.png"
import axios from "axios";
import {ROOT_URL} from "../Constants.js";
import {userActions} from "../store/userSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";


function SignUp(props) {
    // refs for formadat
    const username = useRef()
    const email = useRef()
    const password = useRef()

    const userInfo = useSelector(state => state.userReducer.user)
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)


    function toggleIt() {
        // eslint-disable-next-line react/prop-types
        props.toggle();
        // console.log("meow")
    }

    function sendData() {

        if (props.login) {
            setLoading(true)
            console.log(("Signup page"))

            const payload = {
                username: username.current.value, email: email.current.value, password: password.current.value
            }

            console.table(payload)

            axios.post(`${ROOT_URL}auth/signup/`, payload)
                .then(res => {
                    dispatch(userActions.setUser(res.data))
                    setError(null)
                })
                .catch(e => {

                    if (e.response?.data.error) {
                        setError(e.response.data.error)

                    } else {

                        setError(e.message)
                    }

                    console.log(e)
                })
                .finally(() => setLoading(false))


        } else {
            setLoading(true)
            console.log("Login page")

            const payload = {
                username: username.current.value,
                password: password.current.value
            }

            axios.post(`${ROOT_URL}auth/login/`, payload)
                .then(res => {
                    dispatch(userActions.setUser(res.data))
                    setError(null)
                })
                .catch(e => {
                        if (e.response?.data.error) {
                            setError(e.response.data.error)

                        } else {

                            setError(e.message)
                        }

                        console.log(e)
                    }
                ).finally(() => setLoading(false))

            console.table(payload)
        }
    }

    return (<>
        {userInfo && <Navigate to={"/"}/>}
        <div className="signup__container">

            {loading &&
                <div className="loading__card">
                    <img src={LOADER} alt=""/>
                </div>
            }
            <div className="signup__card">


                <img src={LOGO} alt="" className="signup__pin__logo"/>
                <h2>Welcome to Pinterest</h2>
                {props.login && <span>Find new ideas to try</span>}

                {error &&
                    <div className="error__section">
                        <span>{error}</span>
                    </div>
                }

                <div className="sign__form__section">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        placeholder="Username"
                        id="username"
                        className="form__field"
                        ref={username}
                    />
                    {props.login && (<>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            placeholder="Email address"
                            id="email"
                            className="form__field"
                            ref={email}
                        />
                    </>)}
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        className="form__field"
                        ref={password}
                    />

                    <button className="btn btn__red"
                            onClick={sendData}>{props.login ? "Contiune" : "Login"}</button>

                    {props.login ? (<span className="info">
                              Already have and account? <b onClick={toggleIt}>Login</b>
                            </span>) : (<span className="info">
                              Dont have account ? <b onClick={toggleIt}>Signup</b>
                            </span>)}
                </div>
            </div>
        </div>
    </>);
}

export default SignUp;
