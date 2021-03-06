import React, { Component } from 'react';
import { Result, List, WhiteSpace, Modal } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import browserCookie from 'browser-cookies' 
import { logoutSubmit } from '../../redux/user.redux'

@connect(
    state => state.user,
    { logoutSubmit }
)
class User extends Component {

    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }

    logout () {
        const alert = Modal.alert
        alert('注销', '你确认退出登录吗？', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确认', onPress: () => {
                browserCookie.erase('userId')
                this.props.logoutSubmit()
            }},
        ])
    }

    render() {
        const props = this.props
        const Item = List.Item
        const Brief = Item.Brief
        return props.user ?(
            <div>
                <Result
                    img={<img src={require(`../avatar-img/${props.avatar}.png`)} alt="avatar" style={{ width: 50 }}/>}
                    title={props.user}
                    message={props.type === 'boss' ? <div>{props.company}</div> : null}
                />
                <List renderHeader={() => '简介'}>
                    <Item multipleLine>
                        {props.title}
                        {props.desc.split('\n').map(v => {
                            return <div key={v}><Brief>{v}</Brief></div>
                        })}
                        {props.type === 'boss' ? <Brief>薪资：{props.money}</Brief> : null}
                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <Item onClick={this.logout} style={{ zIndex: 10 }}>退出登录</Item>
                </List>
            </div>
        ) : <Redirect to={this.props.redirectTo}/>
    }
}

export default User;