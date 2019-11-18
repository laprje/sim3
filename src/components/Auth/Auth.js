import React, { Component } from 'react'
import axios from 'axios' 
import {updateUserInfo} from '../../ducks/reducer'
import {connect} from 'react-redux'
import Swal from 'sweetalert2'

class Auth extends Component {

    state = {
        email: '',
        password: ''
      }

      handleChange = (key, value) => {
        this.setState({[key]: value})
      }

      register = () => {
        const {email, password} = this.state
        axios
            .post('/auth/register', {email, password})
            .then( res => {
                Swal.fire({
                    title: "Welcome to Helo!",
                    icon: "success"
                })
                this.props.updateUserInfo(res.data.user)
                this.props.history.push('/dashboard')
            })
            .catch(err => {
                Swal.fire({
                    title: `Error`,
                    icon: "warning",
                })
            })
      }

      login = () => {
          const {email, password} = this.state
          axios
            .post('/auth/login', {email, password})
            .then(res => {
                Swal.fire({
                    title: "You're Logged In!",
                    icon: "success"
                })
                this.props.updateUserInfo(res.data.user)
                this.props.history.push('/dashboard')
            })
            .catch(err => {
                Swal.fire({
                    title: `Error`,
                    icon: "warning",
                })
            })
      }

      
    render() {
        return (
            <div>
                <input 
                type="text"
                value={this.state.email}
                placeholder='Email'
                onChange={e => this.handleChange('email', e.target.value)}
                />
                
                <input 
                value={this.state.password}
                placeholder='Password'
                type='password'
                onChange={e => this.handleChange('password', e.target.value)}
                />

                <button onClick={this.register} >Register</button>
                <button onClick={this.login} >Log In</button>
            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    return reduxState
}

export default connect(mapStateToProps, {updateUserInfo})(Auth)