import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            cheese: 0,
            bacon: 0
        },
        totalPrice: 0
    }
    componentDidMount() {
        const parse = new URLSearchParams(this.props.location.search);
        let ingredients = {};
        let setPrice = '0';
        parse.forEach(function (value, key) {
            if (key === 'price') {
                setPrice = value
            } else {
                ingredients[key] = parseInt(value)
            }
        })
        this.setState({ ingredients: ingredients, totalPrice: setPrice })
    }
    checkoutCancelledHandler = () => {
        this.props.history.push('/burger-builder');
    }
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route path={this.props.match.path + '/contact-data'} render={(props) => (<ContactData {...props} ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} />)} />
            </div>
        )
    }
}

export default Checkout;
