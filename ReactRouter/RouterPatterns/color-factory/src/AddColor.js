import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const AddColor = ({setColors}) => {
    const initialData = {
        color: '#000000',
        name: ''
    }

    const [formData, setFormData] = useState(initialData);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData(data => ({...data, [name]:value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.name !== 'new'){
            console.log('submitting');
            setColors(colors => [formData, ...colors]);
            navigate('/colors')
        }
    }

    return (
        <>
            <h1>Add a new color</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='color'>Color:</label>
                <input
                    id='color' 
                    name='color'
                    type="color"
                    value={formData.color}
                    onChange={handleChange}
                    />
                <label htmlFor='name'>Color Name:</label>
                <input
                    id='name'
                    name='name'
                    type='text'
                    value={formData.name}
                    onChange={handleChange}
                    />
                <button>Add</button>
            </form>
        </>
    )
}

export default AddColor;