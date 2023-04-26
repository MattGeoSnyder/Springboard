import React, {useState} from 'react';
const Todo = ({task, idx, remove}) => {
    return (
        <li>
            <button onClick={(e) => remove(idx)}>X</button> {task}
        </li>
    )
}

export default Todo;