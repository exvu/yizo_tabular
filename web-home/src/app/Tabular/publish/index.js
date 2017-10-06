import React from 'react'
import './index.less'
import { ListView, InputItem, Toast, Modal,Button } from 'antd-mobile';
import TabularApi from '../../../sources/lib/services/tabular'
export default class TabularPublish extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentWillMount() {
        await this.loadData();
    }
    async loadData() {
        try {
            Toast.loading("获取数据中...");
            let data = await TabularApi.info({ id: this.props.params.id });
            if (!data) {
                Toast.info("没有数据")
                return;
            }
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
        const { data } = this.state;
        console.log(data)
        return data ? (
            <div className="publish" >
                <header className="header">
                    <div className="left"></div>
                    <div className="title">{data.title}</div>
                    <div className="right" onClick={() => {
                    }}>
                    </div>
                </header>
                <div className="content">
                    <div className="explanation">
                        {data.explanation}
                    </div>
                    <div className="items">
                        {data.fields.map((item) => {
                            return (
                                <div className="item">
                                    <div className="field-name">
                                        {item.field_name}
                                    </div>
                                    <div className="field-value">
                                        <input />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <Button  className="submit" type="primary">提交</Button>
                </div>
            </div>
        ) : (null)
    }
}