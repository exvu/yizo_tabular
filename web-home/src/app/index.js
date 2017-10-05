import React from 'react'
import { render } from 'react-dom'
import StartPage from './StartPage'
import TabularEditor from './Tabular/editor'
import TabularFieldList from './TabularField/list'
import TabularFieldEditor from './TabularField/editor'
import Sign from './Sign'
import Home from './Home'
import './index.less'
import {
    HashRouter,
    Route
} from 'react-keeper';
import PrivateRoute from './common/PrivateRoute';
export default class App extends React.Component {
    render() {
        return (
            <HashRouter >
                <div className="page-wrapper">
                    <PrivateRoute path="/home" component={Home} />
                    <PrivateRoute path="/tabular/:tid/field/list" component={TabularFieldList} />
                    <PrivateRoute path="/tabular/:tid/editor" component={TabularEditor} />
                    <PrivateRoute path="/tabular/create" component={TabularEditor} />
                    <PrivateRoute path="/tabular/:tid/field/create" component={TabularFieldEditor} />
                    <PrivateRoute path="/tabular/:tid/field/editor/:fid" component={TabularFieldEditor} />
                    <Route path="/signIn" component={Sign} />
                    <Route index component={StartPage} />
                </div>
            </HashRouter>
        )
    }
}   