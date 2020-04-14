import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import Logo from '@components/logo'
import { WingBlank, List, InputItem, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { login } from '@redux/user.redux'
import BindForm from '@components/bind-form'

@connect(
    state => state.user,
    { login }
)
@BindForm
class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
			user: '',
            pwd: ''
		}
        this.handleLogin = this.handleLogin.bind(this)
        this.register = this.register.bind(this)
    }

    handleLogin () {
        this.props.login(this.props.state)
    }

    register () {
        this.props.history.push('/register')
    }

    render() {
        return (
            <div>
                {this.props.redirectTo && this.props.redirectTo !== '/login' ? <Redirect to={this.props.redirectTo}/> : null}
                <Logo/>
                <WingBlank>
                    <List>
                        {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
                        <InputItem 
                            placeholder="请输入用户名"
                            onChange={(value) => this.props.handleChange('user', value)}
                        >用户名</InputItem>
                        <WhiteSpace/>
                        <InputItem 
                            placeholder="请输入密码"
                            onChange={(value) => this.props.handleChange('pwd', value)}
                        >密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.handleLogin}>登录</Button>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.register}>注册</Button>
                </WingBlank>  
            </div>
        );
    }
}

export default Login;