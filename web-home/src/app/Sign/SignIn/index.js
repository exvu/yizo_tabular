import React from 'react'
import { history } from '../../router';
import { Button } from '../../common';
export default class SignIn extends React.Component {

    render() {
        return (
            <div className="signIn">
                <div className="form-group">
                    <div className="form-item">
                        <input placeholder="账号" />
                    </div>
                    <div className="form-item">
                        <input placeholder="密码" />
                    </div>
                    <div className="form-item">
                        <Button
                            type="primary"
                            onClick={() => {
                                history.push("/home")
                            }}>登录</Button>
                    </div>
                </div>
            </div>
        )
    }
}