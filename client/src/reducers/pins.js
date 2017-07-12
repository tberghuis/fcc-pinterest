const defaultState = [];

const pins = (state = defaultState, action) => {
  switch (action.type) {
    case "PINS_DATA":
      return action.payload;

    case "ADD_PIN":
      return [...state, action.payload];

    case "PIN_LIKE":
      let index = state.findIndex(pin => pin.id === action.pinId);
      let pin = state[index];
      pin.liked = true;
      pin.numLikes = pin.numLikes + 1;
      return [...state.slice(0, index), pin, ...state.slice(index + 1)];

    case "PIN_DISLIKE":
      index = state.findIndex(pin => pin.id === action.pinId);
      pin = state[index];
      pin.liked = false;
      pin.numLikes = pin.numLikes - 1;
      return [...state.slice(0, index), pin, ...state.slice(index + 1)];

    case "PIN_DELETE":
      index = state.findIndex(pin => pin.id === action.id);
      pin = state[index];
      return [...state.slice(0, index), ...state.slice(index + 1)];

    default:
      return state;
  }
};

export default pins;
