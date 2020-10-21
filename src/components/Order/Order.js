import React from 'react';
import classes from './Order.module.css'
const order = (props) => {
    const ingredients = [];
    for (const key in props.ingredients) {
        ingredients.push(key + ' : (' + props.ingredients[key] + ')')
    }
    return (
        <div className={classes.Order}>
            <p><strong>INGREDIENTS</strong>:</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {ingredients.map((ig, idx) => {
                    let className = '';
                    if (ig.includes('bacon')) {
                        className = classes.Bacon;
                    }
                    if (ig.includes('meat')) {
                        className = classes.Meat;
                    }
                    if (ig.includes('cheese')) {
                        className = classes.Cheese;
                    }
                    if (ig.includes('salad')) {
                        className = classes.Salad;
                    }
                    return (
                        <li className={className} key={idx}>{ig}</li>
                    )
                }
                )}
            </ul>
            <p className={classes.Price}> <strong> USD {props.price} </strong> </p>
        </div>
    )
}


export default order;
