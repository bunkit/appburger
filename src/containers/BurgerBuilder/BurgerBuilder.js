import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinener/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';



class BurgerBuilder extends Component {


    state = {
        purchasing: false,
        loading: false,
        error: false
    }
    //componentDidMount() {
    // axios.get('https://react-my-burger-d4cec.firebaseio.com/ingredients.json')
    //     .then(response => {
    //         this.setState({ ingredients: response.data })
    //     })
    //     .catch(err => {
    //         this.setState({ error: true })
    //     });
    //}



    updatePurchaseState(ingredients) {

        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return (sum > 0)
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.history.push('checkout')
    }

    render() {
        const disableInfo = {
            ...this.props.igr
        }
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary = null;

        let burger = this.state.error ? <h2 style={{ textAlign: 'center' }}>Ooops.... <br /> Data Cannot be Found!!</h2> : <Spinner />
        if (this.props.igr) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.igr} />
                    <BuildControls
                        ingredientAdded={this.props.onAddIngredients}
                        ingredientRemoved={this.props.onRemoveIngredients}
                        disabled={disableInfo}
                        price={this.props.tPrice}
                        purchasable={this.updatePurchaseState(this.props.igr)}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.igr}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.tPrice.toFixed(2)}
            />;
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        igr: state.ingredients,
        tPrice: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredients: (ingredientName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingredientName }),
        onRemoveIngredients: (ingredientName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingredientName })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
