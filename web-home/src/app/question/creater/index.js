import React from 'react'
import './index.less'
import { List, InputItem, Switch, TextareaItem } from 'antd-mobile';
import { createForm } from 'rc-form';
import { Link } from 'react-keeper';
import NavBarPage from '../../common/NavBarPage';
import { Icon, Button } from '../../common';
class QuestionCreater extends React.Component {

    render() {

        const { getFieldProps } = this.props.form;
        return (
            <NavBarPage>
                <List>
                    <InputItem placeholder="标题">标题</InputItem>
                    <TextareaItem placeholder="说明" rows="3"></TextareaItem >
                    <List.Item
                        extra={<Switch
                            {...getFieldProps('Switch1', {
                                initialValue: true,
                                valuePropName: 'checked',
                            }) }
                            onClick={(checked) => { console.log(checked); }}
                        />}
                    >此题可跳过不答</List.Item>
                    <div className="submit">
                        <Button>确定</Button>
                    </div>
                </List>
            </NavBarPage>
        )
    }
}
export default createForm()(QuestionCreater)