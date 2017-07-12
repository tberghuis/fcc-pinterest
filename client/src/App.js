import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import Header from "./components/Header";
import PinList from "./components/PinList";
import NewPinModal from "./components/NewPinModal";
import LightboxWrapper from "./components/LightboxWrapper";
import PinsFilter from "./components/PinsFilter";

import reducer from "./reducers/index";
import axiosApi from "./axiosApi";

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class App extends Component {
  componentWillMount() {
    axiosApi
      .get("/auth/login")
      .then(res => {
        console.log("login res", res);
        store.dispatch({ type: "LOGIN", payload: res.data });
      })
      .catch(err => {
        console.log("err", err);
      });
    axiosApi
      .get("/pins")
      .then(res => {
        console.log("pins res", res);
        store.dispatch({ type: "PINS_DATA", payload: res.data });
      })
      .catch(err => {
        console.log("err", err);
      });
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <PinsFilter>
            <Header />
            <PinList />
            <NewPinModal />
            <LightboxWrapper />
          </PinsFilter>
        </Router>
      </Provider>
    );
  }
}

export default App;
