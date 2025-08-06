import { toast } from 'react-toastify';
import BASE_URL from '../../config/config';
import axios from 'axios';

export const FETCH_ADDRESSES_REQUEST = "FETCH_ADDRESSES_REQUEST";
export const FETCH_ADDRESSES_SUCCESS = "FETCH_ADDRESSES_SUCCESS";
export const FETCH_ADDRESSES_FAILURE = "FETCH_ADDRESSES_FAILURE";

export const ADD_ADDRESS = "ADD_ADDRESS";
export const UPDATE_ADDRESS = "UPDATE_ADDRESS";
export const DELETE_ADDRESS = "DELETE_ADDRESS";
export const SET_DEFAULT_ADDRESS = "SET_DEFAULT_ADDRESS";

const getToken = () => localStorage.getItem('access_token');

export const fetchAddresses = () => async (dispatch) => {
    dispatch({ type: FETCH_ADDRESSES_REQUEST });
    try {
        const res = await axios.get(`${BASE_URL}/user/addresses`, {
            headers: { Authorization: `Bearer ${getToken()}` }
        });
        dispatch({ type: FETCH_ADDRESSES_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: FETCH_ADDRESSES_FAILURE, payload: error.message });
    }
};

export const addAddress = (address) => async (dispatch) => {
    try {
        const res = await axios.post(`${BASE_URL}/user/addresses`, address, {
            headers: { Authorization: `Bearer ${getToken()}` }
        });
        dispatch({ type: ADD_ADDRESS, payload: res.data });
        toast.success(res.data?.message || 'Address added succesfully')
        dispatch(fetchAddresses());
    } catch (error) {
        console.error("Add address failed", error);
    }
};

export const editAddress = (id, updatedAddress) => async (dispatch) => {
    try {
        const res = await axios.put(`${BASE_URL}/user/addresses/${id}`, updatedAddress, {
            headers: { Authorization: `Bearer ${getToken()}` }
        });
        dispatch({ type: UPDATE_ADDRESS, payload: res.data });
        toast.success(res.data?.message || 'Address edited succesfully')
        dispatch(fetchAddresses());

    } catch (error) {
        console.error("Update address failed", error);
    }
};

export const deleteAddress = (id) => async (dispatch) => {

    try {
        const res = await axios.delete(`${BASE_URL}/user/addresses/${id}`, {
            headers: { Authorization: `Bearer ${getToken()}` }
        });
        dispatch({ type: DELETE_ADDRESS, payload: id });
        toast.success(res.data?.message || 'Address deleted succesfully')
        dispatch(fetchAddresses());
    } catch (error) {
        console.error("Delete address failed", error);
    }
};


export const setDefaultAddress = (id) => async (dispatch) => {
    try {
        const response = await axios.patch(`${BASE_URL}/user/addresses/set-default/${id}`,{} ,{
            headers: { Authorization: `Bearer ${getToken()}` }
        });
        toast.success(response.data?.message)
       await dispatch(fetchAddresses());
        return response.data;
    } catch (error) {
        console.error('Error setting default address:', error);
    }
};