// redux/reducers/contactReducer.js
import {
  CREATE_CONTACT_REQUEST,
  CREATE_CONTACT_SUCCESS,
  CREATE_CONTACT_FAIL,
  GET_CONTACTS_REQUEST,
  GET_CONTACTS_SUCCESS,
  GET_CONTACTS_FAIL,
  GET_CONTACT_BY_ID_REQUEST,
  GET_CONTACT_BY_ID_SUCCESS,
  GET_CONTACT_BY_ID_FAIL,
  UPDATE_CONTACT_REQUEST,
  UPDATE_CONTACT_SUCCESS,
  UPDATE_CONTACT_FAIL,
  DELETE_CONTACT_REQUEST,
  DELETE_CONTACT_SUCCESS,
  DELETE_CONTACT_FAIL,
  SET_CONTACT_STATUS_REQUEST,
  SET_CONTACT_STATUS_SUCCESS,
  SET_CONTACT_STATUS_FAIL,
} from '../actions/contactAction';

const initialState = {
  contacts: [],
  contact: null,
  loading: false,
  error: null,
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CONTACT_REQUEST:
    case GET_CONTACTS_REQUEST:
    case GET_CONTACT_BY_ID_REQUEST:
    case UPDATE_CONTACT_REQUEST:
    case DELETE_CONTACT_REQUEST:
    case SET_CONTACT_STATUS_REQUEST:
      return { ...state, loading: true };

    case CREATE_CONTACT_SUCCESS:
      return { ...state, loading: false, contacts: [...state.contacts, action.payload] };

    case GET_CONTACTS_SUCCESS:
      return { ...state, loading: false, contacts: action.payload.items,  total: action.payload.total, page: action.payload.page, };

    case GET_CONTACT_BY_ID_SUCCESS:
      return { ...state, loading: false, contact: action.payload };

    case UPDATE_CONTACT_SUCCESS:
      return {
        ...state,
        loading: false,
        contacts: state.contacts.map((c) =>
          c.id === action.payload.id ? action.payload : c
        ),
      };

    case DELETE_CONTACT_SUCCESS:
      return {
        ...state,
        loading: false,
        contacts: state.contacts.filter((c) => c.id !== action.payload),
      };

    case SET_CONTACT_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        contacts: state.contacts.map((c) =>
          c.id === action.payload.id ? action.payload : c
        ),
      };

    case CREATE_CONTACT_FAIL:
    case GET_CONTACTS_FAIL:
    case GET_CONTACT_BY_ID_FAIL:
    case UPDATE_CONTACT_FAIL:
    case DELETE_CONTACT_FAIL:
    case SET_CONTACT_STATUS_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default contactReducer;
