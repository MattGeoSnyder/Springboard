import { useState } from 'react';
import SnackOrBoozeApi from './Api';

const ItemForm = ({ route }) => {
    const initialData = {
        id: '',
        name: '',
        description: '', 
        recipe: '', 
        serve: ''
    }

    const [formData, setFormData] = useState(initialData);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(data => ({...data, [name]: value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.values(formData).every(val => val)) {
            SnackOrBoozeApi(formData, route);
            setFormData(initialData);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                id='name' 
                name='name'
                value={formData.name}
                onChange={handleChange}
            />
            <input
                id='description' 
                name='description'
                value={formData.description}
                onChange={handleChange}
            />
            <input
                id='recipe' 
                name='recipe'
                value={formData.recipe}
                onChange={handleChange}
            />
            <input
                id='serve' 
                name='serve'
                value={formData.serve}
                onChange={handleChange}
            />    
        </form>
    )
}