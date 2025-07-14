import {
 FETCH_VARIANTS_REQUEST,
 FETCH_VARIANTS_SUCCESS,
 FETCH_VARIANTS_FAILURE,
 ADD_VARIANTS_REQUEST,
 ADD_VARIANTS_SUCCESS,
 ADD_VARIANTS_FAILURE,
 EDIT_VARIANTS_REQUEST,
 EDIT_VARIANTS_SUCCESS,
 EDIT_VARIANTS_FAILURE,
 DELETE_VARIANTS_SUCCESS,
} from '../actions/variantsAction';

const initialState = {
  loading: false,
  variants: [],
  error: null,

};

const variantsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VARIANTS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_VARIANTS_SUCCESS:
      return { ...state, loading: false, variants: action.payload };
    case FETCH_VARIANTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_VARIANTS_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_VARIANTS_SUCCESS:
      return { ...state, loading: false, variants: action.payload };
    case ADD_VARIANTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case EDIT_VARIANTS_REQUEST:
      return { ...state, loading: true, error: null };
    case EDIT_VARIANTS_SUCCESS:
      return { ...state, loading: false };
    case EDIT_VARIANTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
       case DELETE_VARIANTS_SUCCESS:
            return {
              ...state,
              variants: state.variants.filter((item) => item.id !== action.payload),
            };
    default:
      return state;
  }
};

export default variantsReducer;