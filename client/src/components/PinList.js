import React, { Component } from "react";
import Masonry from "react-masonry-component";
import { connect } from "react-redux";
import { Container, Header } from "semantic-ui-react";

import Pin from "./Pin";

class PinList extends Component {
  render() {
    // console.log("PinList props", this.props);
    let user = this.props.selectedUser;
    return (
      <Container>
        {!user && <Header as="h1">All Pins</Header>}
        {user &&
          <Header as="h1">
            Pins added by {user.displayName},{" "}
            <a
              style={{ color: "teal" }}
              target="_blank"
              href={`https://twitter.com/${user.username}`}
            >
              @{user.username}
            </a>
          </Header>}
        <Masonry>
          {this.props.pinList.map(pin => {
            return <Pin key={pin.id} {...pin} />;
          })}
        </Masonry>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  pinList: state.view.pinList,
  selectedUser: state.view.selectedUser
});

export default connect(mapStateToProps)(PinList);
