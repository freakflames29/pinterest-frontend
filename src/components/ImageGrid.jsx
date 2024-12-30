import React from 'react';
import {Link} from "react-router-dom"
const ImageGrid = (props) => {
    return (
        <>
            {
                props.pinInfo.map(pin => (<Link to={`pin/${pin.id}`} key={pin.id}>
                    <div className={"image__list"}>
                        <img src={pin.image} alt=""/>
                        <span>{pin.username}</span>
                    </div>
                </Link>
            ))}
        </>
    );
};

export default ImageGrid;