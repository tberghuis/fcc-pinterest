import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import styled from "styled-components";

import axiosApi from "../axiosApi";

const MenuStyled = styled(Menu)`
@media only screen and (max-width: 767px) {
  display:flex;
  flex-direction:column;
  width: 100%;
.item {
    border: 1px solid rgba(34,36,38,.15) !important;
    }
  .submenu {
    display: none !important;
  }
}
`;

class Header extends Component {
  handleLogout = () => {
    axiosApi
      .get("/auth/logout")
      .then(res => {
        this.props.dispatch({ type: "LOGOUT" });
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  handleNewPin = () => {
    this.props.dispatch({ type: "SHOW_NEW_PIN_MODAL" });
  };

  render() {
    return (
      <MenuStyled>
        {this.props.user.loggedIn &&
          <Menu.Item onClick={this.handleLogout}>
            Logout {this.props.user.displayName}
          </Menu.Item>}
        {!this.props.user.loggedIn &&
          <Menu.Item
            as="a"
            href={`${process.env.REACT_APP_API_SERVER_BASE}/auth/twitter`}
          >
            Sign in
          </Menu.Item>}

        <Menu.Item as={Link} to="/">
          All Pins
        </Menu.Item>
        {this.props.user.loggedIn &&
          <Menu.Item as={Link} to="/mypins">
            My Pins
          </Menu.Item>}
        {this.props.user.loggedIn &&
          <Menu.Item onClick={this.handleNewPin}>New Pin</Menu.Item>}
        <Menu.Menu className="submenu" position="right">
          <Menu.Item
            as="a"
            href="https://github.com/tberghuis/fcc-pinterest"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon size="large" name="github" />
          </Menu.Item>
        </Menu.Menu>
      </MenuStyled>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Header);
