import React, {useState} from 'react';
import {v4 as uuid } from 'uuid';

const NewBoxForm = ({setBoxes}) => {
    let initialData = {
        id: uuid(),
        color: '#000000',
        width: '300',
        height:'300'
    }
    const [formData, setFormData] = useState(initialData);
    const onChange = (e) => {
        const {name, value} = e.target;
        setFormData(data => ({...data, [name]: value}));
    }
    const onSubmit = (e) => {
        e.preventDefault();
        setBoxes((boxes) => [...boxes, {id: uuid(), color: formData.color, width: formData.width, height: formData.height}]);
        setFormData(initialData);
    }
    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="color">Color:</label>
            <input
                id='color' 
                type="color"
                name='color'
                value={formData.color}
                onChange={onChange}
            />
            <label htmlFor="width">Width:</label>
            <input
                id='width' 
                type="width"
                name='width'
                value={formData.width}
                onChange={onChange}
            />
            <label htmlFor="height">Height:</label>
            <input
                id='height' 
                type="height"
                name='height'
                value={formData.height}
                onChange={onChange}
            />
            <button>Add Box</button>
        </form>
    )
}

export default NewBoxForm;