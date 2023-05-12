import { Link } from "react-router-dom";

const Post = ({id, post}) => {
    const {title, description, body} = post;

    return (
        <div className="post">
            <Link to={`/posts/${id}`}>
                <h1>{title}</h1>
            </Link>
            <p>{description}</p>
        </div>
    )
}

export default Post;