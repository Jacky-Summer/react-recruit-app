import React, { Component } from 'react';
import { Grid, List } from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends Component {

    state = {}
    
    render() {
        const avatarNames = "boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra"
        const avatarList = avatarNames.split(',')
                           .map(name => ({
                               icon: require(`../avatar-img/${name}.png`),
                               text: name
                           }))
        const gridHeader = this.state.text 
                            ? (<div>
                                    <span>已选择头像 </span>
                                    <img style={{width: 20}} src={this.state.icon} alt=""/>
                                </div>)
                            : '请选择头像'
        return (
            <div>
                <List renderHeader={() => gridHeader}>
                    <Grid 
                        data={avatarList} 
                        columnNum={5}
                        onClick={el => {
                            this.setState(el)
                            this.props.selectAvatar(el.text)
                        }}
                    />
                </List>  
            </div>
        );
    }
}

AvatarSelector.propTypes = {
    selectAvatar: PropTypes.func.isRequired
}

export default AvatarSelector;