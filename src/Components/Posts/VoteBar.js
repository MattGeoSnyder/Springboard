import { useDispatch, useSelector } from 'react-redux';
import { vote } from '../../store/reducers/posts';
import './VoteBar.css';

const VoteBar = ({detail, id}) => {
    const dispatch = useDispatch();
    const votes = useSelector(state => state.posts[id].votes);

    const upVote = () => {
        dispatch(vote({id, direction: 'up'}));
    }

    const downVote = () => {
        dispatch(vote({id, direction: 'down'}));
    }

    return (
        <div className={detail ? 'votebar-detail': 'votebar'}>
            <span>
                Votes: {votes}
            </span>
            <i className="fa-solid fa-thumbs-up" onClick={upVote}></i>
            <i className="fa-solid fa-thumbs-down fa-flip-horizontal" onClick={downVote}></i>
        </div>
    )
}

export default VoteBar;