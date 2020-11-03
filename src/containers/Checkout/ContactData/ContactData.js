import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinener/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Your Full Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: {
                    value: false,
                    errorMessage: ''
                },
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: {
                    value: false,
                    errorMessage: ''
                },
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Postal Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 8,
                },
                valid: {
                    value: false,
                    errorMessage: ''
                },
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: {
                    value: false,
                    errorMessage: ''
                },
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter Your E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: {
                    value: false,
                    errorMessage: ''
                }
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: '', display: 'Please Select' },
                        { value: 'fastest', display: 'Fastest' },
                        { value: 'cheapest', display: 'Cheapest' },
                    ]
                },
                value: '',
                validation: {
                    required: true
                },
                valid: {
                    value: false,
                    errorMessage: ''
                },
                touched: false
            }
        },
        loading: false,
        formValid: false
    }
    cekVaidity(value, rules = true) {
        let isValid = true;
        let errorMessage = null;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
            errorMessage = 'This field is required';
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
            errorMessage = 'Please enter atleast ' + rules.minLength + ' characters'
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
            errorMessage = 'Maximum characther is ' + rules.maxLength
        }
        if (rules.isEmail) {
            const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid = pattern.test(value) && isValid
            errorMessage = 'Please user email format'

        }
        const dataValidity = {
            value: isValid,
            message: errorMessage
        };
        return dataValidity;
    }
    componentDidMount() {
        // console.log(this.props.ingredients, this.props.totalPrice,);
    }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const formData = {}
        for (const key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value;
        }
        const order = {
            ingredients: this.props.ing,
            price: this.props.price.toFixed(2),
            orderData: formData
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({
                    loading: false,
                });
                this.props.history.push('/orders');
            })
            .catch(error => {
                this.setState({ loading: false, });
            })
    }

    inputChangedHandler = (e, identifier) => {
        const updateOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updateOrderForm[identifier]
        };
        updatedFormElement.value = e.target.value
        const validity = this.cekVaidity(e.target.value, updatedFormElement.validation)
        updatedFormElement.valid = {
            value: validity.value,
            errorMessage: validity.message
        }
        updatedFormElement.touched = true
        updateOrderForm[identifier] = updatedFormElement;
        let formValid = true
        for (const key in updateOrderForm) {
            formValid = updateOrderForm[key].valid.value && formValid
        }

        this.setState({ 'orderForm': updateOrderForm, formValid: formValid });
    }

    render() {
        let formElement = [];
        for (const key in this.state.orderForm) {
            formElement.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form =
            this.state.loading ?
                <Spinner /> :
                <div><h4>Enter your Contact Data</h4>
                    <form onSubmit={this.orderHandler}>
                        {formElement.map(formItem => {
                            return (
                                <Input
                                    key={formItem.id}
                                    elementType={formItem.config.elementType}
                                    elementConfig={formItem.config.elementConfig}
                                    value={formItem.config.value}
                                    changed={(e) => this.inputChangedHandler(e, formItem.id)}
                                    validity={formItem.config.valid}
                                    touched={formItem.config.touched}
                                    shouldValidate={formItem.config.validation}
                                />
                            )
                        })}
                        <Button disabled={!this.state.formValid} btnType="Success" clicked={this.orderHandler}>Order NOW!</Button>
                    </form>

                </div>;
        return (
            <div className={classes.ContactData}>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return ({
        ing: state.ingredients,
        price: state.totalPrice
    })
}

export default connect(mapStateToProps)(ContactData);
