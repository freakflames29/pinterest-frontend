import {useState} from "react";
import {useDispatch} from "react-redux";
import {userActions} from "../store/userSlice.js";
import axios from "axios";
import {ROOT_URL} from "../Constants.js";

const useNewToken = (user)=>{
    const [loading,setLoading] = useState(false)
    const [err,setErr] = useState(null)
    const dispatch= useDispatch()
      async function fetchNewtoken() {
        try {
            setLoading(true);

            let payload = {
                refresh: user.refresh,
            };

            const res = await axios.post(`${ROOT_URL}auth/refresh/`, payload);
            console.log("New response token", res.data);
            dispatch(userActions.setToken(res.data));
            setErr(null);
        } catch (e) {
            setErr(e.message);
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    return [loading,err,fetchNewtoken]

}
export default useNewToken;