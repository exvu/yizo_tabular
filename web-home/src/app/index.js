import React from 'react'
import { render } from 'react-dom'
import StartPage from './StartPage'
import TabularEditor from './Tabular/editor'
import TabularFieldList from './TabularField/list'
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
                    <PrivateRoute cache path="/home" component={Home} />
                    <PrivateRoute cache path="/question/create" component={QuestionCreater} />
                    <PrivateRoute path="/tabular/editor" component={TabularEditor} />
                    <PrivateRoute cache path="/tabular/field/list" component={TabularFieldList} />
                    <Route path="/signIn" component={Sign} />
                    <Route index component={StartPage} />
                </div>
            </HashRouter>
        )
    }
}   