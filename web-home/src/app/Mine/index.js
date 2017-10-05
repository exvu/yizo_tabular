import React from 'react'
import { List ,Toast} from 'antd-mobile'
import { Control} from 'react-keeper'
import './index.less';
import cache from '../../sources/lib/cache';
export default class Mine extends React.Component {


    constructor(props) {
        super(props)
    }
    render() {

        return (
            <div className="mine">
                <div className="info">
                    <div>18311540605</div>
                    <div>欢迎你</div>
                </div>
                <List >
                    <List.Item arrow="horizontal">
                        修改密码
                    </List.Item>
                    <List.Item arrow="horizontal" onClick={()=>{
                        cache.local.removeItem("access-token");
                        Control.go("/signIn");
                    }}>
                        退出
                    </List.Item>
                </List>
            </div>
        )
    }
}