import React from 'react'
import './index.less'
import { NavBar, ListView, InputItem, Toast,RefreshControl } from 'antd-mobile';
import { Icon } from '../../common';
import TabularApi from '../../../sources/lib/services/tabular'
import {Link} from 'react-keeper';
/**
 *  -2 管理员取消
 * -1 创建人取消
 * 0 未发布  创建
 * 1 进行中
 * 2 完成
 * RefreshControl
 */
export default class TabularList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showToolBarIndex: null,
            data: []
        }
    }
    async componentWillMount() {
        await this.loadData();
    }
    getIndexById(id){
        const {data} = this.state;
        for(let key in data){
            if(data[key]['id']==id){
                return key;
            }
        }
    }
    async update(args) {
        let {data} = this.state;
        try {
            Toast.loading("修改中...");
            let result = await TabularApi.update(args);
            if(!result){
                throw new Error("修改失败");
            }
            let index = this.getIndexById(args['id']);
            data[index] = {...data[index],...args}
            this.setState({
                data
            })
            Toast.success("修改成功");
        } catch (e) {
            console.log(e);
            Toast.fail(e.message);
        }
    }
    async loadData() {
        try {
            Toast.loading("获取数据中...");
            let { list: data } = await TabularApi.list();
            this.setState({
                data
            })
            Toast.hide();
        } catch (e) {
            console.log(e);
            Toast.fail("获取数据失败");
        }
    }
    render() {
        const { showToolBarIndex, data } = this.state;
        return (
            <div className="list" >
                {data.map((item, index) => {
                    return (
                        <div className="item" key={index}>
                            <div className="content" onClick={() => {
                                this.setState({
                                    showToolBarIndex: showToolBarIndex == index ? null : index
                                })
                            }}>
                                <div className="title">
                                    {item.title}
                                    <div className="time">{item.start_time}</div>
                                </div>

                                <div className="desc">{item.explanation}</div>
                                {(() => {
                                    switch (item.status) {
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
                                        数量:{item.total || 0}份
                        </div>
                                </div>
                            </div>

                            {showToolBarIndex == index && (
                                <div className="tool-bar" >
                                    {item.status == 0 ? (
                                        <a className="tool-item" onClick={() => { this.update({ status: 1 ,id:item.id}) }}>
                                            <Icon type="start-circle-o" />
                                            <p>发布</p>
                                        </a>
                                    ) : (
                                        <a className="tool-item" onClick={() => { this.update({ status: 0,id:item.id }) }}>
                                            <Icon type="start-circle-o" />
                                            <p>暂停</p>
                                        </a>
                                    )}
                                    <Link className="tool-item" to={`/tabular/field/list/${item.id}`}>
                                        <Icon type="editor-circle-o" />
                                        <p>编辑</p>
                                    </Link>
                                    <a className="tool-item">
                                        <Icon type="data-circle-o" />
                                        <p>数据</p>
                                    </a>
                                    <a className="tool-item">
                                        <Icon type="share-circle-o" />
                                        <p>分享</p>
                                    </a>
                                    <a className="tool-item">
                                        <Icon type="del-circle-o" />
                                        <p>删除</p>
                                    </a>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        )
    }
}