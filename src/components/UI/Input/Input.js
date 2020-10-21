import classes from './Input.module.css';
import React from 'react';

const input = (props) => {
    let inputElement = null;
    switch (props.inputType) {
        case ('input'):
            inputElement = <input className={classes.Input} {...props} />
            break
        case ('textarea'):
            inputElement = <textarea className={classes.Input} {...props} />
            break
        default:
            inputElement = <input className={classes.Input} {...props} />

    }
    return (
        <div>
            <label className={classes.Label} htmlFor="">{props.label}</label>
            {inputElement}
        </div>
    )

}

export default input;
