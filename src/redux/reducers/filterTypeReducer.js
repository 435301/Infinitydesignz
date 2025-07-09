import {
  FETCH_FILTERTYPE_REQUEST,
  FETCH_FILTERTYPE_SUCCESS,
  FETCH_FILTERTYPE_FAILURE,
  ADD_FILTERTYPE_REQUEST,
  ADD_FILTERTYPE_SUCCESS,
  ADD_FILTERTYPE_FAILURE,
  EDIT_FILTERTYPE_REQUEST,
  EDIT_FILTERTYPE_SUCCESS,
  EDIT_FILTERTYPE_FAILURE,
  DELETE_FILTERTYPE_SUCCESS,
} from '../actions/filterTypeAction';

const initialState = {
  loading: false,
  filterTypes: [],
  error: null,

};

const filterTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FILTERTYPE_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_FILTERTYPE_SUCCESS:
      return { ...state, loading: false, filterTypes: action.payload };
    case FETCH_FILTERTYPE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_FILTERTYPE_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_FILTERTYPE_SUCCESS:
      return { ...state, loading: false, filterTypes: action.payload };
    case ADD_FILTERTYPE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case EDIT_FILTERTYPE_REQUEST:
      return { ...state, loading: true, error: null };
    case EDIT_FILTERTYPE_SUCCESS:
      return { ...state, loading: false };
    case EDIT_FILTERTYPE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case DELETE_FILTERTYPE_SUCCESS:
      return {
        ...state,
        filterTypes: state.filterTypes.filter((item) => item.id !== action.payload),
      };
    case 'BULK_UPDATE_FILTER_TYPE_STATUS':
      return {
        ...state,
        filterTypes: state.filterTypes.map(item =>
          action.payload.ids.includes(item.id)
            ? { ...item, status: action.payload.status }
            : item
        )
      };

    default:
      return state;
  }
};

export default filterTypeReducer;