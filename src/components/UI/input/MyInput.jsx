import React from 'react';
import css from './MyInput.module.css'
const MyInput = (props) => {
    return (
        <input className={css.input} {...props}/>
    );
};

export default MyInput;