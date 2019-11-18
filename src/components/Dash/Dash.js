import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import './Dash.css'
import { Link } from 'react-router-dom'
import Nav from '../Nav/Nav'

class Dash extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      filteredPosts: [],
      search: '',
      usersPosts: true
    }
  }

  componentDidMount = () => {
    axios.get('/api/posts').then(res => {
      this.setState({ posts: res.data })
    })
    // axios.get('/auth/getSession').then()
    // axios.get(`/api/posts/${this.props.user_id}`)
    // .then(res => this.setState({ filteredPosts: res.data }))
  }
  showUserPosts = () => {
    this.setState({ usersPosts: !this.state.usersPosts})
  }

  clearSearch = () => {
    this.setState({
      search: ''
    })
  }
  filter = () => {
    let allPosts = []
    let nonUserPosts = []
    console.log(new Boolean(this.state.search))
    if (this.state.search) {
      console.log('running search')
      allPosts = this.state.posts.filter(post =>
        post.title.includes(this.state.search)
      ) 
      nonUserPosts = this.state.posts.filter(post =>
        post.title.includes(this.state.search)
      )
    }
    if (this.state.usersPosts === true) {
      return !this.state.search ? this.state.filteredPosts : allPosts
    } else if (this.state.usersPosts === false) {
      return !this.state.search ? this.state.posts : nonUserPosts
    }
  }
  handleChange = (target) => {
    this.setState({ [target.name]: target.value })
  }
  deletePost = () => {}

  render() {
    return (
      <div>
        <Nav/>
          <div className='search-cont'>
            <input name='search' onChange={e => this.handleChange(e.target)} value={this.state.search} placeholder='Search by Title' />
            <button className='search'>Search</button>
            <button className='reset' onClick={this.clearSearch}>
              Reset
            </button>
          </div>
          <div className='my-posts'>
            <div>My Posts</div>
            <input
              type='checkbox'
              onChange={() => this.showUserPosts()}
            />
          </div>
        <div className='outer-post'>
          {this.filter().map(post => { 
            return (
              <Link
                to={`/post/${post.post_id}`}>
                <div id={post.post_id} className='post'>
                  <img src={post.profile_img}/>
                  <h1>{post.title}</h1>
                  {this.props.user_id === post.user_id ? (
                    <button onClick={() => this.deletePost(post.user_id)}>
                      Delete
                    </button>
                  ) : null}
                  <div className='name-pic'>
                    <div>{post.email}</div>
                    <div className='post-pic'>
                      <img src={post.img_url} alt='' />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    )
  }
}
function mapStateToProps(reduxState) {
  const { title, img, content } = reduxState.post
  return {
    post: reduxState.post,
    title: title,
    img: img,
    content: content,
    user_id: reduxState.user_id
  }
}

export default connect(mapStateToProps)(Dash)