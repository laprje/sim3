import React, { Component } from 'react'
import Nav from '../Nav/Nav'
import './Post.css'

export default class Post extends Component {
    render() {
        return (
            <div className="post">
                <img src={this.props.postObj.img_url}/>
                <img className="profile" src={this.props.postObj.profile_img}/>
                <h4>{this.props.postObj.email}</h4>
                <h2>{this.props.postObj.title}</h2>
                <h3>{this.props.postObj.content}</h3>
            </div>
        )
    }
}