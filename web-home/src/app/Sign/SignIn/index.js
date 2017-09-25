import React from 'react'
import './index.less'
import { Input, Button, Menu } from 'antd';
import {history} from '../../router';
const navs = [
    {
        key: 'signIn',
        name: '登录'
    },
    {
        key: 'signUp',
        name: '注册'
    }
]
export default class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentNav: 'signUp'
        }
    }
    switchTab(currentNav){
        this.setState({
            currentNav
        })
    }
    render() {

        const { currentNav } = this.state;
        return (
            <div className="signIn">
                <div className="main-body">
                    <div className="header">
                        <h1 className="logo"></h1>
                        <h2 className="sub-title">为您更好的收集信息</h2>
                    </div>
                    <div className="tab-navs">
                        <div className="navs-slider" data-active={currentNav}>
                            {navs.map((nav) => {
                                return (
                                    <a
                                        key={nav.key}
                                        className={"navs-item " + (nav.key == currentNav ? 'active' : '')}
                                        onClick={this.switchTab.bind(this,nav.key)}
                                    >
                                        {nav.name}
                                    </a>
                                )
                            })}
                            <span className="navs-slider-bar"></span>
                        </div>
                    </div>
                    <div className="main">
                        <div className="form-group">
                            <div className="form-item">
                                <Input placeholder="账号" />
                            </div>
                            <div className="form-item">
                                <Input placeholder="密码" />
                            </div>
                            <div className="form-item">
                                <Button type="primary" onClick={()=>{
                                    history.push("/home")
                                }}>登录</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}