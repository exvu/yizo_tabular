import React from 'react'
import { render } from 'react-dom'
import StartPage from './StartPage'
import TabularEditor from './Tabular/editor'
import TabularFieldList from './TabularField/list'
import TabularFieldEditor from './TabularField/editor'
import QuestionCreater from './question/creater'
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
                    <PrivateRoute  path="/home" component={Home} />
                    <PrivateRoute  path="/question/create" component={QuestionCreater} />
                    <PrivateRoute path="/tabular/editor/:id" component={TabularEditor} />
                    <PrivateRoute path="/tabular/create" component={TabularEditor} />
                    <PrivateRoute  path="/tabular/field/list/:id" component={TabularFieldList} />
                    <PrivateRoute  path="/tabular/field/create/:id" component={TabularFieldEditor} />
                    <PrivateRoute  path="/tabular/field/editor/:id" component={TabularFieldEditor} />
                    <Route path="/signIn" component={Sign} />
                    <Route index component={StartPage} />
                </div>
            </HashRouter>
        )
    }
}   