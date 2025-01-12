import React from 'react';
import AVATAR from "../assets/images/ava.png"
import {useSelector} from "react-redux";

const Comments = () => {
    const commentInfo = useSelector(state => state.commentReducer.comments)
    const userInfo = useSelector(state => state.userReducer.user)

    let profile_img ;
    // if (commentInfo.username === userInfo.username){
    //     if ()
    // }
    if (commentInfo.profile_img !== "#"){
        profile_img = commentInfo.profile_img
    }



    return (
        <>
            {
                commentInfo.map(comment => (
                    <div className="user__info comment__section" key={comment.id}>
                        {comment.profile_img !== "#" ? <img src={comment.profile_img} alt=""/> : <img src={AVATAR} alt=""/> }
                        <div className="info">
                            <span className={"username"}><b>{comment.username}</b></span>
                            <p>{comment.body}</p>
                        </div>
                    </div>

                ))
            }

        </>
    );
};

export default Comments;