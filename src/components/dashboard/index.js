import React, { Component } from 'react';
import Boss from '@components/boss'
import Genius from '@components/genius'
import NavLinkBar from '@components/navlink-bar'
import User from '@components/user'
import { NavBar } from 'antd-mobile'
import { Switch, Route } from 'react-router-dom'
import { getMsgList, sendMsg, recvMsg } from '../../redux/chatuser.redux'
import { connect } from 'react-redux'
import './index.css'

function Msg () {
    return <h2>消息列表页面</h2>
}

@connect(
    state => state,
    { getMsgList, sendMsg, recvMsg }
)
class Dashboard extends Component {

    componentDidMount () {
        if (!this.props.chatuser.chatmsg.length) {
            console.log(555555)
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }
    render() {
        const pathname = this.props.location.pathname
        const user = this.props.user
        const navList = [
            {
                path: '/boss',
				text: '牛人',
				icon: 'boss',
				title: '牛人列表',
				component: Boss,
				hide: user.type === 'genius'
            },
            {
                path: '/genius',
				text: 'BOSS',
				icon: 'job',
				title: 'BOSS列表',
				component: Genius,
				hide: user.type === 'boss'
            },
            {
                path: '/msg',
				text: '消息',
				icon: 'msg',
				title: '消息列表',
				component: Msg
            },
            {
                path: '/me',
				text: '我',
				icon: 'user',
				title: '个人中心',
				component: User
            },
        ]

        return (
            <div>
                <NavBar mode="dark" className="fixd-header">{navList.find(v => v.path === pathname).title}</NavBar>
                <div className="main-list-card">
                    <Switch>
                        {navList.map(v => {
                            return <Route key={v.path} path={v.path} component={v.component}/>
                        })}
                    </Switch>
                </div>
                <NavLinkBar data={navList}/>
            </div>
        );
    }
}

export default Dashboard;