import React from 'react'
import { history } from '../../router';
import { Button } from '../../common';
export default class SignUp extends React.Component {

    render() {
        return (
            <div className="SignUp">
                <div className="form-group">
                    <div className="form-item">
                        <input placeholder="账号" />
                    </div>
                    <div className="form-item">
                        <input placeholder="密码" />
                    </div>
                    <div className="form-item">
                        <input placeholder="重复密码" />
                    </div>
                    <div className="form-item">
                        <Button
                            type="primary"
                            onClick={() => {
                            }}>注册</Button>
                    </div>
                </div>
            </div>
        )
    }
}