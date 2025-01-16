import React, {useEffect} from 'react';
import useFetch from "../hooks/useFetch.js";
import MainLoader from "./MainLoader.jsx";
import {Link} from "react-router-dom";

const Explore = () => {
    const [loading, error, data, fetcher] = useFetch("category")

    function getFormattedTodayDateCompact() {
        const today = new Date();
        const month = today.toLocaleString('default', {month: 'long'});
        const day = today.getDate();
        const year = today.getFullYear();

        return `${month} ${day}, ${year}`;
    }

    const dateToday = getFormattedTodayDateCompact()


    useEffect(() => {
        fetcher()
    }, []);

    if (loading) {
        return <MainLoader/>
    }
    if (error) {
        return <h1>{error}</h1>
    }


    return (<>

        <div className="category_heading">
            <span>{dateToday}</span>
            <h3>Stay Inspired</h3>
        </div>

        <div className={"banner_container"}>

            {data?.map((d) => (<Link to={`/category/${d.id}/pins/`} key={d.id} className="categories">
                <div className={"category_img_title"}>
                    <img src={d.banner} alt="banner"/>
                    <div className={"cat_title"}>
                        <p>
                            {d.title}

                        </p>
                    </div>
                </div>
            </Link>))}
        </div>
    </>);
};

export default Explore;