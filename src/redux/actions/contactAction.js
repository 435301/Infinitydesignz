// redux/types/contactTypes.js

import BASE_URL from "../../config/config";
import axios from "axios";
import { getAdminToken } from "../../utils/adminAuth";
import { toast } from "react-toastify";


export const CREATE_CONTACT_REQUEST = 'CREATE_CONTACT_REQUEST';
export const CREATE_CONTACT_SUCCESS = 'CREATE_CONTACT_SUCCESS';
export const CREATE_CONTACT_FAIL = 'CREATE_CONTACT_FAIL';

export const GET_CONTACTS_REQUEST = 'GET_CONTACTS_REQUEST';
export const GET_CONTACTS_SUCCESS = 'GET_CONTACTS_SUCCESS';
export const GET_CONTACTS_FAIL = 'GET_CONTACTS_FAIL';

export const GET_CONTACT_BY_ID_REQUEST = 'GET_CONTACT_BY_ID_REQUEST';
export const GET_CONTACT_BY_ID_SUCCESS = 'GET_CONTACT_BY_ID_SUCCESS';
export const GET_CONTACT_BY_ID_FAIL = 'GET_CONTACT_BY_ID_FAIL';

export const UPDATE_CONTACT_REQUEST = 'UPDATE_CONTACT_REQUEST';
export const UPDATE_CONTACT_SUCCESS = 'UPDATE_CONTACT_SUCCESS';
export const UPDATE_CONTACT_FAIL = 'UPDATE_CONTACT_FAIL';

export const DELETE_CONTACT_REQUEST = 'DELETE_CONTACT_REQUEST';
export const DELETE_CONTACT_SUCCESS = 'DELETE_CONTACT_SUCCESS';
export const DELETE_CONTACT_FAIL = 'DELETE_CONTACT_FAIL';

export const SET_CONTACT_STATUS_REQUEST = 'SET_CONTACT_STATUS_REQUEST';
export const SET_CONTACT_STATUS_SUCCESS = 'SET_CONTACT_STATUS_SUCCESS';
export const SET_CONTACT_STATUS_FAIL = 'SET_CONTACT_STATUS_FAIL';


export const getContacts = (search = '', status = '', page = 1) => async (dispatch) => {
  try {
    dispatch({ type: GET_CONTACTS_REQUEST });
    const  response  = await axios.get(`${BASE_URL}/contacts?search=${search}&status=${status}&page=${page}`,{
      headers: {
        Authorization: `Bearer ${getAdminToken()}`,
      },
    });

    dispatch({ type: GET_CONTACTS_SUCCESS, payload: response.data.items });
  } catch (error) {
    dispatch({ type: GET_CONTACTS_FAIL, payload: error.message });
  }
};

export const createContact = (contactData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_CONTACT_REQUEST });
    const {data} = await axios.post(`${BASE_URL}/contacts`, contactData,{
      headers: {
        Authorization: `Bearer ${getAdminToken()}`,
      },
    });
    dispatch({ type: CREATE_CONTACT_SUCCESS, payload: data });
    dispatch(getContacts());
    toast.success(data.message || 'Your message has been sent successfully!');
  } catch (error) {
    dispatch({ type: CREATE_CONTACT_FAIL, payload: error.message });
  }
};


export const updateContact = (contactId, contactData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CONTACT_REQUEST });
    const { data } = await axios.put(`${BASE_URL}/contacts/${contactId}`, contactData,{
      headers: {
        Authorization: `Bearer ${getAdminToken()}`,
      },
    });
    dispatch({ type: UPDATE_CONTACT_SUCCESS, payload: data });
    dispatch(getContacts());
  } catch (error) {
    dispatch({ type: UPDATE_CONTACT_FAIL, payload: error.message });
  }
};

export const deleteContact = (contactId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CONTACT_REQUEST });
   const response =  await axios.delete(`${BASE_URL}/contacts/${contactId}`,{
      headers: {
        Authorization: `Bearer ${getAdminToken()}`,
      },
    });
    dispatch({ type: DELETE_CONTACT_SUCCESS, payload: contactId });
    dispatch(getContacts());
    toast.success(response.data.message || 'Contact deleted successfully');
  } catch (error) {
    dispatch({ type: DELETE_CONTACT_FAIL, payload: error.message });
  }
};

export const setContactStatus = (contactId, status) => async (dispatch) => {
  try {
    dispatch({ type: SET_CONTACT_STATUS_REQUEST });
    const { data } = await axios.patch(`${BASE_URL}/contacts/${contactId}/status`, { status },{
      headers: {
        Authorization: `Bearer ${getAdminToken()}`,
      },
    });
    dispatch({ type: SET_CONTACT_STATUS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SET_CONTACT_STATUS_FAIL, payload: error.message });
  }
};

export const getContactById = (contactId) => async (dispatch) => {
  try {
    dispatch({ type: GET_CONTACT_BY_ID_REQUEST });
    const { data } = await axios.get(`${BASE_URL}/contacts/${contactId}`,{
      headers: {
        Authorization: `Bearer ${getAdminToken()}`,
      },
    });
    dispatch({ type: GET_CONTACT_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_CONTACT_BY_ID_FAIL, payload: error.message });
  }
};