import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchPostById } from '../../store/reducers/posts';
import Comment from '../Comments/Comment';
import CommentForm from '../Comments/CommentForm';
import { v4 as uuid } from 'uuid';

const PostDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const post = useSelector(state => state.posts[id]);

    useEffect(() => {
        dispatch(fetchPostById(id));
    }, [post])

    return (
        <div id='post'>
            <h1>{post.title}</h1>
            <p>{post.description}</p>
            <p>{post.body}</p>
            <hr />
            <h2>Comments</h2>
            {post.comments && <div>
                {post.comments.map(comment => (
                    <Comment key={uuid()} comment={comment} />
                ))}
            </div>}
            <CommentForm postId={id} />
        </div>
    )
}

export default PostDetail;