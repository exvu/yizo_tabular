import React from 'react'
import './index.less'
import {  List, InputItem } from 'antd-mobile';
import { Link } from 'react-router-dom';
import { history } from '../../router'
import NavBarPage from '../../common/NavBarPage';
export default class TabularCreater extends React.Component {

    render() {
        return (
            <NavBarPage>
                <List renderHeader={() => '创建表单'}>
                    <InputItem
                        clear
                        placeholder="标题"
                        autoFocus
                    >标题</InputItem>
                    <InputItem
                        clear
                        placeholder="欢迎词"
                    >欢迎词</InputItem>
                    <List.Item>
                        <div
                            style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}
                            onClick={() => {
                                history.push("/tabular/editor")
                            }}
                        >
                            创建
                            </div>
                    </List.Item>
                </List>
            </NavBarPage>
        )
    }
}