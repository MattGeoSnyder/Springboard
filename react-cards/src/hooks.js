import React, {useState} from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

const useFlip = () => {
    const [flip, setFlip] = useState(true);

    const toggleFlip = () => {
        setFlip(!flip);
    }

    return [flip, toggleFlip];
}

const useAxios = (baseURL) => {
    const [resData, setResData] = useState([]);
    const [url, setURL] = useState(baseURL)

    const addData = (endURL="") => {
        const makeReq = async () => {
            try {
                let res = await axios.get(url + endURL);
                setResData(data => [...data, {...res.data, id: uuid()} ])
            } catch (error) {
                alert(error.stack);                
            }
        }
        makeReq();
    }

    return [resData, addData]
}

export {useFlip, useAxios};