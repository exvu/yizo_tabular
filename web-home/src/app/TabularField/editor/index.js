import React from 'react'
import './index.less'
import { List, InputItem } from 'antd-mobile';
import { Link } from 'react-keeper';
import NavBarPage from '../../common/NavBarPage';
import { Icon } from '../../common';
import QuestTypeList from '../../questionType/list';
let data = [
    {
        id: 1,
        name: "姓名",
        type: 'input'
    },
    {
        id: 2,
        name: "年龄",
        type: 'inputNumber'
    },
    {
        id: 3,
        name: "性别",
        type: 'radio'
    },
    {
        id: 4,
        name: "家庭住址",
        type: 'input'
    },
    {
        id: 5,
        name: "出生日期",
        type: 'datetime'
    },
]
export default class TabularFieldEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentItem: null,
            data: data,
            typeListShow: false
        }
    }
    delQuest() {
        const { currentItem } = this.state;
        data.splice(currentItem, 1);
        this.setState({
            data,
            currentItem: null
        })
    }
    shiftQuest(type) {
        const { currentItem } = this.state;
        let index = type == "down" ? (currentItem + 1) : (currentItem - 1);
        if (currentItem >= 0 && currentItem < data.length && index >= 0 && index < data.length) {
            let d = data[index];
            data[index] = data[currentItem];
            data[currentItem] = d;
            this.setState({
                data,
                currentItem: index
            })
        }
    }
    render() {
        const { currentItem, data, typeListShow } = this.state;
        return (
            <NavBarPage rightContent={<div>提交</div>}>
                <div className="tabular-editor">
                    <div className="tabular-mes">
                        <div className="title">表单1</div>
                        <div className="desc">啊三大发射点发生克林顿和法律上看到合肥卢卡斯的恢复i卡死还是大开发建设的快乐复活节阿斯科利的积分阿里斯顿</div>
                    </div>
                    <div className="quest-list">
                        {data.map((item, index) => {
                            return (
                                <div className="quest-item" key={index+""}>
                                    <div className="mes" onClick={() => {
                                        this.setState({
                                            currentItem: currentItem == index ? null : index
                                        })
                                    }} >
                                        <div className="left">
                                            <span className="number">{index + 1}.</span>
                                            <span className="name">{item.name}</span>
                                        </div>
                                        <Icon type="expand" color="#999999" />
                                    </div>
                                    {currentItem == index && (
                                        <div className="tool-bar">
                                            <div className="tool-item">
                                                <Icon type="editor-circle-o" />
                                                <span>编辑</span>
                                            </div>
                                            <div
                                                className={"tool-item " + (currentItem > 0 ? "" : 'disabled')}
                                                onClick={this.shiftQuest.bind(this, 'up')}>
                                                <Icon type="shift-up-o" />
                                                <span>上移</span>
                                            </div>
                                            <div
                                                className={"tool-item " + (currentItem < data.length - 1 ? "" : 'disabled')}
                                                onClick={this.shiftQuest.bind(this, 'down')}>
                                                <Icon type="shift-down-o" />
                                                <span>下移</span>
                                            </div>
                                            <div className="tool-item" onClick={this.delQuest.bind(this)}>
                                                <Icon type="del-circle-o" />
                                                <span>删除</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                    <div className="add-question" onClick={() => this.setState({ typeListShow: !typeListShow })}>
                        <Icon type="add-circle-o" color="#108ee9" />
                        <span>添加选项</span>
                    </div>
                </div>
                {typeListShow && <QuestTypeList onClose={() => this.setState({ typeListShow: false })}/> }
            </NavBarPage>
        )
    }
}