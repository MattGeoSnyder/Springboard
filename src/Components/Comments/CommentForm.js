import { useState } from "react"
import { useDispatch } from 'react-redux'
import { postComment } from "../../store/reducers/posts";

const CommentForm = ({postId}) => {
    const [comment, setComment] = useState("");
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { val } = e.target;
        setComment(val);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postComment({id: postId, text: comment}))
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                name="comment"
                placeholder="New comment"
                val={comment}
                onChange={handleChange}
            />
            <button>Post</button>
        </form>
    )
}

export default CommentForm;