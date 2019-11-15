import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import { updateUserInfo } from "../../ducks/reducer";
import { connect } from "react-redux";

const Nav = props => {
  return (
    <div className="Nav">
      {props.profile_img && <img src={props.profile_img} alt="" />}{" "}
      <div className="dash-new-container">
        <Link to="/dashboard">
          <button>Home</button>
        </Link>

        <Link to="/new">
          <button>New Post</button>
        </Link>
      </div>
      <Link to="/">
        <button>Log out</button>
      </Link>
    </div>
  );
};

function mapStateToProps(reduxState) {
  return reduxState;
}

export default connect(mapStateToProps, { updateUserInfo })(Nav);
