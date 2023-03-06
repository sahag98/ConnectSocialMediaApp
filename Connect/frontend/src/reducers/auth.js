import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  FOLLOW,
  UNFOLLOW
} from "../actions/types";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };



export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case FOLLOW:
      state.user.followings.push(payload)
      localStorage.setItem("user", JSON.stringify(user))
      return {
        ...state,
      }

    case UNFOLLOW:
      state.user.followings = state.user.followings.filter((following) => following !== payload)
      localStorage.setItem("user", JSON.stringify(user))
      return {
        ...state,
      }
    default:
      return state;
  }
}