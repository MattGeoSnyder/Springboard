import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNewPost, editPost } from '../../store/reducers/posts'
import './PostForm.css'

const NewPost = ({id, title='', description='', body='', edit, toggleEdit}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initialData = {
        title,
        description,
        body
    }

    const [formData, setFormData] = useState(initialData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(data => ({...data, [name]: value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.values(formData).every(val => val)) {
            if (edit) {
                dispatch(editPost({
                    id,
                    title: formData.title,
                    description: formData.description,
                    body: formData.body
                }));
                toggleEdit(e => !e);
            } else {
                dispatch(addNewPost(formData));
                redirectHome();
            }
        }
    }

    const redirectHome = () => {
        navigate('/');
    }

    return (
        <form id="post-form" onSubmit={handleSubmit}>
            {edit && <i class="fa-solid fa-circle-left" onClick={toggleEdit}></i>}

            <div>
            <label htmlFor="title">Title:</label>
            <input 
                id='title'
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                />
            </div>
            <div>
            <label htmlFor="title">Description:</label>
            <input 
                id='description'
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                />
            </div>
            <div>
            <label htmlFor="title">Body:</label>
            <textarea 
                id='body'
                name="body"
                value={formData.body}
                onChange={handleChange}
                rows="10"
                />
            </div>
            <div id="button-bar">
            <button style={{backgroundColor: "cyan"}}>Save</button>
            <button 
                type='button' 
                style={{backgroundColor: "lightgrey"}} 
                onClick={edit ? toggleEdit : redirectHome}
            > Cancel</button>
            </div>
        </form>
    )
}

export default NewPost;