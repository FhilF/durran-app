import {
  GET_USER,
  SET_USER,
  SET_USER_SETTINGS,
  SIGN_OUT_USER,
  SIGN_IN_USER,
} from "../Actions/types";

const initialState = {
  user: [],
  userSettings: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload.params,
      };
    case GET_USER:
      return {
        ...state,
      };
    case SET_USER_SETTINGS:
      return {
        ...state,
        userSettings: action.payload.params,
      };
    case SIGN_IN_USER:
      return {
        ...state,
      };
    case SIGN_OUT_USER:
      return {
        ...state,
      };
    default:
      return state;
  }
}
