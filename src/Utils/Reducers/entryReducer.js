import {
  FETCH_ENTRY_BEGIN,
  FETCH_ENTRY_SUCCESS,
  FETCH_ENTRY_FAILURE,
  FETCH_ENTRIES_BEGIN,
  FETCH_ENTRIES_SUCCESS,
  FETCH_ENTRIES_FAILURE,
  CLEAR_ENTRY
} from "../Actions/types";

const initialState = {
  entry: [],
  entryLoading: false,
  entryError: null,
  entries: [],
  entriesLoading: false,
  entriesError: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CLEAR_ENTRY:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        entry: [],
        entryLoading: true,
        entryError: null,
      };

    case FETCH_ENTRY_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        entryLoading: true,
        entryError: null,
      };

    case FETCH_ENTRY_SUCCESS:
      return {
        ...state,
        entryLoading: false,
        entry: action.payload.data,
      };

    case FETCH_ENTRY_FAILURE:
      return {
        ...state,
        entryLoading: false,
        entryError: action.payload.error,
        entry: [],
      };


    case FETCH_ENTRIES_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        entriesLoading: true,
        entriesError: null,
      };

    case FETCH_ENTRIES_SUCCESS:
      return {
        ...state,
        entriesLoading: false,
        entries: action.payload.data,
      };

    case FETCH_ENTRIES_FAILURE:
      return {
        ...state,
        entriesLoading: false,
        entriesError: action.payload.error,
        entries: [],
      };

    default:
      return state;
  }
}
