import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import { updateUserInfo } from "../../ducks/reducer";
import { connect } from "react-redux";
import axios from 'axios'
import Swal from 'sweetalert2'

const Nav = props => {
   const logout = () => {
        axios.post('/auth/logout').then(res => {
          Swal.fire(res.data.message)
          props.updateUserInfo({
            email: '',
            name: '',
            user_id: '',
            profile_img: ''
          })
        })
      }
    
  return (
    <div className="Nav">
      <div className="profile">
        {props.profile_img && <img src={props.profile_img} alt="" />}{" "}
        {props.email && <h4>{props.email}</h4>}
      </div>
      <div className="dash-new-container">
        <Link to="/dashboard">
          <button>Home</button>
        </Link>

        <Link to="/new">
          <button>New Post</button>
        </Link>
      </div>
      <Link to="/">
        <button onClick={logout}>Log out</button>
      </Link>
    </div>
  );
};

function mapStateToProps(reduxState) {
  return reduxState;
}

export default connect(mapStateToProps, { updateUserInfo })(Nav);
