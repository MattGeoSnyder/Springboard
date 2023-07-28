import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { loadUserAssets } from '../../store/thunks';
import { setLikes } from '../../store/reducers/currentUser'
import { loadFeed, getNextUser } from '../../store/reducers/feed';
import Profile from "../Profile/Profile";
import ProfileLoading from './ProfileLoading';
import './UserHome.css'

const UserHome = () => {
    const dispatch = useDispatch();

    const [offset, setOffset] = useState(0);

    const userId = useSelector(state => state.user.user.id);

    const likes = useSelector(state => state.currentUser.likes);
    const userIds = useSelector(state => state.feed.userIds);

    //load users matches and notifications upon going to the home page.
    useEffect(() => {
        dispatch(loadUserAssets(userId));
    },[userId, dispatch]);

    useEffect(() => {
        if (userIds?.length === 0) {
            dispatch(loadFeed({ userId, offset }));
            setOffset(state => state + 10);
        }
    }, [userIds, dispatch]);

    useEffect(() => {
        if (likes !== null) {
            setTimeout(() => {
                dispatch(getNextUser());
                dispatch(setLikes(null));
            }, 250);
        }
    }, [likes, dispatch]);

    const render = () => {
        if (userIds) {
            return <Profile id={userIds[0]}/>
        } else {
            return <ProfileLoading />
        }
    }

    return (
        <>
            {render()}
        </>
    )
}

export default UserHome;