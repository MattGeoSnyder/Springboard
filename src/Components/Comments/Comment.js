import { useDispatch } from "react-redux";
import { deleteComment } from "../../store/reducers/posts";
import './Comment.css'

const Comment = ({postId, comment}) => {
    const dispatch = useDispatch();

    const remove = () => {
        dispatch(deleteComment({postId, commentId: comment.id}))
    }

    return (
        <div className="comment">
          <i className="fa-solid fa-x" onClick={remove}></i> <p>{comment.text}</p>
        </div>
    )
}

export default Comment;