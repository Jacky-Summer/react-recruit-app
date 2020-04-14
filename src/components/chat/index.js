import React, { Component } from 'react';
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg } from '../../redux/chatuser.redux'
import { getChatid } from '../../util'
// import io from 'socket.io-client'
// const socket = io('ws://localhost:9093')
const Item = List.Item;

@connect(
    state => state,
    { getMsgList, sendMsg, recvMsg }
)
class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            msg: [],
            showEmoji: false
        }
    }

    componentDidMount () {
        if (!this.props.chatuser.chatmsg.length) {
            console.log(555555)
            this.props.getMsgList()
            this.props.recvMsg()
        }
        // 修复antd-mobile的Grid组件，第一次点击没有全部展开的bug
        setTimeout(function() {
            window.dispatchEvent(new Event('resize'))
        }, 0)
    }

    fixCarousel () {
        // 修复antd-mobile的Grid组件，第一次点击没有全部展开的bug
        setTimeout(function() {
            window.dispatchEvent(new Event('resize'))
        }, 0)
    }

    handleSubmit () {
        // socket.emit('sendmsg', { text: this.state.text })
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        this.setState({
            text: ''
        })
        this.props.sendMsg({ from, to, msg })
    }

    render() {
        const emoji = '😀 😃 😄 😁 😆 😅 🤣 😂 🙂 🙃 😉 😊 😇 🥰 😍 🤩 😘 😗 😚 😙 😋 😛 😜 🤪 😝 🤑 🤗 🤭 🤫 🤔 🤐 🤨 😐 😑 😶 😏 😒 🙄 😬 🤥 😌 😔 😪 🤤 😴 😷 🤒 🤕 🤢 🤮 🤧 🥵 🥶 🥴 😵'
                      .split(' ')
                      .filter(v => v)
                      .map(v => ({ text: v }))
        const userId = this.props.match.params.user
        const chatid = getChatid(userId, this.props.user._id)
        const chatuser = this.props.chatuser
        const users = this.props.chatuser.users
        const chatmsg = chatuser.chatmsg.filter(v => v.chatid === chatid)
        if (!users[userId]) {
            return null
        }
        return (
            <div className="chat-page">
                <NavBar 
                    mode='dark'
                    icon={<Icon type="left" />}
                    onLeftClick={() => {
                        this.props.history.goBack()
                    }}
                >
                    {users[userId].name}
                </NavBar>
                {
                    chatmsg.map(v => {
                        const avatar = require(`../avatar-img/${users[v.from].avatar}.png`)
                        return v.from === userId ? (
                            <List key={v._id}>
                                <Item thumb={avatar}>{v.content}</Item>
                            </List>
                        ) : (
                            <List key={v._id}>
                                <Item 
                                    className="chat-me"
                                    extra={<img src={avatar}/>}
                                >{v.content}</Item>
                            </List>
                        )
                    })
                }
                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder="请输入"
                            value={this.state.text}
                            onChange={v => {
                                this.setState({
                                    text: v
                                })
                            }}
                            extra={<div>
                                <span 
                                    style={{ marginRight: 15 }}
                                    onClick={() => {
                                        this.setState({
                                            showEmoji: !this.state.showEmoji
                                        })
                                        this.fixCarousel()
                                    }}
                                >😃</span>
                                <span onClick={() => this.handleSubmit()}>发送</span>
                            </div>}
                        >信息</InputItem>
                    </List>
                    {this.state.showEmoji 
                    ? 
                        <Grid 
                            className="emoji-container"
                            data={emoji} 
                            isCarousel 
                            columnNum={9}
                            carouselMaxRow={4}
                            onClick={ el => {
                                this.setState({
                                    text: this.state.text + el.text
                                })
                            }} 
                        /> 
                    : null}
                </div>
            </div>
        );
    }
}

export default Chat;