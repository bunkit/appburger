import classes from './Auth.module.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import * as actions from '../../store/actions/'

class Auth extends Component {

    state = {
        formElement: {
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
                },
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
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
        },
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

    inputChangedHandler = (e, identifier) => {
        const updatedForm = {
            ...this.state.formElement
        }
        const updatedFormElement = {
            ...updatedForm[identifier]
        };
        updatedFormElement.value = e.target.value
        const validity = this.cekVaidity(e.target.value, updatedFormElement.validation)
        updatedFormElement.valid = {
            value: validity.value,
            errorMessage: validity.message
        }
        updatedFormElement.touched = true
        updatedForm[identifier] = updatedFormElement;
        let formValid = true
        for (const key in updatedForm) {
            formValid = updatedForm[key].valid.value && formValid
        }
        this.setState({ 'formElement': updatedForm, formValid: formValid });
    }

    loginHandler = (e) => {
        e.preventDefault();
        const formData = {}
        for (const key in this.state.formElement) {
            formData[key] = this.state.formElement[key].value;
        }
        console.log(formData)
        this.props.onAuth(formData.email, formData.password);
    }

    render() {
        let formElement = [];
        for (const key in this.state.formElement) {
            formElement.push({
                id: key,
                config: this.state.formElement[key]
            })
        }
        const form = formElement.map(formItem => {
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
        })

        return (
            <div className={classes.Auth}>
                <h3>Please Login</h3>
                <form onSubmit={this.orderHandler}>
                    {form}
                    <Button disabled={!this.state.formValid} btnType="Success" clicked={this.loginHandler}>Submit</Button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.authenticate(email, password))
    }
}

export default connect(null, mapDispatchToProps)(Auth);
