import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinener/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(response => {
                const fetchedOrders = [];
                for (const key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    })
                }
                this.setState({ loading: false, orders: fetchedOrders });
            })
            .catch(err => {
                this.setState({ loading: false });
            })
    }
    render() {
        const reverse = this.state.orders.reverse();
        let orderList = reverse.map(item => (
            <Order key={item.id} orderData={item.orderData} ingredients={item.ingredients} price={item.price} />
        ))
        if (this.state.loading) {
            orderList = <Spinner />
        }
        return (
            <div style={{ width: '80%', margin: 'auto' }}>
                {orderList}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios)


