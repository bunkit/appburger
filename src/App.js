import React, { Component } from "react";
import "./App.module.css";
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { BrowserRouter, Route } from "react-router-dom";
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

class App extends Component {

	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<Layout>
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
