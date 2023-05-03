import { useState } from 'react';
import SnackOrBoozeApi from './Api';
import { Card, CardBody, CardTitle } from 'reactstrap';

const FoodForm = ({ route }) => {
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
            let data = {...formData, id: formData.name.toLowerCase().replace(" ", "-")};
            SnackOrBoozeApi.addSnack(data, route);
            setFormData(initialData);
        }
    }

    return (
        <Card>
            <CardTitle><h3>Add Something</h3></CardTitle>
            <CardBody>


        <form onSubmit={handleSubmit}>
            <label htmlFor='name'>Name: </label>
            <input
                id='name' 
                name='name'
                value={formData.name}
                onChange={handleChange}
                />
            <label htmlFor='description'>Description: </label>
            <input
                id='description' 
                name='description'
                value={formData.description}
                onChange={handleChange}
                />
            <label htmlFor='recipe'>Recipe: </label>
            <textarea
                id='recipe' 
                name='recipe'
                type='text-area'
                value={formData.recipe}
                onChange={handleChange}
            />
            <label htmlFor='serve'>Serve: </label>
            <textarea
                id='serve' 
                name='serve'
                value={formData.serve}
                onChange={handleChange}
            />
            <button>Submit</button>    
        </form>
            </CardBody>
        </Card>
    )
}

export default FoodForm;