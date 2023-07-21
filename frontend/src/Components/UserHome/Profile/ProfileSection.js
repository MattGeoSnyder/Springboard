import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadFeed } from '../../../store/reducers/feed';
import Profile from '../../Profile/Profile';
import './ProfileSection.css';

const ProfileSection = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();

    const userIds = useSelector(state => state.feed.userIds);

    useEffect(() => {
        if (userIds.length === 0) {
            dispatch(loadFeed({ userId }));
        }
    }, [userIds, dispatch]);
    
    return (
        <div id='profile-section'>
            <Profile currentUserId={userIds[0]}/>
        </div>
    )
}

export default ProfileSection;