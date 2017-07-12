import React, { Component } from "react";
import { connect } from "react-redux";
import Lightbox from "react-images";

// get user from react router
// or sync react router with redux
// get route from location prop

class LightboxWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: 0
    };
  }

  handleClose = () => {
    this.props.dispatch({ type: "CLOSE_LIGHTBOX" });
  };

  gotoPrevious = () => {
    this.setState({
      currentImage: this.state.currentImage - 1
    });
  };
  gotoNext = () => {
    this.setState({
      currentImage: this.state.currentImage + 1
    });
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.showLightbox !== nextProps.showLightbox) {
      let currentImage = this.props.pinList.findIndex(
        p => p.id === nextProps.pinId
      );
      this.setState({ currentImage });
    }
  }

  getImagesArray = () => {
    return this.props.pinList.map(pin => ({
      src: pin.imageUrl,
      caption: pin.title
      // id: pin.id // do i need this??
    }));
  };

  render() {
    console.log("render LightboxWrapper props", this.props);

    return (
      <Lightbox
        images={this.getImagesArray()}
        isOpen={this.props.showLightbox}
        onClose={this.handleClose}
        currentImage={this.state.currentImage}
        onClickPrev={this.gotoPrevious}
        onClickNext={this.gotoNext}
      />
    );
  }
}

const mapStateToProps = state => ({
  pinList: state.view.pinList,
  showLightbox: state.view.showLightbox,
  pinId: state.view.lightboxPinId
});

export default connect(mapStateToProps)(LightboxWrapper);
