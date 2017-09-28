import React from 'react'
import './index.less'
import { List, InputItem } from 'antd-mobile';
import { Link } from 'react-router-dom';
import NavBarPage from '../../common/NavBarPage';
export default class TabularEditor extends React.Component {

    render() {
        return (
            <NavBarPage rightContent={<div>提交</div>}>
                <div className="question-list">
                </div>
                <div className="add-question">
                    添加选项
                </div>
                <div className="quest-type-list">
                    <div>填空 </div>
                    <div>1</div>
                    <div>1</div>
                    <div>1</div>
                    <div>1</div>
                </div>
            </NavBarPage>
        )
    }
}