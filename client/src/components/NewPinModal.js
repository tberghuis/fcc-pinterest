import React, { Component } from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import { connect } from "react-redux";

import axiosApi from "../axiosApi";

class NewPinModal extends Component {
  constructor(props) {
    super(props);
    this.state = { errors: {} };
  }
  handleSubmit = e => {
    e.preventDefault();

    // console.log("title", this.titleInput.value);
    // console.log("image", this.imageInput.value);

    // get data
    let title = this.titleInput.value,
      imageUrl = this.imageInput.value;

    // post
    axiosApi
      .post("/pins/create", { title, imageUrl })
      .then(res => {
        this.props.dispatch({ type: "CLOSE_NEW_PIN_MODAL" });
        // console.log("new pin res.data", res.data);
        let pin = {
          id: res.data._id,
          title: res.data.title,
          imageUrl: res.data.imageUrl,
          twitter: this.props.username,
          liked: false,
          numLikes: 0,
          owner: this.props.userId
        };
        this.props.dispatch({ type: "ADD_PIN", payload: pin });
        this.setState({ errors: {} });
      })
      .catch(err => {
        // console.log("err", err);
        // // console.log("err.keys", Object.keys(err));
        // console.log("err.config", err.config);
        // console.log("err.request", err.request);
        // console.log("err.response", err.response);
        let { errors } = err.response.data;
        if (errors) {
          this.setState({ errors });
        }
      });
  };
  handleClose = () => {
    this.setState({ errors: {} });
    this.props.dispatch({ type: "CLOSE_NEW_PIN_MODAL" });
  };
  render() {
    // console.log("render newpinmodal props", this.props);
    return (
      <Modal open={this.props.showNewPinModal} onClose={this.handleClose}>
        <Modal.Header>New Pin</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field error={!!this.state.errors.title}>
              <label>Title</label>
              <input
                ref={input => (this.titleInput = input)}
                placeholder="Title"
              />
              {this.state.errors.title &&
                <div className="ui basic red pointing prompt label transition visible">
                  {this.state.errors.title}
                </div>}
            </Form.Field>
            <Form.Field error={!!this.state.errors.title}>
              <label>Image URL</label>
              <input
                ref={input => (this.imageInput = input)}
                placeholder="Image URL"
              />
              {this.state.errors.imageUrl &&
                <div className="ui basic red pointing prompt label transition visible">
                  {this.state.errors.imageUrl}
                </div>}
            </Form.Field>
            <Button type="submit">Submit</Button>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  showNewPinModal: state.view.showNewPinModal,
  username: state.user.username,
  userId: state.user.id
});

export default connect(mapStateToProps)(NewPinModal);
