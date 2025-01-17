import React, {useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import ImageGrid from "./ImageGrid.jsx";
import useFetch from "../hooks/useFetch.js";
import MainLoader from "./MainLoader.jsx";

const NoPinsCategory = () => {
    return (
        <div className="center_div">
            <h1>No pins under this category</h1>
            <Link to={"/create"}>
                <button className={"btn btn__red"}>Create one</button>
            </Link>
        </div>
    )
}

const CategoryPins = () => {
    const params = useParams()
    const [loading, error, data, fetcher] = useFetch(`category/${params.id}/pins`)


    useEffect(() => {
        fetcher()
    }, []);

    if (loading) {
        return <MainLoader/>
    }
    if (error) {
        return <h1>{error}</h1>
    }


    return (
        <div>
            {data.length > 0 ? <ImageGrid pinInfo={data}/> : <NoPinsCategory/>}
        </div>
    );
};

export default CategoryPins;