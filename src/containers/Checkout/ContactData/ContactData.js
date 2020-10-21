import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinener/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }
    componentDidMount() {
        // console.log(this.props.ingredients, this.props.totalPrice,);
    }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Sumarni Bambang',
                address: {
                    street: 'Kertosono Nganjuk',
                    zipCode: '2435436',
                    country: 'Sunda Empire'
                },
                email: 'bambs@sunpire.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({
                    loading: false,
                });
                this.props.history.push('/burger-builder');
            })
            .catch(error => {
                this.setState({ loading: false, });
            })
    }

    render() {
        let form =
            this.state.loading ?
                <Spinner /> :
                <div><h4>Enter your Contact Data</h4>
                    <form action="">
                        <Input inputType="input" type="text" name="name" placeholder="Your Name" />
                        <Input inputType="input" type="text" name="email" placeholder="Your Email" />
                        <Input inputType="textarea" type="text" name="street" placeholder="Street Address" />
                        <Input inputType="input" type="text" name="postal" placeholder="Postal Code" />
                        <Button btnType="Success" clicked={this.orderHandler}>Order NOW!</Button>
                    </form></div>;
        return (
            <div className={classes.ContactData}>
                {form}
            </div>
        )
    }
}

export default ContactData;
