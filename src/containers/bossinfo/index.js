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

class BossInfo extends Component {

    constructor(props) {
		super(props)
		this.state = {
			title: '',
			desc: '',
			company: '',
			salary: ''
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
                <NavBar mode="dark">BOSS完善信息页</NavBar>
                <AvatarSelector 
                    selectAvatar={(imgName) => this.selectAvatar(imgName)}
                />
                <List renderHeader={() => '职位信息'}>
                    <InputItem
                        onChange={(v) => this.handleChange('title', v)}
                    >招聘职位</InputItem>
                    <InputItem
                        onChange={(v) => this.handleChange('company', v)}
                    >公司名称</InputItem>
                    <InputItem
                        onChange={(v) => this.handleChange('money', v)}
                    >职位薪资</InputItem>
                     <TextareaItem
                        title="职位要求"
                        rows={3}
                        autoHeight
                        onChange={(v) => this.handleChange('desc', v)}
                    />
                </List>
                <Button 
                    type="primary"
                    onClick={() => {
                        console.log(this.state)
                        this.props.update(this.state)
                    }}
                >保存</Button>
            </div>
        );
    }
}

export default BossInfo;