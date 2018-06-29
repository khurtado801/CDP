import React, { Component } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import Home from '../views/Home';
import About from '../views/About';
import Contact from '../views/Contact';
import NewSearch from '../views/NewSearch';
import './nav.css';

class Nav extends Component {
    render() {
        return (
            <div className="wrapper">
                    <div className="header-wrapper">
                        <ul className="header">
                            <li ><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/newsearch">Search</NavLink></li>
                            <li><NavLink to="/about">About</NavLink></li>
                            <li><NavLink to="/contact">Contact</NavLink></li>
                        </ul>
                    </div>
                    <div className="content">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/NewSearch" component={NewSearch} />
                            <Route path="/About" component={About} />
                            <Route path="/Contact" component={Contact} />
                        </Switch>
                    </div>
            </div>
        );
    }
}

export default Nav;