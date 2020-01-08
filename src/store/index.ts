import { createStore } from "redux";
import {
  State,
  SET_USER,
  TOGGLE_LOGIN,
  SHOW_EVENT_INFO,
  SET_EVENTS,
  SET_EDITTED_EVENT,
  SHOW_BUILD_EVENT
} from "./types";

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
  showLogin: true,
  showEventInfo: true,
  showBuildEvent: false,
  edittedEventId: 0
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
    case SHOW_EVENT_INFO: {
      return {
        ...state,
        showEventInfo: true,
        showBuildEvent: false,
        edittedEventId: 0
      };
    }
    case SHOW_BUILD_EVENT: {
      return {
        ...state,
        showEventInfo: false,
        showBuildEvent: true,
        edittedEventId: 0
      };
    }
    case SET_EVENTS: {
      return {
        ...state,
        events: action.payload
      };
    }
    case SET_EDITTED_EVENT: {
      return {
        ...state,
        showEventInfo: false,
        showBuildEvent: false,
        edittedEventId: action.payload
      };
    }
    default: {
      return state;
    }
  }
}

const store = createStore(reducer);

export default store;
