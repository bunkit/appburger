import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinener/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions'
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Aux/Aux';
import Button from '../../components/UI/Button/Button';


class Orders extends Component {

    state = {
        modalCancel: false,
        deliveryName: '',
        address: '',
        idOrder: ''
    }

    componentDidMount() {
        this.props.onOrderInit();
    }

    onCancelHandlerModal = (id, data) => {
        const address = `${data.street} ${data.zipCode} ${data.country}`;
        this.setState({
            modalCancel: true,
            deliveryName: data.name,
            address: address,
            idOrder: id
        })
    }
    onNoHandler = (id) => {
        this.setState({ modalCancel: false })
    }
    onYesHandler = (id) => {
        this.setState({ modalCancel: false });
        axios.delete('/orders/' + id + '.json')
            .then(response => {
                this.props.onOrderInit();
                console.log(response)
            })
            .catch(error => {
                console.log(error)

            })
    }
    render() {
        let orderList = <Spinner />;
        if (!this.props.loading) {
            const reverse = this.props.orders.reverse();
            const filtered = this.props.orders.filter(order => order.cancel !== true);
            orderList = reverse.map(item => (
                <Order key={item.id} orderData={item.orderData} ingredients={item.ingredients} price={item.price} cancelOrder={() => this.onCancelHandlerModal(item.id, item.orderData)} />
            ))
        }
        return (
            <Aux>
                <Modal show={this.state.modalCancel} modalClosed={this.onNoHandler}>
                    <div style={{ textAlign: 'center' }}>
                        <h3>
                            Please confirm to Cancel Order ?
                        </h3>
                        <div style={{ textAlign: 'left', display: 'inline-block', margin: 'auto' }}>
                            <p>Deliver To :{this.state.deliveryName}</p>
                            <p>{this.state.address}</p>
                        </div>
                        <div>
                            <Button btnType={'Danger'} clicked={this.onNoHandler}>No</Button>
                            <Button btnType={'Success'} clicked={() => this.onYesHandler(this.state.idOrder)}>Yes, Cancel Order</Button>
                        </div>
                    </div>
                </Modal>
                <div style={{ width: '80%', margin: 'auto' }}>
                    {orderList}
                </div>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.orderReducer.orders,
        loading: state.orderReducer.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderInit: () => dispatch(actions.fetchOrder())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))


