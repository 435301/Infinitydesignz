import {
  FETCH_ADDRESSES_REQUEST,
  FETCH_ADDRESSES_SUCCESS,
  FETCH_ADDRESSES_FAILURE,
  ADD_ADDRESS,
  UPDATE_ADDRESS,
  DELETE_ADDRESS,
  SET_DEFAULT_ADDRESS,
} from "../actions/addressAction";

const initialState = {
  loading: false,
  addresses: [],
  error: "",
  defaultAddressId: null,
};

const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ADDRESSES_REQUEST:
      return { ...state, loading: true };
    // case FETCH_ADDRESSES_SUCCESS:
    //   return { ...state, loading: false, addresses: action.payload, error: "" };
    case FETCH_ADDRESSES_SUCCESS:
  return {
    ...state,
    loading: false,
    addresses: action.payload.map((addr) => ({
      ...addr,
      isDefault: addr.default === true,
    })),
    error: "",
  };
    case FETCH_ADDRESSES_FAILURE:
      return { ...state, loading: false, addresses: [], error: action.payload };

    case ADD_ADDRESS:
      return { ...state, addresses: [...state.addresses, action.payload] };

    case UPDATE_ADDRESS:
      return {
        ...state,
        addresses: state.addresses.map((addr) =>
          addr.id === action.payload.id ? action.payload : addr
        ),
      };

    case DELETE_ADDRESS:
      return {
        ...state,
        addresses: state.addresses.filter((addr) => addr.id !== action.payload),
      };

    case SET_DEFAULT_ADDRESS:
      return {
        ...state,
        defaultAddressId: action.payload,
      };

    default:
      return state;
  }
};

export default addressReducer;
