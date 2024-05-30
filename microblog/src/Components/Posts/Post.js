import { Link } from "react-router-dom";
import VoteBar from "./VoteBar";
import './Post.css'

const Post = ({id, post}) => {
    const {title, description, body, votes} = post;

    return (
        <div className="post">
            <Link to={`/posts/${id}`}>
                <h1>{title}</h1>
            </Link>
            <p>{description}</p>
            <VoteBar detail={false} id={id} />
        </div>
    )
}

export default Post;