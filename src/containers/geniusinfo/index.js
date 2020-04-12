import React, { Component } from 'react';
import AvatarSelector from '@components/avatar-selector'
import { NavBar, List, InputItem, TextareaItem, Button } from 'antd-mobile'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { update } from '@redux/user.redux'

@connect(
    state => state.user,
    { update }
)

class GeniusInfo extends Component {

    constructor(props) {
		super(props)
		this.state = {
			title: '',
			desc: ''
		}
	}

    selectAvatar (imgName) {
        this.setState({
            avatar: imgName
        })
    }

    handleChange (key, value) {
        this.setState({
            [key]: value
        })
    }

    render() {
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
                <NavBar mode="dark">牛人完善信息页</NavBar>
                <AvatarSelector 
                    selectAvatar={(imgName) => this.selectAvatar(imgName)}
                />
                <List renderHeader={() => '求职信息'}>
                    <InputItem
                        onChange={(v) => this.handleChange('title', v)}
                    >求职岗位</InputItem>
                    <TextareaItem
                        title="个人简介"
                        rows={3}
                        autoHeight
                        onChange={(v) => this.handleChange('desc', v)}
                    />
                </List>
                <Button 
                    type="primary"
                    onClick={() => {
                        this.props.update(this.state)
                    }}
                >保存</Button>
            </div>
        );
    }
}

export default GeniusInfo;