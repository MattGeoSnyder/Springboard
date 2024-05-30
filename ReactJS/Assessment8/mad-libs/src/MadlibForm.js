import {useState} from 'react';
import StorySelect from "./StorySelect";
import stories from './Stories';

const MadlibForm = ({formData, setFormData, setSubmitted}) => {

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(data => (
            {...data, [name]: value}
        ));
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        if (Object.values(formData).every((val) => val !== '')) {
            setSubmitted(submit => !submit);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <StorySelect formData={formData} stories={stories}  handleChange={handleChange}/>
            <input
                name='noun1'
                value={formData.noun1}
                placeholder='noun 1'
                onChange={handleChange}
            />
            <input
                name='noun2'
                value={formData.noun2}
                placeholder='noun 2'
                onChange={handleChange}
            />
            <input
                name='adjective'
                value={formData.adjective}
                placeholder='adjective'
                onChange={handleChange}
            />
            <input
                name='color'
                value={formData.color}
                placeholder='color'
                onChange={handleChange}
            />
            <button>Get Story</button>
        </form>
    )
}

export default MadlibForm;