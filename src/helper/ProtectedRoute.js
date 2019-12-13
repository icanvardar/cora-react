import React, {Component, useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import Context from '../utils/Context';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    // Gets token from Context via App.js
    const {token} = useContext(Context);
    console.log(rest.path)

    if (rest.path === "/login") {
        return (
            <Route {...rest} render={(props) => (
                token ? 
                   <Redirect to={{ pathname: '/', state: { from: props.location }}} /> : <Component {...props} />   
             )} />
        )
    } else {
        return (
            <Route {...rest} render={(props) => (
                token ? 
                   <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location }}} />   
             )} />
        )
    }
};

export default ProtectedRoute;

