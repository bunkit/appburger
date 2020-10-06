import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false,
    }
    sideDrawerClosed = () => {
        this.setState({showSideDrawer:false})
    }
    sideDrawerOpen = () => {
        this.setState({showSideDrawer:true})
    }
    sideDrawerToggle = () => {
        this.setState( (prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }
    render () {
        return (
            <Aux>
                <Toolbar clickedMenu={this.sideDrawerToggle}/>
                <SideDrawer 
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosed}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
};
export default Layout;
