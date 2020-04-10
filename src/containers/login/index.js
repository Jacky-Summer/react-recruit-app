import React, { Component } from 'react';
import Logo from '@components/logo'
import { WingBlank, List, InputItem, WhiteSpace, Button } from 'antd-mobile'

class Login extends Component {

    constructor(props) {
        super(props)
        this.register = this.register.bind(this)
    }

    register () {
        this.props.history.push('/register')
    }

    render() {
        return (
            <div>
                <Logo/>
                <h2>我是登录页面</h2>
                <WingBlank>
                    <List>
                        <InputItem placeholder="请输入用户名">用户名</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder="请输入密码">密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button type="primary">登录</Button>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.register}>注册</Button>
                </WingBlank>  
            </div>
        );
    }
}

export default Login;