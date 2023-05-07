import {Link} from 'react-router-dom'
import { useEffect, useState } from "react";
import './input.css'
function CustomInput(props) {
    const [focused, setFocused] = useState(false);
    const { signIn,label, errorMessage, onChange, id, ...inputProps } = props
    

    const handleFocus = (e) => {
      setFocused(true);
    };
    useEffect(()=>{
      setFocused(false)
    },[signIn])
    return (
    <div className='customInput'>
        <label>{label}</label>
        <input
            className='registerInput'
            {...props}
            onChange={onChange}
            onBlur={handleFocus}
            focused={focused.toString()}
        ></input>
        <span>{errorMessage}</span>
    </div>
    );
  }
  
  export default CustomInput;