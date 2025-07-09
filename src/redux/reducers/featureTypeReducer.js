import {
  FETCH_FEATURETYPE_REQUEST,
  FETCH_FEATURETYPE_SUCCESS,
  FETCH_FEATURETYPE_FAILURE,
  ADD_FEATURETYPE_REQUEST,
  ADD_FEATURETYPE_SUCCESS,
  ADD_FEATURETYPE_FAILURE,
  EDIT_FEATURETYPE_REQUEST,
  EDIT_FEATURETYPE_SUCCESS,
  EDIT_FEATURETYPE_FAILURE
} from '../actions/featureTypeAction';

const initialState = {
  loading: false,
  featureTypes: [],
  error: null,

};

const featureTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FEATURETYPE_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_FEATURETYPE_SUCCESS:
      return { ...state, loading: false, featureTypes: action.payload };
    case FETCH_FEATURETYPE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_FEATURETYPE_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_FEATURETYPE_SUCCESS:
      return { ...state, loading: false, featureTypes: action.payload };
    case ADD_FEATURETYPE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case EDIT_FEATURETYPE_REQUEST:
      return { ...state, loading: true, error: null };
    case EDIT_FEATURETYPE_SUCCESS:
      return { ...state, loading: false };
    case EDIT_FEATURETYPE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case 'DELETE_FEATURE_TYPE_SUCCESS':
      return {
        ...state,
        featureTypes: state.featureTypes.filter((item) => item.id !== action.payload),
      };
    case 'BULK_UPDATE_FEATURE_TYPE_STATUS':
      return {
        ...state,
        featureTypes: state.featureTypes.map(item =>
          action.payload.ids.includes(item.id)
            ? { ...item, status: action.payload.status }
            : item
        )
      };

    default:
      return state;
  }
};

export default featureTypeReducer;