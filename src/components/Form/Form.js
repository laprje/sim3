import React from 'react';
import {updatePost} from '../../ducks/reducer'
import axios from 'axios';
import {connect} from 'react-redux'
import Nav from '../Nav/Nav'

const Form = (props) => {

  const submitPost = () => {
    axios
      .post('/api/post', props.post)
      .then(res => {
        alert(res.data.message)
        props.history.push('/dashboard')
      })
      .catch((err => alert(err.response.data.message)))
  }

  return (
    <div>
      <Nav/>
      <h2>New Post</h2>
      <form>
        <input placeholder="Title" onChange={e => props.updatePost(e.target)} name="title" type="text" />
        <img name='img_url-prev' src={props.img_url} alt=''/>
        <input placeholder="Image URL" value={props.img_url} onChange={e => props.updatePost(e.target)} name="img_url" type="text" />
        <textarea placeholder="Content" onChange={e => props.updatePost(e.target)} name='content'/>
        <button onClick={() => submitPost()} >Post</button>
      </form>
    </div>
  );
}

 
function mapStateToProps(state) {
  const {title, img_url, content} = state.post
  return {
    post: state.post,
    title: title,
    img_url: img_url,
    content: content
  }
}
export default connect(mapStateToProps, {updatePost})(Form);