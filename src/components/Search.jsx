import React, {useEffect, useState} from 'react';
import {useParams, useSearchParams} from "react-router-dom";
import MainLoader from "./MainLoader.jsx";
import {ROOT_URL} from "../Constants.js";
import axios from "axios";
import ImageGrid from "./ImageGrid.jsx";

const Search = () => {
    const [params] = useSearchParams()
    const query = params.get("search")
    const [searchPins, setSearchPins] = useState([])
    const [loader, setLoader] = useState(false)
    const [err, setErr] = useState(null)

    const getSearchPins = async () => {

        try {
            setLoader(true)
            const URL = `${ROOT_URL}pin?search=${query}`
            const res = await axios(URL)
            console.log(res.data)
            if (res.data.length > 0) {

                setSearchPins(res.data)
                setErr(null)
            }
            else{
                setErr("No pins found")
            }

        } catch (e) {
            console.log(e)
            setErr(e.message)
        } finally {
            setLoader(false)
        }

    }

    useEffect(() => {
        getSearchPins()
    }, [query]);

    if (loader) {
        return <MainLoader/>
    }
    if (err) {
        return <h1 align={"center"}>{err}</h1>
    }

    return (
        <div>
            <ImageGrid pinInfo={searchPins}/>
        </div>
    );
};

export default Search;