import { createStore } from "redux";
import { State, SET_USER, TOGGLE_LOGIN, SET_EVENTS } from "./types";

const initialState: State = {
  user: {
    email: "",
    password: "",
    name: "",
    description: "",
    website: "",
    logoUrl: "",
    id: -1
  },
  events: [],
  loggedIn: false,
  showLogin: true
};

function reducer(state: State = initialState, action: any): State {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        user: action.payload,
        loggedIn: true
      };
    }
    case TOGGLE_LOGIN: {
      return {
        ...state,
        showLogin: !state.showLogin
      };
    }
    case SET_EVENTS: {
      return {
        ...state,
        events: action.payload
      };
    }
    default: {
      return state;
    }
  }
}

const store = createStore(reducer);

export default store;
