import {useState} from "react";
import {useDispatch} from "react-redux";
import {userActions} from "../store/userSlice.js";
import axios from "axios";
import {ROOT_URL} from "../Constants.js";
import {useNavigate} from "react-router-dom";

const useNewToken = (user) => {
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState(null)
    const dispatch = useDispatch()
    const navigator = useNavigate()
    const fetchNewtoken = async () => {
        // console.log(user)
        try {
            setLoading(true);

            let payload = {
                refresh: user.refresh,
            };

            // console.log(payload)

            const URL = `${ROOT_URL}auth/refresh/`
            // console.log(URL)
            const res = await axios.post(URL, payload);
            console.log("New response token", res.data);
            dispatch(userActions.setToken(res.data));

            setErr(null);
        } catch (e) {
            if (e.status === 401) {
                // means the refresh token is also expired
                localStorage.clear()
                // navigator("/auth")
                //     navigate to auth if required
            }
            setErr(e.message);

        } finally {
            setLoading(false);
        }
    }

    return [loading, err, fetchNewtoken]

}
export default useNewToken;