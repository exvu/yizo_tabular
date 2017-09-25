import React from 'react'
import { Row, Col } from 'antd';
import { render } from 'react-dom'
import StartPage from './StartPage'
import SignIn from './Sign/SignIn'
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
                    <Route path="/signIn" component={SignIn} />
                    <Route exact path="/" component={StartPage} />
                </div>
            </Router>

        )
    }
}