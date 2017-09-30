import React from 'react'
import './index.less'
import { NavBar, List, InputItem } from 'antd-mobile';
import {Icon} from '../../common';
/**
 *  -2 管理员取消
 * -1 创建人取消
 * 0 未发布  创建
 * 1 进行中
 * 2 完成
 * 
 */
const data = [
    {
        id: 1,
        title: '表单1',
        desc: '表单欢迎语1',
        _c: "2017-09-27 21:16:29",
        status: -2,
        total: 0
    },
    {
        id: 2,
        title: '表单2',
        desc: '表单欢迎语2',
        _c: "2017-09-27 21:17:15",
        status: -1,
        total: 10
    },
    {
        id: 3,
        title: '表单3',
        desc: '表单欢迎语3',
        _c: "2017-09-27 21:17:37",
        status: 0,
        total: 9
    },
    {
        id: 4,
        title: '表单4',
        desc: '表单欢迎语4',
        _c: "2017-09-27 21:17:54",
        status: 1,
        total: 6
    },
    {
        id: 5,
        title: '表单5',
        desc: '表单欢迎语5',
        _c: "2017-09-27 21:18:18",
        status: 2,
        total: 4
    },
    {
        id: 6,
        title: '表单6',
        desc: '表单欢迎语6',
        _c: "2017-09-27 21:16:29",
        status: -2,
        total: 0
    },
    {
        id: 7,
        title: '表单7',
        desc: '表单欢迎语7',
        _c: "2017-09-27 21:17:15",
        status: -1,
        total: 10
    },
    {
        id: 8,
        title: '表单8',
        desc: '表单欢迎语8',
        _c: "2017-09-27 21:17:37",
        status: 0,
        total: 9
    },
    {
        id: 9,
        title: '表单9',
        desc: '表单欢迎语9',
        _c: "2017-09-27 21:17:54",
        status: 1,
        total: 6
    },
    {
        id: 10,
        title: '表单10',
        desc: '表单欢迎语10',
        _c: "2017-09-27 21:18:18",
        status: 2,
        total: 4
    },
]
export default class TabularList extends React.Component {

    render() {

        return (
            <div className="list">
                {data.map((item) => {
                    return <ListItem data={item} key={item.id} />
                })}
            </div>
        )
    }
}


class ListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showToolBar: false
        }
    }
    render() {
        const { data } = this.props;
        const { showToolBar } = this.state;
        return (
            <div className="item">
                <div className="content" onClick={() => {
                    this.setState({
                        showToolBar: !showToolBar
                    })
                }}>
                    <div className="title">
                        {data.title}
                        <div className="time">{data._c}</div>
                    </div>

                    <div className="desc">{data.desc}</div>
                    {(() => {
                        switch (data.status) {
                            case -1:
                            case -2: {
                                return <div className="status" style={{ backgroundColor: "#f00" }}>已取消</div>;
                            }
                            case 0: {
                                return <div className="status" style={{ backgroundColor: "#ffa60b" }}>未发布</div>;
                            }
                            case 1: {
                                return <div className="status" style={{ backgroundColor: "#68bb47" }}>收集中</div>;
                            }
                            case 2: {
                                return <div className="status">已完成</div>;
                            }
                        }
                    })()}
                    <div className="bottom">
                        <div className="item">
                            数量:{data.total}份
                        </div>
                    </div>
                </div>

                {showToolBar && (
                    <div className="tool-bar">
                        <div className="tool-item">
                            <Icon type="start-circle-o" />
                            <p>发布</p>
                        </div>
                        <div className="tool-item">
                            <Icon type="editor-circle-o" />
                            <p>编辑</p>
                        </div>
                        <div className="tool-item">
                            <Icon type="data-circle-o" />
                            <p>数据</p>
                        </div>
                        <div className="tool-item">
                            <Icon type="share-circle-o" />
                            <p>分享</p>
                        </div>
                        <div className="tool-item">
                            <Icon type="del-circle-o" />
                            <p>删除</p>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}