import { useEffect, useState, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import './Input.css';

// Validated input component. To be placed in parent with form data.
// name (required): name & id of input 
// value (required): value from state in form parent
// setFormData (required): setState function from form parent
// setValid (required): setValid function from form parent 
// type (optional default text): input type default text
// labelText (optional, if empty, label won't be rendered): Text for label
// conditions (optional): array with elements [validCondition (bool), errMsg (string)]
// iconClass (optional): class for html icon element 

const Input = ({ name, type='text', 
                labelText='', placeholder = '',
                conditions = [[true, '']], validationMsg = '', 
                value, setFormData,
                iconClass = '',
                setValid = () => {},
                setPage = () => {}
              }) => {
  
  const [ seen, setSeen ] = useState(false);

  const valid = conditions.every(val => val[0]);

  useEffect(() => {
    setValid(val => ({ ...val, [name]: valid }))
  }, [valid, name, setValid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  const isSeen = () => {
    setSeen(true);
  }

  return (
    <div className="input">
      <i className={iconClass}></i>
      {labelText.length > 0 && <label htmlFor={name}>{labelText}</label>}
      <input 
        placeholder={placeholder}
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        onBlur={isSeen}
        onFocus={(e) => { setPage() }}
      />
      <div className='validation'>
        {(!valid && seen) && <p id='title' >{validationMsg}</p>}
        <ul className='err-list'>
          {conditions.map(val => {
            if (!val[0] && seen) {
              return (
                <li key={uuid()} className={`err-msg`}>
                  {val[1]}
                </li>
              )
            } else {
              return <></>
            }
          })}
        </ul>
      </div>
    </div>
  )
}

export default Input;