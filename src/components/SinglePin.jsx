import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { ROOT_URL } from "../Constants";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userActions } from "../store/userSlice";
import axios from "axios";
import { pinActions } from "../store/pinSlice";

import { useState } from "react";
import MainLoader from "./MainLoader";

function SinglePin() {
  const params = useParams();
  const userInfo = useSelector((state) => state.userReducer.user);
  const singlePinInfo = useSelector((state) => state.pinReducer.singlePin);
  // const userInfo = useSelector(state=>state.userReducer.user)

  console.log("Pin info");
  console.log(singlePinInfo);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);



  //! function if access token expires it fetches new acess token based on refresh token and updates the localstorage

  async function fetchNewtoken(){
    try{
      setLoading(true)

      let payload = {
        "refresh":userInfo.refresh
      }

      const res = await axios.post(`${ROOT_URL}auth/refresh/`,payload)
      console.log("New response token",res.data)
      dispatch(userActions.setToken(res.data))
      setErr(null)



    }
    catch(e){
      setErr(e.message)
      console.log(e)
    }
    finally{
      setLoading(false)
    }
  }

  // -----------------------------------------------------------------------------------------------------------------------------
  //! todo add fething the pin details upon checking JWT token

  async function fetchPinData() {
    console.log("The user info.........");
    console.table(userInfo);

    try {
      setLoading(true);
      const res = await axios.get(`${ROOT_URL}pin/${params.id}/`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      console.log(res);

      console.table(res.data);

      dispatch(pinActions.setSinglePin(res.data));
      setErr(null);
    } catch (e) {
      if (e.response?.data.detail) {
        console.log(e.response);
        // setErr(e.response.data.detail);
        fetchNewtoken()
      } else {
        setErr(e.message);
      }
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPinData();

  }, [userInfo]);

  if (loading) {
    return <MainLoader />;
  }
  if (err) {
    return (
      <center>
        <h1>{err}</h1>
      </center>
    );
  }

  return (
    <div>
      {/* {!userInfo && <Navigate to = "/auth"/>} */}
      {singlePinInfo.username} <br />
      <img src={singlePinInfo.image} alt="" />
    </div>
  );
}

export default SinglePin;
