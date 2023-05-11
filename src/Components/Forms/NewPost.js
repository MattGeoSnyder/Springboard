import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewPost = () => {
    const navigate = useNavigate();

    const initialData = {
        title: '',
        description: '',
        body: ''
    }

    const [formData, setFormData] = useState(initialData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(data => ({...data, [name]: value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const redirectHome = () => {
        navigate('/');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                id='title'
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
            />
            <input 
                id='desc'
                name="desc"
                placeholder="Description"
                value={formData.desc}
                onChange={handleChange}
            />
            <textarea 
                id='body'
                name="body"
                value={formData.body}
                onChange={handleChange}
            />
            <button type="button" onClick={redirectHome}>Save</button>
            <button type='button' onClick={redirectHome}>Cancel</button>
        </form>
    )
}

export default NewPost;