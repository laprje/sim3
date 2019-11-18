import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import { updateUserInfo } from "../../ducks/reducer";
import { connect } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      user: {}
    }
    this.logout = this.logout.bind(this);
  }

  componentDidMount(req, res) {
    axios.get("/api/auth/me").then(user => {
      this.setState({
        user: user.data
      })
    });
    
  };

  logout = () => {
    axios.post("/auth/logout").then(res => {
      Swal.fire(res.data.message);
      this.props.updateUserInfo({
        email: "",
        name: "",
        user_id: "",
        profile_img: ""
      });
    });
  };
  render() {
    console.log(this.state)
    return (
      <div className="Nav">
        <div className="profile">
          {this.state.user.profile_img && <img src={this.state.user.profile_img} alt="" />}{" "}
          {this.state.user.email && <h4>{this.state.user.email}</h4>}
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
          <button onClick={this.logout}>Log out</button>
        </Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    email: state.email,
    profile_img: state.profile_img
  };
}

export default connect(mapStateToProps, { updateUserInfo })(Nav);
