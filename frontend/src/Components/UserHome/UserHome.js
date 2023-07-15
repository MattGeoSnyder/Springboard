import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { loadFeed } from '../../store/reducers/feed';
import { useParams } from 'react-router-dom';
import Profile from "../Profile/Profile"

import './UserHome.css'

const UserHome = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();

    const [offset, setOffset] = useState(0);
    const userIds = useSelector(state => state.feed.userIds);

    useEffect(() => {
        if (userIds.length === 0) {
            dispatch(loadFeed({ userId, offset }));
            setOffset(state => state + 10);
        }
    }, [userIds, dispatch]);

    return (
        <Profile currentUserId={userIds[0]}/>
    )
}

export default UserHome;