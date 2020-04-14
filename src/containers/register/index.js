import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import Logo from '@components/logo'
import { List, InputItem, Radio, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { register } from '@redux/user.redux'
import BindForm from '@components/bind-form'

const RadioItem = Radio.RadioItem;
@connect(
    state => state.user,
	{ register }
)
@BindForm
class Register extends Component {

    constructor(props) {
        super(props)
        this.handleRegister = this.handleRegister.bind(this)
    }

    componentDidMount () {
		this.props.handleChange('type', 'genius')
    }
    
    handleRegister () {
        this.props.register(this.props.state)
    }

    render() {
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
                <Logo/>  
                <List>
                    {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
                    <InputItem 
                        placeholder="请输入用户名"
                        onChange={(value) => this.props.handleChange('user', value)}
                    >用户名</InputItem>
                    <WhiteSpace/>
                    <InputItem 
                        placeholder="请输入密码"
                        type="password"
                        onChange={(value) => this.props.handleChange('pwd', value)}
                    >密码</InputItem>
                    <WhiteSpace/>
                    <InputItem
                        type="password"
                        onChange={(value) => this.props.handleChange('repeatpwd', value)}
                    >确认密码</InputItem>
                    <WhiteSpace/>
                    <RadioItem 
                        checked={this.props.state.type === 'genius'}
                        onChange={() => this.props.handleChange('type', 'genius')}
                    >牛人</RadioItem>
                    <WhiteSpace/>
                    <RadioItem 
                        checked={this.props.state.type === 'boss'} 
                        onChange={() => this.props.handleChange('type', 'boss')}
                    >BOSS</RadioItem>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.handleRegister}>注册</Button>
                </List>
            </div>
        );
    }
}

export default Register;