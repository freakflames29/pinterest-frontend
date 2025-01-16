// import { useState } from "react"


// export function useFetch(route,...token){
//     const [loading,setLoading] = useState()
// }

// useFetch("sourav","123")


// ! TODO: Add custom hook for data fetching

import {ROOT_URL} from "../Constants.js";
import axios from "axios";
import {useState} from "react";

const useFetch = (path) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState()


    const fetcher = async () => {
        const url = ROOT_URL + path + "/"

        try {
            setLoading(true)
            const res = await axios.get(url)
            setData(res.data)

        } catch (e) {
            console.log("Error in useFetch hook", e)
            setError(e.message)

        } finally {
            setLoading(false)
        }

    }


    return [loading, error, data,fetcher]
}

export default useFetch;