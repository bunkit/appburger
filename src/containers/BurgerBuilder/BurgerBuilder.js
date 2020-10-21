import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinener/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }
    componentDidMount() {
        axios.get('https://react-my-burger-d4cec.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data })
            })
            .catch(err => {
                this.setState({ error: true })
            });
    }

    addIgredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIgredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - + priceDeduction;

        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    }

    updatePurchaseState(ingredients) {

        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({ purchasable: sum > 0 });
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    // checkoutHandler = () => {
    //     // alert('Yay, Bonapetite');
    //     this.setState({ loading: true });
    //     const order = {
    //         ingredients: this.state.ingredients,
    //         price: this.state.totalPrice.toFixed(2),
    //         customer: {
    //             name: 'Bambang Nurmantyo',
    //             address: {
    //                 street: 'Kertosono Nganjuk',
    //                 zipCode: '2435436',
    //                 country: 'Sunda Empire'
    //             },
    //             email: 'bambs@sunpire.com'
    //         },
    //         deliveryMethod: 'fastest'
    //     }
    //     axios.post('/orders.json', order)
    //         .then(response => {
    //             this.setState({
    //                 loading: false,
    //                 purchasing: false,
    //                 ingredients: {
    //                     salad: 0,
    //                     bacon: 0,
    //                     cheese: 0,
    //                     meat: 0,
    //                 }
    //             });
    //         })
    //         .catch(error => {
    //             this.setState({ loading: false, purchasing: false });
    //         })
    // }

    purchaseContinueHandler = () => {
        const theIngredients = { ...this.state.ingredients };
        let ingredientsServed = [];
        for (const key in theIngredients) {
            ingredientsServed.push(encodeURIComponent(key) + '=' + encodeURIComponent(theIngredients[key]));
        }
        ingredientsServed.push('price=' + this.state.totalPrice.toFixed(2));
        const queryIngredients = ingredientsServed.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryIngredients
        })
    }

    render() {
        const disableInfo = {
            ...this.state.ingredients
        }
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary = null;

        let burger = this.state.error ? <h2 style={{ textAlign: 'center' }}>Ooops.... <br /> Data Cannot be Found!!</h2> : <Spinner />
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIgredientHandler}
                        ingredientRemoved={this.removeIgredientHandler}
                        disabled={disableInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.state.totalPrice.toFixed(2)}
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

export default withErrorHandler(BurgerBuilder, axios);
