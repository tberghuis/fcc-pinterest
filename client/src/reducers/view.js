const defaultState = {
  showNewPinModal: false,
  showLightbox: false,
  newPinErrors: {},
  lightboxPinId: null,
  pinList: []
};

const view = (state = defaultState, action) => {
  switch (action.type) {
    // case "LOGOUT":
    // return {
    //         ...state,

    //         selectedUser: null
    //       };
    case "FILTER_PINS":
      return {
        ...state,
        pinList: action.pinList,
        selectedUser: action.selectedUser
      };

    case "SHOW_LIGHTBOX":
      return {
        ...state,
        showLightbox: true,
        lightboxPinId: action.pinId
      };
    case "CLOSE_LIGHTBOX":
      return {
        ...state,
        showLightbox: false,
        lightboxPinId: null
      };

    case "SHOW_NEW_PIN_MODAL":
      return {
        ...state,
        showNewPinModal: true
      };
    case "CLOSE_NEW_PIN_MODAL":
      return {
        ...state,
        showNewPinModal: false
      };
    default:
      return state;
  }
};

export default view;
