import React, { Component } from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axiosApi from "../axiosApi";
import ImageLoader from "react-imageloader";
import Spinner from "react-spinkit";

const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
`;

const CardStyled = styled(Card)`
.extra.content {
  display: flex;
   justify-content: space-between; 
}
.flash-message {
  color: red;
}
img {
  cursor: pointer;
}
.remove {
  margin-left: auto;
}
.header {
  text-overflow: ellipsis;
    overflow: hidden;
}
`;

class Pin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flashErrorMessage: false,
      imageLoaded: false
    };
  }

  handleImageClick = pinId => () => {
    this.props.dispatch({ type: "SHOW_LIGHTBOX", pinId: this.props.id });
  };

  handleLikeClick = () => {
    // if ! auth flash message return
    if (!this.props.loggedIn) {
      this.setState({ flashErrorMessage: true });
      setTimeout(() => {
        this.setState({ flashErrorMessage: false });
      }, 3000);
      return;
    }

    // toggle liked
    if (this.props.liked) {
      // optimistic update
      this.props.dispatch({ type: "PIN_DISLIKE", pinId: this.props.id });
      axiosApi
        .get(`/pins/dislike/${this.props.id}`)
        .then(res => {
          console.log("res", res);
        })
        .catch(err => {
          console.log("err", err);
        });
    } else {
      // optimistic update
      this.props.dispatch({ type: "PIN_LIKE", pinId: this.props.id });
      axiosApi
        .get(`/pins/like/${this.props.id}`)
        .then(res => {
          console.log("res", res);
        })
        .catch(err => {
          console.log("err", err);
        });
    }
  };

  handleDeleteClick = () => {
    console.log(
      "handleDeleteClick",
      this.props.id,
      this.props.owner,
      this.props.userId
    );
    axiosApi
      .get(`/pins/delete/${this.props.id}`)
      .then(() => {
        console.log("success");
        this.props.dispatch({ type: "PIN_DELETE", id: this.props.id });
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  addDefaultSrc = ev => {
    ev.target.src = "/placeholder.jpg";
  };

  render() {
    var { title, imageUrl, twitter, liked, numLikes, owner } = this.props;
    console.log("pin props", this.props);
    var showDelete = this.props.loggedIn && this.props.userId === owner;
    return (
      <CardStyled>
        {!this.state.imageLoaded &&
          <ImageLoader
            src={imageUrl}
            onLoad={() => this.setState({ imageLoaded: true })}
            onError={() => this.setState({ imageLoaded: true })}
            preloader={() =>
              <SpinnerWrapper>
                <Spinner name="line-scale" />
              </SpinnerWrapper>}
          />}
        {this.state.imageLoaded &&
          <Image
            onError={this.addDefaultSrc}
            onClick={this.handleImageClick(this.props.id)}
            src={imageUrl}
          />}
        <Card.Content>
          <Card.Header>
            {title}
          </Card.Header>
          <Card.Meta>
            Posted by{" "}
            <Link style={{ color: "teal" }} to={`/user/${owner}`}>
              @{twitter}
            </Link>
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <div>
            <a onClick={this.handleLikeClick}>
              <Icon color={liked ? "red" : "grey"} name="like" />
              {numLikes} {"Like" + (numLikes === 1 ? "" : "s")}
            </a>
          </div>
          {this.state.flashErrorMessage &&
            <div className="flash-message"> Please signin to like</div>}

          {showDelete &&
            <Icon
              link
              color="red"
              size="large"
              name="remove circle"
              onClick={this.handleDeleteClick}
            />}
        </Card.Content>
      </CardStyled>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
  userId: state.user.id
});

export default connect(mapStateToProps)(Pin);
