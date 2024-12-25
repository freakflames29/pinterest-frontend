import React from 'react';
import LOADER from "../assets/images/loader.png"

const Loader = () => {
    return (
        <div className="loading__card">
            <img src={LOADER} alt="" className="loader__img"/>
        </div>

    );
};

export default Loader;