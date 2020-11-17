import {
  GET_USER,
  SET_USER,
  SIGN_OUT_USER,
  SIGN_IN_USER,
  SET_USER_SETTINGS,
  GET_USER_SETTINGS,
} from "./types";

export const setUser = (params) => (dispatch) => {
  dispatch({
    type: SET_USER,
    payload: { params },
  });
};

export const getUser = (params) => (dispatch) => {
  dispatch({
    type: GET_USER,
    payload: { params },
  });
};

export const setUserSettings = (params) => (dispatch) => {
  dispatch({
    type: SET_USER_SETTINGS,
    payload: { params },
  });
};

export function signInUser(e, doOpenAuth) {
  e.preventDefault();
  doOpenAuth(true);
  return {
    type: SIGN_IN_USER,
  };
}

export function signOutUser(e, userSession, signOut) {
  e.preventDefault();
  userSession.signUserOut(window.location.origin);
  signOut();
  return {
    type: SIGN_OUT_USER,
  };
}
