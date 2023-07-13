import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadFeed } from '../../../store/reducers/feed';
import Profile from '../../Profile/Profile';
import './ProfileSection.css';

const ProfileSection = () => {
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
        <div id='profile-section'>
            <Profile currentUserId={userIds[0]}/>
        </div>
    )
}

export default ProfileSection;