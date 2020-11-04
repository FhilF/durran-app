import {
  FETCH_DURRAN_USER_BEGIN,
  FETCH_DURRAN_USER_SUCCESS,
  FETCH_DURRAN_USER_FAILURE,
  CLEAR_DURRAN_USER,
} from "./types";
import { fetchDurranUserAPI } from "../api";

export const clearDurranUser = (query) => async (dispatch) => {
  dispatch({
    type: CLEAR_DURRAN_USER,
  });
};

export const fertchDurranUser = (query) => async (dispatch) => {
  dispatch({
    type: FETCH_DURRAN_USER_BEGIN,
  });
  try {
    let data = await fetchDurranUserAPI(query);
    dispatch({
      type: FETCH_DURRAN_USER_SUCCESS,
      payload: { data },
    });
  } catch (error) {
    dispatch({ type: FETCH_DURRAN_USER_FAILURE, payload: { error } });
  }
};
