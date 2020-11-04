import {
  FETCH_DURRAN_USER_BEGIN,
  FETCH_DURRAN_USER_SUCCESS,
  FETCH_DURRAN_USER_FAILURE,
  CLEAR_DURRAN_USER,
} from "../Actions/types";

const initialState = {
  durranUserLoading: false,
  durranUserError: null,
  durranUser: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CLEAR_DURRAN_USER:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        durranUserLoading: false,
        durranUserError: null,
        durranUser: []
      };
    case FETCH_DURRAN_USER_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        durranUserLoading: true,
        durranUserError: null,
      };

    case FETCH_DURRAN_USER_SUCCESS:
      return {
        ...state,
        durranUserLoading: false,
        durranUser: action.payload.data,
      };

    case FETCH_DURRAN_USER_FAILURE:
      return {
        ...state,
        durranUserLoading: false,
        durranUserError: action.payload.error,
        durranUser: [],
      };

    default:
      return state;
  }
}
