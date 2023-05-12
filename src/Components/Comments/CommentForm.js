import { useState } from "react"
import { useDispatch } from 'react-redux'
import { postComment } from "../../store/reducers/posts";

const CommentForm = ({postId}) => {
    const [comment, setComment] = useState("");
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { value } = e.target;
        setComment(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(comment);
        dispatch(postComment({id: postId, text: comment}));
        setComment("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                name="comment"
                placeholder="New comment"
                value={comment}
                onChange={handleChange}
            />
            <button>Post</button>
        </form>
    )
}

export default CommentForm;