import React from 'react';
import cache from '../../../sources/lib/cache';
import { Route,Control } from 'react-keeper'
const PrivateRoute = ({ component: Component, ...rest }) => {

    if(!cache.local.getItem("access-token")){
        Control.go('/signIn')
    }
    return <Route {...rest} component={Component}/>
}
export default PrivateRoute;