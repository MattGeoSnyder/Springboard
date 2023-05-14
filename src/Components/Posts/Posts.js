import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../store/reducers/posts";
import Post from "./Post";
import './Posts.css';

const Posts = () => {
    const posts = useSelector(state => state.posts);
    const postArr = Object.entries(posts);

    return (
        <div id='posts'>
            {postArr.map(([key, value]) => (
                <Post key={key} id={key} post={value} detail={false}/>
            ))}
        </div>
    )
}

export default Posts;

