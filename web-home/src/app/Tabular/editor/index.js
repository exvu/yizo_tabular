import React from 'react'
import './index.less'
import { List, InputItem, Toast, DatePicker } from 'antd-mobile';
import { Link, Control } from 'react-keeper';
import NavBarPage from '../../common/NavBarPage';
import { createForm } from 'rc-form';
import TabularApi from '../../../sources/lib/services/tabular';
export default createForm()(
    class TabularEditor extends React.Component {
        constructor(props) {
            super(props);
            let { type, ...data } = Control.state;
            data['end_time'] = new Date(data['end_time'])
            this.state = {
                type, data
            }
        }
        async submit() {
            const { type, data } = this.state;
            Toast.loading(type == 'create' ? "创建中" : "修改中")
            this.props.form.validateFields(async (error, value) => {

                if (error) {
                    for (let key in error) {
                        Toast.info(this.props.form.getFieldError(key)[0])
                        return;
                    }
                }
                try {

                    switch (type) {
                        case "create": {
                            Toast.loading("创建中...")
                            let result = await TabularApi.add(this.props.form.getFieldsValue());
                            if (!result) {
                                throw new Error("创建失败")
                            }
                            Control.go("/tabular/field/editor", { id: result })
                            break;
                        }
                        case "editor": {
                            Toast.loading("修改中...")
                            let result = await TabularApi.update({ id: data.id, ...this.props.form.getFieldsValue() });
                            if (!result) {
                                throw new Error("修改失败")
                            }
                            Toast.success("修改成功");
                            setTimeout(() => {
                                Control.go(-1)
                            }, 1000);
                            break;
                        }
                    }
                } catch (e) {
                    Toast.fail(e.message)
                }
            });
        }
        onOk = (date) => {
            console.log('onOk', date);
          }
        render() {
            const { getFieldProps, getFieldError } = this.props.form;
            const { type, data } = this.state;
            console.log(data)
            return (
                <NavBarPage >
                    <List renderHeader={() => type == 'create' ? '创建表单' : '修改表单'}>
                        <InputItem
                            clear
                            placeholder="标题"
                            {...getFieldProps('title', {
                                initialValue: data.title || "",
                                rules: [{
                                    required: true,
                                    message: "标题不能为空"
                                }]
                            }) }
                            autoFocus
                        >标题</InputItem>
                        <InputItem
                            clear
                            placeholder="欢迎词"
                            {...getFieldProps('explanation', {
                                initialValue: data.explanation || "",
                                rules: [{
                                    required: true,
                                    message: "欢迎词不能为空"
                                }]
                            }) }
                        >欢迎词</InputItem>
                        {/* <DatePicker mode="datetime"
                        onOk={()=>{

                        }}
                            {...getFieldProps('end_time', {
                            initialValue: data.end_time,
                            rules: [
                              { required: true, message: '请选择截止时间' },
                            ],
                          })}
                        >
                            <List.Item arrow="horizontal">截止时间</List.Item>
                        </DatePicker> */}
                        <List.Item>
                            <div
                                style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}
                                onClick={this.submit.bind(this)}
                            >
                                {type == 'create' ? "创建" : "修改"}
                            </div>
                        </List.Item>
                    </List>
                </NavBarPage>
            )
        }
    }
)