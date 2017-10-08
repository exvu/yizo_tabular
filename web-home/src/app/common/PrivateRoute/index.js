import React from 'react';
import cache from '../../../sources/lib/cache';
import signIn from '../../Sign/SignIn';
import { Route,Control } from 'react-keeper'
const PrivateRoute = ({ component: Component, ...rest }) => {
    return <Route {...rest} component={!cache.local.getItem("access-token")?signIn:Component}/>
}
export default PrivateRoute;