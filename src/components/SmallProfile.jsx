import React from 'react'
import PROFILE_IMG from "../assets/images/duck.jpeg";

function SmallProfile(props) {
  return (
    <div className="user__info">
    <img src={PROFILE_IMG} alt="" />
    <p>{props.name}</p>
  </div>
  )
}

export default SmallProfile