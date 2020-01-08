import { User, Event, SET_USER, TOGGLE_LOGIN, SET_EVENTS } from "./types";

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
