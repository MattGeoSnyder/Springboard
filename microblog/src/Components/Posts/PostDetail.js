import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPostById, deletePost } from '../../store/reducers/posts';
import Comment from '../Comments/Comment';
import CommentForm from '../Forms/CommentForm';
import { v4 as uuid } from 'uuid';
import EditPost from '../Forms/PostForm';
import VoteBar from './VoteBar';
import './PostDetail.css';


const PostDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const post = useSelector(state => state.posts[id]);
    const [edit, setEdit] = useState(false);
    const navigate = useNavigate();

    const {title, description, body, votes} = post;

    useEffect(() => {
        dispatch(fetchPostById(id));
    }, [])

    const toggleEdit = () => {
        setEdit(e => !e)
    }

    const removePost = () => {
        dispatch(deletePost(id));
        navigate('/');
    }

    if (edit) {
        return (
            <>
                <EditPost 
                    id={id}
                    title={title} 
                    description={description} 
                    body={body} 
                    edit={edit} 
                    toggleEdit={toggleEdit}
                />
                <hr />
                <div>
                    <h2>Comments</h2>
                    {post.comments && <div>
                        {post.comments.map(comment => (
                            <Comment key={uuid()} postId={id} comment={comment} />
                            ))}
                    </div>}
                    <CommentForm postId={id} />
                </div>
            </>
        )
    }

    if (!edit) {
        return (
            <div id='post'>
                <div id='header'>
                    <h1>{post.title}</h1>
                    <div id='icons'>
                        <i className="fa-solid fa-pen-to-square" onClick={toggleEdit}></i>
                        <i className="fa-solid fa-trash" onClick={removePost}></i>
                    </div>
                </div>
                <p>{post.description}</p>
                <p>{post.body}</p>
                <VoteBar detail={true} id={id}/>
                <hr />
                <h2>Comments</h2>
                {post.comments && <div id='comments'>
                    {post.comments.map(comment => (
                        <Comment key={uuid()} postId={id} comment={comment} />
                        ))}
                </div>}
                <CommentForm postId={id} />
            </div>
        )
    }
}

export default PostDetail;