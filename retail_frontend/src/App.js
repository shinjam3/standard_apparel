import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import {Provider} from 'react-redux';
import store from './store.js';

// components and pages
import Header from './components/Header.js';
import Home from './pages/Home.js';
import Catalog from './pages/Catalog.js';
import More from './pages/More.js';
import Profile from './pages/Profile.js';
import DeletedAccount from './pages/DeletedAccount.js';
import Register from './pages/Register.js';
import ForgotPass from './pages/ForgotPass.js';
import NotFound from './pages/NotFound.js';

class App extends Component {	
	render() {
		return (
			<Provider store={store}>
				<Router>
					<Header />
					
					<Switch>
						<Route path='/women' render={ props => <Catalog section={'women'} /> }	/>
						
						<Route path='/men' render={ props => <Catalog section={'men'} /> }	/>
						
						<Route path='/kids' render={ props => <Catalog section={'kids'} /> } />
						
						<Route path='/more' component={More} />
						
						<Route path='/profile' render={ props => <Profile /> } />
						
						<Route path='/account-deleted' render={ props => <DeletedAccount {...props} /> } />
						
						<Route path='/register' component={Register} />
						
						<Route path='/forgot-password' component={ForgotPass} />
						
						<Route path='/not-found' render={ props => <NotFound {...props} />} />
						
						<Route path='/' exact component={Home} />
						
						<Redirect to='/not-found' />
					</Switch>
				</Router>
			</Provider>
		)
	}
}

export default App;
