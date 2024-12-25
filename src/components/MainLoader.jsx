import React from 'react';
import LOADER from "../assets/images/loader.png"

const MainLoader = () => {
    return (
        <div className="main__loader">
            <img src={LOADER} alt="" className="loader__img"/>
        </div>
    );
};

export default MainLoader;