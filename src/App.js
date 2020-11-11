import React, { Component } from "react";
import "./App.module.css";
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';

class App extends Component {

	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<Layout>
						<Route exact path="/">
							<Redirect to="/burger-builder" />
						</Route>
						<Route path="/auth" component={Auth} />
						<Route path="/checkout" component={Checkout} />
						<Route path="/orders" component={Orders} />
						<Route exact path="/burger-builder" component={BurgerBuilder} />
					</Layout>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
