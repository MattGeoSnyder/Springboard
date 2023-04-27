import {useState} from 'react';
import MadlibForm from "./MadlibForm";
import Story from './Story'

const Madlib = () => {
    const initialData = {
        noun1: '',
        noun2: '', 
        adjective: '', 
        color: '',
        storyIdx: 0
    }
    const [formData, setFormData] = useState(initialData);
    const [submitted, setSubmitted] = useState(false);

    const reset = () => {
        setFormData(initialData);
        setSubmitted(false);
    }

    return (
        <div>
            <h1>Madlibs!</h1>
            {!submitted && (
                <MadlibForm formData={formData} setFormData={setFormData} setSubmitted={setSubmitted}/>
            )}
            {submitted && (
                <>
                <Story noun1={formData.noun1} noun2={formData.noun2} adjective={formData.adjective} color={formData.color}/>
                <button onClick={reset}>Reset</button>
                </>
            )}
        </div>
    )
}

export default Madlib;