import React from 'react'
import './index.less'
import { ListView, InputItem, Toast, Modal, Button } from 'antd-mobile';
import TabularApi from '../../../sources/lib/services/tabular'
import { createForm } from 'rc-form';
import {  Control } from 'react-keeper';

export default createForm()(
    class TabularPublish extends React.Component {

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
        async onSubmit() {
            this.props.form.validateFields(async (error, value) => {
                if (error) {
                    for (let key in error) {
                        Toast.info(this.props.form.getFieldError(key)[0])
                        return;
                    }
                }
                try {
                    Toast.loading("提交中...");
                    
                    let params = this.props.form.getFieldsValue();
                    let {id} = this.state.data;
                    let result = await TabularApi.item({ tid:id,data: params })
                    if (!result) {
                        throw new Error("提交失败")
                    }
                    Toast.hide();
                    Control.go('/result/success',{
                        title:'提交成功',
                        mes:"表单已成功提交,谢谢您的参与"
                    })
                } catch (e) {
                    Toast.fail(e.message)
                }
            });
        }
        render() {
            const { data } = this.state;
            const { getFieldProps, getFieldError } = this.props.form;
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
                                            <input {...getFieldProps(item.id, {
                                                initialValue: item.default_value || "",
                                                rules: [{
                                                    required: item.required=='0',
                                                    message: item.field_name + "不能为空"
                                                }]
                                            }) } />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <Button className="submit" type="primary" onClick={this.onSubmit.bind(this)}>提交</Button>
                    </div>
                </div>
            ) : (null)
        }
    }
)