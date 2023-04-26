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

const useAxios = (url) => {
    const [resData, setResData] = useState([]);
    console.log(url);

    const addData = () => {
        const makeReq = async () => {
            let res = await axios.get(url);
            return res.data;
        }
        const data = makeReq(url);
        console.log(data);
        setResData([...resData, {...data, id: uuid()}]);
    }

    return [resData, addData]
}

export {useFlip, useAxios};