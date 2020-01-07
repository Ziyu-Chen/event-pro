import {User, SET_USER, TOGGLE_LOGIN} from "./types"

export const setUser = (user: User) => ({
  type: SET_USER,
  payload: user
})

export const toggleLogin = () => ({
  type: TOGGLE_LOGIN
})