import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Nav extends Component {
  render() {
    return (
      <div>
        <Link to="/dashboard">
          <button>Home</button>
        </Link>

        <Link to="/new">
          <button>New Post</button>
        </Link>

        <Link to="/">
          <button>Log out</button>
        </Link>
      </div>
    );
  }
}
