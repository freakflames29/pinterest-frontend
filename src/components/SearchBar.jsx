import React, {useEffect, useState} from 'react';
import {FaSearch} from "react-icons/fa";
import axios from "axios";
import {ROOT_URL} from "../Constants.js";
import {Link, Navigate, useNavigate} from "react-router-dom"

const SearchBar = () => {

    const [searchItem, setSearchItem] = useState("")
    const [searchData, setSearchData] = useState([])
    const navigate = useNavigate()
    const controller = new AbortController()
    const signal = controller.signal

    const searchHandler = (e) => {
        setSearchItem(e.target.value)
        if (e.keyCode === 13) {
            controller.abort()
            setSearchData([])
            navigate(`/pin?search=${searchItem}`)
        } else {


            if (e.target.value.length <= 0) {
                setSearchItem("")
                setSearchData([])
            }
        }
    }


    useEffect(() => {

        const searchFun = async () => {

            try {
                const res = await axios(`${ROOT_URL}pin?search=${searchItem}`, {signal: signal})
                setSearchData(res.data)
            } catch (e) {
                if (!e.code === "ERR_CANCELED") {
                    console.log(e)

                }
            }

        }


        if (searchItem.length > 0) {
            searchFun()
        }

        return () => {
            controller.abort()
        }

    }, [searchItem]);


    const sendToPin = (pinId) => {
        setSearchData([])
        // window.location=`/pin/${pinId}`
        navigate(`/pin/${pinId}`)
    }
    const removeSearchResultBox = () => {
        if (searchData.length > 0) {
            // if there is search element in searchbox then wait 500ms to disappear the box so that we can click on the search element
            setTimeout(() => setSearchData([]), 500)
        }

    }
    return (<>
        <div className="searchBar">

            <FaSearch/>

            <input type="text" placeholder={`Search your ideas here...`} className="input__field" value={searchItem}
                   onChange={searchHandler} onBlur={removeSearchResultBox} onKeyDown={searchHandler}/>
        </div>

        {/*Change search list*/}
        {searchData.length > 0 && <div className="search__item__list">
            {searchData.map((item) => <div key={item.id}>

                <div className="search__result" onClick={() => sendToPin(item.id)}>


                    <FaSearch/>
                    <span>{item.title}</span>

                </div>


            </div>)}


        </div>}
    </>);
};

export default SearchBar;