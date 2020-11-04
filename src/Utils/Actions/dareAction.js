import {
  FETCH_DARES_ADMIN,
  FETCH_DARES_BEGIN,
  FETCH_DARES_SUCCESS,
  FETCH_DARES_FAILURE,
  FETCH_DARE_BEGIN,
  FETCH_DARE_SUCCESS,
  FETCH_DARE_FAILURE,
  CLEAR_DARE
} from "./types";
import { fetchDaresAPI, fetchDaresAdminAPI, fetchDareAPI } from "../api";


export const clearDare = (query) => async (dispatch) => {
  dispatch({
    type: CLEAR_DARE,
  });
};

export const fetchDare = (query) => async (dispatch) => {
  dispatch({
    type: FETCH_DARE_BEGIN,
  });
  try {
    let data = await fetchDareAPI(query);
    dispatch({
      type: FETCH_DARE_SUCCESS,
      payload: { data },
    });
  } catch (error) {
    dispatch({ type: FETCH_DARE_FAILURE, payload: { error } });
  }
};

export const fetchDares = (query) => async (dispatch) => {
  dispatch({
    type: FETCH_DARES_BEGIN,
  });
  try {
    let data = await fetchDaresAPI(query);
    dispatch({
      type: FETCH_DARES_SUCCESS,
      payload: { data },
    });
  } catch (error) {
    dispatch({ type: FETCH_DARES_FAILURE, payload: { error } });
  }
};

export const fetchDaresAdmin = (params) => async (dispatch) => {
  try {
    const data = await fetchDaresAdminAPI();
    dispatch({
      type: FETCH_DARES_ADMIN,
      payload: { data },
    });
  } catch (error) {
    // dispatch(doError(error));
    console.log("error");
  }
};
