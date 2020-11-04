import qs from 'qs';
import { getConfig } from 'radiks';

/**
 *
 * @param {*} query - Use `lt`, `createdBy`, and `fetcher` to query messages.
 * @param lt - fetch all votes created before the time provided
 * @param createdBy - messages created by this username
 * @param fetcher - pass the current user's username, to get info about if they've voted
 */
export const fetchDurranUserAPI = async (query) => {
  
  const { apiServer } = getConfig();
  const url = `${apiServer}/api/durranUser?${qs.stringify(query)}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.durranUser;
};


/**
 *
 * @param {*} query - Use `lt`, `createdBy`, and `fetcher` to query messages.
 * @param lt - fetch all votes created before the time provided
 * @param createdBy - messages created by this username
 * @param fetcher - pass the current user's username, to get info about if they've voted
 */
export const fetchEntryAPI = async (query) => {
  
  const { apiServer } = getConfig();
  const url = `${apiServer}/api/entry?${qs.stringify(query)}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.entries;
};

/**
 *
 * @param {*} query - Use `lt`, `createdBy`, and `fetcher` to query messages.
 * @param lt - fetch all votes created before the time provided
 * @param createdBy - messages created by this username
 * @param fetcher - pass the current user's username, to get info about if they've voted
 */
export const fetchEntriesAPI = async (query) => {
  
  const { apiServer } = getConfig();
  const url = `${apiServer}/api/entries?${qs.stringify(query)}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.entries;
};

/**
 *
 * @param {*} query - Use `lt`, `createdBy`, and `fetcher` to query messages.
 * @param lt - fetch all votes created before the time provided
 * @param createdBy - messages created by this username
 * @param fetcher - pass the current user's username, to get info about if they've voted
 */
export const fetchDareAPI = async (query) => {
  const { apiServer } = getConfig();
  const url = `${apiServer}/api/dare?${qs.stringify(query)}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.dare;
};

/**
 *
 * @param {*} query - Use `lt`, `createdBy`, and `fetcher` to query messages.
 * @param lt - fetch all votes created before the time provided
 * @param createdBy - messages created by this username
 * @param fetcher - pass the current user's username, to get info about if they've voted
 */
export const fetchDaresAPI = async (query) => {
  
  const { apiServer } = getConfig();
  const url = `${apiServer}/api/dares?${qs.stringify(query)}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.dares;
};

/**
 *
 * @param {*} query - Use `lt`, `createdBy`, and `fetcher` to query messages.
 * @param lt - fetch all votes created before the time provided
 * @param createdBy - messages created by this username
 * @param fetcher - pass the current user's username, to get info about if they've voted
 */
export const fetchDaresAdminAPI = async (query) => {
  
  const { apiServer } = getConfig();
  const url = `${apiServer}/api/daresAdmin?${qs.stringify(query)}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.dares;
};

/**
 *
 * @param {*} query - Use `lt`, `createdBy`, and `fetcher` to query messages.
 * @param lt - fetch all votes created before the time provided
 * @param createdBy - messages created by this username
 * @param fetcher - pass the current user's username, to get info about if they've voted
 */
export const fetchVotes = async (query) => {
  const { apiServer } = getConfig();
  const url = `${apiServer}/api/votes?${qs.stringify(query)}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.messages;
};

export const fetchUser = async (username) => {
  const { apiServer } = getConfig();
  const url = `${apiServer}/api/profile/${username}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};


