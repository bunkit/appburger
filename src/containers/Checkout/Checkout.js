import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';


class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.push('/burger-builder');
    }
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render() {
        let summary = <Redirect to="/burger-builder" />;
        if (this.props.ing) {
            const purchased = this.props.purchased ? <Redirect to="/burger-builder" /> : null;
            summary = (
                <div>
                    {purchased}
                    <CheckoutSummary
                        ingredients={this.props.ing}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}
                    />

                    <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
                </div>
            )
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return ({
        ing: state.burgerBuilderReducer.ingredients,
        purchased: state.orderReducer.purchased
    })
}

export default connect(mapStateToProps)(Checkout)
