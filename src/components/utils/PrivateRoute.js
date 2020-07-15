import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import isLogin from './isLogin'


export const PrivateRoute = ({component: Component, ...rest}) => {

    return (
        <Route {...rest} render={props => (
            isLogin() ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            isLogin() && restricted ?
                <Redirect to="/admin" />
            : <Component {...props} />
        )} />
    );
};