import { createStore } from "redux";
import { State, SET_USER } from "./types";

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
  events: []
}

function reducer(state: State = initialState, action: any): State{
  switch(action.type) {
    case SET_USER:{
      return {
        ...state,
        user: action.payload
      }
    }
    default: {
      return state
    }
  }
}

const store = createStore(reducer);

export default store;