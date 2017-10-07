import React from 'react'
import './index.less'
import {Button} from 'antd-mobile';
import TabularApi from '../../../sources/lib/services/tabular'
import NavBarPage from '../../common/NavBarPage';

import { Toast } from 'antd-mobile';

export default class TabularData extends React.Component {

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
            let { tid } = this.props.params;
            Toast.loading("获取数据中...");
            let { fields, data } = await TabularApi.data({ tid });
            let showFields ={};
            for(let i=0;i<fields.length;i++){
                showFields[fields[i]['id']] = fields[i]['field_name'];
            }
            this.setState({
                showFields,
                fields, data
            })
            if (data.length == 0) {
                Toast.info("没有数据")
            } else {
                Toast.hide();
            }

        } catch (e) {
            console.log(e);
            Toast.fail("获取数据失败");
        }
    }
    render() {

        const { fields, data,showFields={}} = this.state;

        console.log(showFields)
        return (
            <NavBarPage title="数据">
                <div className="top">
                    <button >显示字段</button>
                </div>
                {fields && data && (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                {Object.keys(showFields).map((key) => {
                                    return (
                                        <th key={key}>{showFields[key]}</th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        {Object.keys(showFields).map((key) => {
                                            return (
                                                <td key={key}>{item[key]}</td>
                                            )
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                )}

            </NavBarPage>
        )
    }
}