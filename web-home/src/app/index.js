import React from 'react'
import { render } from 'react-dom'
import StartPage from './StartPage'
import TabularCreater from './Tabular/creater'
import TabularEditor from './Tabular/editor'
import QuestionCreater from './question/creater'
import Sign from './Sign'
import Home from './Home'
import './index.less'
import {
    Router,
    Route,
    Link
} from 'react-router-dom';
import {history} from './router';
export default class App extends React.Component {
    render() {
        return (
            <Router history={history}>
                <div className="page-wrapper">
                    <Route path="/home" component={Home} />
                    <Route path="/question/creater" component={QuestionCreater} />
                    <Route path="/tabular/editor" component={TabularEditor} />
                    <Route path="/tabular/creater" component={TabularCreater} />
                    <Route path="/signIn" component={Sign} />
                    <Route exact path="/" component={StartPage} />
                </div>
            </Router>

        )
    }
}