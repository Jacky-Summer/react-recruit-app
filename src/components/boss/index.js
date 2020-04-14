import React, { Component } from 'react';
import UserCard from '@components/user-card'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chat.redux'

@connect(
    state => state.chat,
    { getUserList }
)
class Boss extends Component {
    componentDidMount () {
        this.props.getUserList('genius')
    }
    render() {
        return (
            <UserCard userList={this.props.userList}/>
        );
    }
}

export default Boss;