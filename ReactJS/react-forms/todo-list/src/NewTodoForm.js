import React, {useState} from 'react';

const NewTodoForm = ({setTodos}) => {
    let [todoData, setTodoData] = useState("");
    const handleChange = (e) => {
        const {value} = e.target;
        setTodoData(value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setTodos((todos) => [...todos, todoData]);
    }
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='todo'>Add task</label>
            <input
                id='todo'
                name='todo'
                value={todoData}
                onChange={handleChange}
            />
            <button>Add</button>
        </form>
    )
}

export default NewTodoForm;