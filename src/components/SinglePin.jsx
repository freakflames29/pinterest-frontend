import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { ROOT_URL } from "../Constants";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userActions } from "../store/userSlice";
function SinglePin() {
  const params = useParams();
  const userInfo = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  //! todo add fething the pin details upon checking JWT token
  
  function SetLocalStorageDataToStore() {
    const local = localStorage.getItem("userInfo");
    if (local) {
      const parseData = JSON.parse(local);
      dispatch(userActions.setUser(parseData));
    }
  }

  useEffect(() => {}, []);

  return (
    <div>
    {!userInfo && <Navigate to = "/auth"/>}
      {userInfo?.username} :{params.id}
    </div>
  );
}

export default SinglePin;
