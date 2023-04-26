import React, {useState} from 'react';
import Todo from './Todo.js';
import NewTodoForm from './NewTodoForm.js';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const remove = (idx) => {
        todos.splice(idx,1)
        setTodos([...todos]);
    } 
    return (
        <div>
            <NewTodoForm setTodos={setTodos} />
            <ul>
                {todos.map((todo,idx) => <Todo key={idx} idx={idx} task={todo} remove={remove}/>)}
            </ul>
        </div>
    )
}

export default TodoList;