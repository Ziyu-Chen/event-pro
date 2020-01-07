export interface User {
  email: string
  password: string
  name: string
  description: string
  website: string
  logoUrl: string
  id?: number
  confirmPassword?: string
}

export interface Event {
  id: number
  name: string
  category: string
  createdAt: any
  startingDate: any
  endingDate: any
  description: string
  photoUrl: string
  countryCode: string
  city: string
  address: string
  price: number
  currencyCode: string
}

export interface State {
  user: User
  events: Event[]
  loggedIn: boolean
  showLogin: boolean
}

export const SET_USER = "SET_USER";

export const TOGGLE_LOGIN = "TOGGLE_LOGIN";