import React, { Component } from "react";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  }

  handleLogin = () => {
    this.setState({ loggedIn: true });
  };

  handleLogout = () => {
    this.setState({ loggedIn: false });
  };

  render() {
    const { loggedIn } = this.state;
    return (
      <div>
        {loggedIn ? (
          <button onClick={this.handleLogout}>Logout</button>
        ) : (
          <button onClick={this.handleLogin}>Login</button>
        )}
      </div>
    );
  }
}

export default NavBar;
