import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { loadUserAssets } from '../../store/thunks';
import { setLikes } from '../../store/reducers/currentUser'
import { loadFeed, getNextUser, setStatus } from '../../store/reducers/feed';
import Profile from "../Profile/Profile";
import ProfileLoading from './ProfileLoading';
import './UserHome.css'

const UserHome = () => {
    const dispatch = useDispatch();

    const [offset, setOffset] = useState(0);

    const userId = useSelector(state => state.user.user.id);

    const status = useSelector(state => state.feed.status);

    const likes = useSelector(state => state.currentUser.likes);
    const userIds = useSelector(state => state.feed.userIds);

    //load users matches and notifications upon going to the home page.
    useEffect(() => {
        if (userId) {
            dispatch(loadUserAssets(userId));
        }
    },[userId, dispatch]);

    useEffect(() => {
        if (status === 'success') {
            dispatch(setStatus('idle'));
        }
    }, [status])

    useEffect(() => {
        if (userIds?.length === 0 && userId) {
            dispatch(loadFeed({ userId, offset }));
        }
    }, [userIds, userId, dispatch]);

    useEffect(() => {
        if (likes !== null) {
            setTimeout(() => {
                dispatch(getNextUser());
                dispatch(setLikes(null));
            }, 250);
        }
    }, [likes, dispatch]);

    const render = () => {
        if (userIds[0]) {
            return <Profile id={userIds[0]}/>
        } else if (status === 'pending') {
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