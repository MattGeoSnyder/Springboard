import { useState } from 'react';
import SnackOrBoozeApi from './Api';
import { Card, CardBody, CardTitle } from 'reactstrap';
import './MenuForm.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const MenuForm = ({ route }) => {
    //initial data for our form
    const initialData = {
        id: '',
        name: '',
        description: '', 
        recipe: '', 
        serve: ''
    }

    const history = useHistory();

    //form data state
    const [formData, setFormData] = useState(initialData);

    //handle change for inputs
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(data => ({...data, [name]: value}));
    }

    //handle submisison of form
    const handleSubmit = async (e) => {
        e.preventDefault();

        //modify database id based on name input
        setFormData(data => ({...data, id: data.name.toLowerCase().replace(" ", "-")}))

        //validate that there are no empty string values
        if (Object.values(formData).every(val => val)) {

            //post request to database
            try {
                await SnackOrBoozeApi.addSnack(formData, route);
            } catch(e) {
                alert(e.message);
            }

            history.push(`/${route}`);
            //reset form data
        }
    }

    return (
        <Card>
            <CardTitle><h3 style={{textAlign: 'center', marginTop: '1.5rem'}}>Add Something</h3></CardTitle>
            <CardBody>


        <form id="menu-form" onSubmit={handleSubmit}>
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
            <button style={{marginTop: '2rem'}}>Submit</button>    
        </form>
            </CardBody>
        </Card>
    )
}

export default MenuForm;