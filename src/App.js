import React, { Component } from "react";
import { connect } from 'react-redux';

import "./App.module.css";
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
// import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders';
// import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout';
import * as actions from './store/actions'
import asyncComponent from './hoc/asyncComponents/asyncComponents';

const asyncCheckout = asyncComponent(() => {
	return import('./containers/Checkout/Checkout')
})
const asyncOrders = asyncComponent(() => {
	return import('./containers/Orders/Orders')
})
const asyncAuth = asyncComponent(() => {
	return import('./containers/Auth/Auth')
})

class App extends Component {
	componentDidMount() {
		this.props.onAutoLogin()
	}
	render() {
		let routes = (
			<Switch>
				<Route exact path="/">
					<Redirect to="/burger-builder" />
				</Route>
				<Route path="/auth" component={asyncAuth} />
				<Route exact path="/burger-builder" component={BurgerBuilder} />
				<Redirect to="/burger-builder" />
			</Switch>
		)

		if (this.props.isAuthenticated) {
			routes = (
				<Switch>
					<Route exact path="/">
						<Redirect to="/burger-builder" />
					</Route>
					<Route path="/auth" component={asyncAuth} />
					<Route path="/logout" component={Logout} />
					<Route path="/checkout" component={asyncCheckout} />
					<Route path="/orders" component={asyncOrders} />
					<Route exact path="/burger-builder" component={BurgerBuilder} />
				</Switch>
			)
		}

		return (
			<BrowserRouter>
				<div className="App">
					<Layout>
						{routes}
					</Layout>
				</div>
			</BrowserRouter>
		);
	}
}

const mapStateToProps = state => {
	const LOCAL_STORAGE = JSON.parse(localStorage.getItem('dataAuth'));

	return {
		// isAuthenticated: state.authReducer.token !== null
		isAuthenticated: LOCAL_STORAGE !== null
	}
}
const mapDispatchToProps = dispatch => {
	return {
		onAutoLogin: () => dispatch(actions.authCheckLocalStorage())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
