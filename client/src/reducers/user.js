const defaultState = { loggedIn: false };

const user = (state = defaultState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        loggedIn: true,
        ...action.payload
      };
    case "LOGOUT":
      return {
        ...state,
        loggedIn: false
      };
    default:
      return state;
  }
};

export default user;
