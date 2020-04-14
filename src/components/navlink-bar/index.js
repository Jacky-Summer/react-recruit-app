import React, { Component } from 'react';
import { TabBar } from 'antd-mobile'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

@withRouter
@connect(
    state => state.chatuser
)
class NavLinkBar extends Component {
    render() {
        const navList = this.props.data.filter(v => !v.hide)
        const pathname = this.props.location.pathname
        return (
            <div className="navbar-container">
                <TabBar>
                    {navList.map(v => {
                        return (
                            <TabBar.Item
                                badge={v.path === '/msg' ? this.props.unread : null}
                                title={v.text}
                                key={v.path}   
                                icon={{uri: require(`./img/${v.icon}.png`)}}                         
                                selectedIcon={{uri: require(`./img/${v.icon}-active.png`)}}
                                selected={v.path === pathname}
                                onPress={() => {
                                    this.props.history.push(v.path)
                                }}
                            >
                            </TabBar.Item>
                        )
                    })}
                   
                </TabBar>
            </div>
        );
    }
}

NavLinkBar.propsTypes = {
    data: PropTypes.array.isRequired
}

export default NavLinkBar;