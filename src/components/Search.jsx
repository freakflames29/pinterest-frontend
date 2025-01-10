import React from 'react';
import {useParams, useSearchParams} from "react-router-dom";

const Search = () => {
    const [params] = useSearchParams()
    const query = params.get("search")


    return (
        <div>
            <h1>Searched this -> {query}</h1>
        </div>
    );
};

export default Search;