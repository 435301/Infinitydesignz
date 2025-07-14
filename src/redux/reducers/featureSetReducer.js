import {
  FETCH_FEATURESET_REQUEST,
  FETCH_FEATURESET_SUCCESS,
  FETCH_FEATURESET_FAILURE,
  ADD_FEATURESET_REQUEST,
  ADD_FEATURESET_SUCCESS,
  ADD_FEATURESET_FAILURE,
  EDIT_FEATURESET_REQUEST,
  EDIT_FEATURESET_SUCCESS,
  EDIT_FEATURESET_FAILURE,
  //   DELETE_FEATURE_SET_SUCCESS,
} from '../actions/featureSetAction';

const initialState = {
  loading: false,
  featureSets: [],
  error: null,

};

const featureSetReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FEATURESET_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_FEATURESET_SUCCESS:
      return { ...state, loading: false, featureSets: action.payload };
    case FETCH_FEATURESET_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_FEATURESET_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_FEATURESET_SUCCESS:
      return {
        ...state,
        featureSets: [...state.featureSets, action.payload],
      };
    case ADD_FEATURESET_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case EDIT_FEATURESET_REQUEST:
      return { ...state, loading: true, error: null };
    case EDIT_FEATURESET_SUCCESS:
      return { ...state, loading: false };
    case EDIT_FEATURESET_FAILURE:
      return { ...state, loading: false, error: action.payload };
    // case DELETE_FEATURE_SET_SUCCESS:
    //   return {
    //     ...state,
    //     featureSets: state.featureSets.filter((item) => item.id !== action.payload),
    //   };
    case 'BULK_UPDATE_FEATURE_SET_STATUS':
      return {
        ...state,
        featureSets: state.featureSets.map(item =>
          action.payload.ids.includes(item.id)
            ? { ...item, status: action.payload.status }
            : item
        )
      };

    default:
      return state;
  }
};

export default featureSetReducer;