import React from 'react'
import './index.less'
import { List, InputItem, Toast, Modal, Switch } from 'antd-mobile';
import NavBarPage from '../../common/NavBarPage';
import TabularApi from '../../../sources/lib/services/tabular'
import { createForm } from 'rc-form';
export default createForm()(
    class TabularFieldEditor extends React.Component {


        constructor(props) {
            super(props);
            this.state = {
            }

        }
        render() {
            const { getFieldProps } = this.props.form;
            return (
                <NavBarPage title={'id' in this.props.params ? "编辑字段" : "添加字段"}>
                    <List renderHeader={() => 'id' in this.props.params ? "编辑字段" : "添加字段"}>
                        <InputItem
                            {...getFieldProps('name') }
                            clear
                            placeholder="字段名"
                        >字段名</InputItem>
                        <InputItem
                            {...getFieldProps('explanation') }
                            clear
                            placeholder="字段描述"

                        >字段描述</InputItem>
                        <InputItem
                            {...getFieldProps('default') }
                            clear
                            placeholder="默认值"

                        >默认值</InputItem>
                        <List.Item
                            extra={<Switch
                                {...getFieldProps('require', {
                                    initialValue: true,
                                    valuePropName: 'checked',
                                }) }
                                onClick={(checked) => { console.log(checked); }}
                            />}
                        >是否必填</List.Item>
                        <List.Item>
                            <div
                                style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}
                                onClick={this.handleClick}
                            >
                                添加
                          </div>
                        </List.Item>
                    </List>
                </NavBarPage>
            )
        }
    }
)