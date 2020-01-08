import {
  User,
  Event,
  SET_USER,
  TOGGLE_LOGIN,
  SET_EVENTS,
  SET_EDITTED_EVENT
} from "./types";

export const setUser = (user: User) => ({
  type: SET_USER,
  payload: user
});

export const toggleLogin = () => ({
  type: TOGGLE_LOGIN
});

export const setEvents = (events: Event[]) => ({
  type: SET_EVENTS,
  payload: events
});

export const setEdittedEvent = (id: number) => ({
  type: SET_EDITTED_EVENT,
  payload: id
});
