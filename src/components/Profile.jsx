import React from 'react';
import {useSelector} from "react-redux";

const Profile = () => {
    const userInfo = useSelector(state=>state.userReducer.user)

    return (
        <div>
            <h1>{userInfo?.username}</h1>
            <p>{userInfo?.email}</p>
        </div>
    );
};

export default Profile;