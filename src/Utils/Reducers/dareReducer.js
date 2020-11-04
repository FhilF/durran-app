import {
  FETCH_DARES_ADMIN,
  FETCH_DARES_BEGIN,
  FETCH_DARES_SUCCESS,
  FETCH_DARES_FAILURE,
  FETCH_DARE_BEGIN,
  FETCH_DARE_SUCCESS,
  FETCH_DARE_FAILURE,
  CLEAR_DARE
} from "../Actions/types";

const initialState = {
  dareLoading: false,
  dareError: null,
  dare: [],
  daresLoading: false,
  daresError: null,
  dares: [],
  loading: false,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CLEAR_DARE:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        dareLoading: false,
        dareError: null,
        dare: []
      };
    case FETCH_DARE_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        dareLoading: true,
        dareError: null,
      };

    case FETCH_DARE_SUCCESS:
      return {
        ...state,
        dareLoading: false,
        dare: action.payload.data,
      };

    case FETCH_DARE_FAILURE:
      return {
        ...state,
        dareLoading: false,
        dareError: action.payload.error,
        dare: [],
      };

    case FETCH_DARES_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        daresLoading: true,
        daresError: null,
      };

    case FETCH_DARES_SUCCESS:
      return {
        ...state,
        daresLoading: false,
        dares: action.payload.data,
      };

    case FETCH_DARES_FAILURE:
      return {
        ...state,
        daresLoading: false,
        daresError: action.payload.error,
        dares: [],
      };

    case FETCH_DARES_ADMIN:
      return {
        ...state,
        dares: action.payload.data,
      };
    default:
      return state;
  }
}
