import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../store/reducers/posts";
import Post from "./Post";

const Posts = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts);
    const postArr = Object.entries(posts);


    useEffect(() => {
        dispatch(fetchPosts());
    }, [])

    return (
        <div id='posts'>
            {postArr.map(([key, value]) => (
                <Post key={key} id={key} post={value} detail={false}/>
            ))}
        </div>
    )
}

export default Posts;

