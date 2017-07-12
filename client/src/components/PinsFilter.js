import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import axiosApi from "../axiosApi";

class PinsFilter extends Component {
  setViewPinList = (pathname, pins, loggedIn) => {
    console.log("PinsFilter,pathname,pins", pathname, pins);
    var pinList = pins;
    // look for mypins
    if (loggedIn && pathname === "/mypins") {
      pinList = pinList.filter(pin => {
        return pin.owner === this.props.userId;
      });
      this.props.dispatch({
        type: "FILTER_PINS",
        pinList,
        selectedUser: this.props.loggedInUser
      });
      return;
    }
    // pathname /user/:ownerId
    let pathArray = pathname.split("/");
    if (pathArray.length === 3 && pathArray[1] === "user") {
      let selectedUserId = pathArray[2];
      let pinListFiltered = pinList.filter(pin => {
        return pin.owner === selectedUserId;
      });
      axiosApi
        .get(`/user/${selectedUserId}`)
        .then(res => {
          this.props.dispatch({
            type: "FILTER_PINS",
            pinList: pinListFiltered,
            selectedUser: res.data
          });
        })
        .catch(err => {
          console.log("err", err);
          this.props.dispatch({
            type: "FILTER_PINS",
            pinList,
            selectedUser: null
          });
        });
      return;
    }
    // default to all pins
    this.props.dispatch({ type: "FILTER_PINS", pinList, selectedUser: null });
  };

  // fire actions on lifecycle methods to filter pins using route pathname
  // dispatch pinlist to redux store
  componentDidMount() {
    this.setViewPinList(
      this.props.location.pathname,
      this.props.pins,
      this.props.loggedIn
    );
  }
  componentWillReceiveProps(nextProps) {
    this.setViewPinList(
      nextProps.location.pathname,
      nextProps.pins,
      nextProps.loggedIn
    );
    // user just logged out
    if (!nextProps.loggedIn && nextProps.loggedIn !== this.props.loggedIn) {
      this.props.history.push("/");
    }
  }

  render() {
    // console.log("PinsFilter props", this.props);
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pins: state.pins,
  loggedIn: state.user.loggedIn,
  userId: state.user.id,
  loggedInUser: state.user
});

export default withRouter(connect(mapStateToProps)(PinsFilter));
