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

import PROFILE_IMG from "../assets/images/duck.jpeg";
import SmallProfile from "./SmallProfile";
import { boardActions } from "../store/boardSlice";

function SinglePin() {
  const params = useParams();
  const userInfo = useSelector((state) => state.userReducer.user);
  const singlePinInfo = useSelector((state) => state.pinReducer.singlePin);

  const boardInfo = useSelector((state) => state.boardReducer.boards);

  const [boardSelect,setBoardSelect] = useState("")
  // const userInfo = useSelector(state=>state.userReducer.user)

  // console.log("Pin info");
  // console.log(singlePinInfo);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  //! function if access token expires it fetches new acess token based on refresh token and updates the localstorage

  async function fetchNewtoken() {
    try {
      setLoading(true);

      let payload = {
        refresh: userInfo.refresh,
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
        fetchNewtoken();
      } else {
        setErr(e.message);
      }
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  // ! fetching the list of boards user has

  async function fethUserBoards() {
    try {
      setLoading(true);
      const res = await axios.get(`${ROOT_URL}board/`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      console.log("User Board details:---");
      console.table(res.data);

      dispatch(boardActions.setBoards(res.data));
      setErr(null);
    } catch (e) {
      setErr(e.message);
      console.log("Error from fetching board details", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPinData();
  }, [userInfo]);

  useEffect(() => {
    fethUserBoards();
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



  //  
  function boardSelectHandler(e){
    // e.preventDefault()
    // console.log("EEEEEEEE")
    console.log(e.target.value)
  }

  return (
    <div className="show__container">
      <div className="show__card">
        <div className="show__image">
          <img src={singlePinInfo?.image} alt="pin image" />
        </div>
        <div className="show__info">
          <div className="show__save__section">
            <span>Likes and all</span>

            <div className="board__list">
              <select name="cars" id="cars"  onChange={boardSelectHandler} >
                {boardInfo.map((board) => (
                  <option value={`${board.name}`}key={board.id}>{board.name}</option>
                  
                ))}
               
                
              </select>
              <button className="btn btn__red">Save</button>
            </div>
          </div>

          <SmallProfile name={singlePinInfo.username} />

          <div className="show__comments">
            <h3>Comments:</h3>
            <div className="restrict">
              <SmallProfile name="Sourav" />
              <SmallProfile name="Sourav" />
              <SmallProfile name="Sourav" />
              <SmallProfile name="Sourav" />
            </div>
          </div>
          <div className="show__add_comment">
            <input
              type="text"
              placeholder="Add comment"
              className="input__field comment__box"
            />
          </div>
        </div>
      </div>

      <div className="board__list"></div>
    </div>
  );
}

export default SinglePin;
