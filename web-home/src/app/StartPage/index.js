import React from 'react'
import { Row, Col } from 'antd';
import { render } from 'react-dom'
import './index.less'
import {
    Link
} from 'react-router-dom'
export default class StartPage extends React.Component{

    render(){
        return (
            <div className="index">
                <header className="header">
                    <div className="title">易表信息</div>
                </header>
                <div className="home-main">
                    <div className="content">
                        <h3>yizo易表 1.0</h3>
                        <p>为您更好的收集信息</p>
                    </div>
                    <div className="start-btn">
                        <Link to="/signIn">开始使用</Link>
                    </div>
                </div>
                <footer className="footer">
                    <div className="Copyright">
                        <h2>Copyright © 2017</h2>
                        <div>
                            <span>遵义师范学院软件创新实验室yizo团队</span>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}