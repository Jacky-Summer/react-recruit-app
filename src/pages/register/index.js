import React, { Component } from 'react';
import Logo from '@components/logo'
import { List, InputItem, Radio, WhiteSpace, Button } from 'antd-mobile'

const RadioItem = Radio.RadioItem;

class Register extends Component {

    constructor(props) {
        super(props)
        this.state = {
            type: 'genius'
        }
    }

    render() {
        return (
            <div>
                <Logo/>  
                <h2>我是注册页面</h2>
                <List>
                    <InputItem placeholder="请输入用户名">用户名</InputItem>
                    <WhiteSpace/>
                    <InputItem placeholder="请输入密码">密码</InputItem>
                    <WhiteSpace/>
                    <InputItem>确认密码</InputItem>
                    <WhiteSpace/>
                    <RadioItem checked={this.state.type === 'genius'}>
                        牛人
                    </RadioItem>
                    <RadioItem checked={this.state.type === 'boss'}>
                        BOSS
                    </RadioItem>
                    <WhiteSpace/>
                    <Button type="primary">注册</Button>
                </List>
            </div>
        );
    }
}

export default Register;