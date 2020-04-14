import React, { Component } from 'react';
import { WhiteSpace, WingBlank, Card } from 'antd-mobile'
import { withRouter } from 'react-router-dom' 

@withRouter
class UserCard extends Component {

    handleClick (v) {
        this.props.history.push(`/chat/${v._id}`)
    }

    render() {
        return (
            <div>
                <WhiteSpace/>
                <WingBlank size="lg">
                    <WhiteSpace size="lg" />
                    {
                        this.props.userList.map(v => {
                            return (
                                v.avatar 
                                ?  <div key={v._id} className="user-card">
                                        <Card onClick={() => this.handleClick(v)}>
                                            <Card.Header
                                                title={v.user}
                                                thumb={require(`../avatar-img/${v.avatar}.png`)}
                                                extra={<span>{v.title}</span>}
                                            />
                                            <Card.Body>
                                                {v.type === 'boss' ? <div>公司：{v.company}</div> : null}
                                                {v.desc.split('\n').map(d => <div key={d}>{d}</div>)}
                                                {v.type === 'boss' ? <div><br/>薪资：{v.money}</div> : null}
                                            </Card.Body>
                                        </Card>
                                    <WhiteSpace/>
                                    </div>
                                : null
                            )
                        })
                    }
                    <WhiteSpace size="lg" />
                </WingBlank>
            </div>
        );
    }
}

export default UserCard;