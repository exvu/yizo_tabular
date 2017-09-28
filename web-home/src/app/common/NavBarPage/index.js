import React from 'react'
import './index.less'
import { NavBar, List, InputItem } from 'antd-mobile';
import { Link } from 'react-router-dom';
import { history } from '../../router'
export default class TabularEditor extends React.Component {

    title = "编辑表单";
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="navbar-page">
                <NavBar
                    onLeftClick={() => {
                        history.goBack();
                    }}
                    {...this.props}
                    mode="dark"
                >编辑表单</NavBar>
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        )
    }
}