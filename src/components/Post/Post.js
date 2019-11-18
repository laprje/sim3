import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import Nav from '../Nav/Nav'

class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      post: {},
      hidden: true
    }
  }

  componentDidMount = () => {
    axios.get(`/api/post/${this.props.match.params.post_id}`).then(res => {
      this.setState({ post: res.data })
    })
    axios.get('/auth/getsession').then(res => console.log(res))
  }
  editToggle = () => {
    this.setState({ hidden: false })
  }
  handleChange = (target) => {

    this.setState({ post: {...this.state.post, [target.name]: target.value} })
  }

  updatePost = () => {
    axios.put('/api/post', this.state.post)
    .then(() => this.props.history.push('/dashboard'))
  }

  render() {
    const { title, img_url, content, user_id } = this.state.post
    return (
      <div>
          <Nav/>
        <h1>{title}</h1>
        <input
        name='title'
          type='text'
          hidden={this.state.hidden}
          value={title}
          onChange={e => this.handleChange(e.target)}
        />
        <img src={img_url} alt='' />
        <input
        name='img_url'
          type='text'
          hidden={this.state.hidden}
          value={img_url}
          onChange={e => this.handleChange(e.target)}
        />
        <p>{content}</p>
        <input
        name='content'
          type='text'
          hidden={this.state.hidden}
          value={content}
          onChange={e => this.handleChange(e.target)}
        />
        {user_id === this.props.user_id ? (
          <>
            <button hidden={!this.state.hidden} onClick={this.editToggle}>
              Edit
            </button>
            <button hidden={this.state.hidden} onClick={ () => this.updatePost()}>
              Save
            </button>
          </>
        ) : null}
        
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { user_id } = state
  return {
    user_id: user_id
  }
}

export default connect(mapStateToProps)(Post)