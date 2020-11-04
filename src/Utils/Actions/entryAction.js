import {
  FETCH_ENTRY_BEGIN,
  FETCH_ENTRY_SUCCESS,
  FETCH_ENTRY_FAILURE,
  FETCH_ENTRIES_BEGIN,
  FETCH_ENTRIES_SUCCESS,
  FETCH_ENTRIES_FAILURE,
  CLEAR_ENTRY
} from "./types";
import { fetchEntriesAPI,fetchEntryAPI } from "../api";

export const clearEntry = (query) => async (dispatch) => {
  dispatch({
    type: CLEAR_ENTRY,
  });
};

export const fetchEntry = (query) => async (dispatch) => {
  dispatch({
    type: FETCH_ENTRY_BEGIN,
  });
  try {
    let data = await fetchEntryAPI(query);
    dispatch({
      type: FETCH_ENTRY_SUCCESS,
      payload: { data },
    });
  } catch (error) {
    dispatch({ type: FETCH_ENTRY_FAILURE, payload: { error } });
  }
};


export const fetchEntries = (query) => async (dispatch) => {
  dispatch({
    type: FETCH_ENTRIES_BEGIN,
  });
  try {
    let data = await fetchEntriesAPI(query);
    dispatch({
      type: FETCH_ENTRIES_SUCCESS,
      payload: { data },
    });
  } catch (error) {
    dispatch({ type: FETCH_ENTRIES_FAILURE, payload: { error } });
  }
};
