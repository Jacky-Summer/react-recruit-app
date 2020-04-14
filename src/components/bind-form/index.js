import React, { Component } from 'react';

// HOC
export default function bindForm (Comp) {
    class WrapperComponent extends Component {

        constructor(props) {
            super(props)
            this.state = {}
            this.handleChange = this.handleChange.bind(this)
        }

        handleChange (key, value) {
            this.setState({
                [key]: value
            })
        }    

        render () {
            return (
                <Comp handleChange={this.handleChange} state={this.state} {...this.props}/>
            )
        }
    }
    return WrapperComponent
}