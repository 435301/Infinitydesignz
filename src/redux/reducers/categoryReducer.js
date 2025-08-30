
import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAILURE,
  ADD_SUBCATEGORY_REQUEST,
  ADD_SUBCATEGORY_SUCCESS,
  ADD_SUBCATEGORY_FAILURE,
  LIST_SUBCATEGORY_REQUEST,
  LIST_SUBCATEGORY_SUCCESS,
  LIST_SUBCATEGORY_FAILURE,
  EDIT_CATEGORY_SUCCESS,
  EDIT_CATEGORY_FAILURE,
  EDIT_CATEGORY_REQUEST,
  EDIT_SUBCATEGORY_REQUEST,
  EDIT_SUBCATEGORY_SUCCESS,
  EDIT_SUBCATEGORY_FAILURE,
  FETCH_SUBCATEGORY_BY_ID_SUCCESS,
  EDIT_LISTSUBCATEGORY_FAILURE,
  EDIT_LISTSUBCATEGORY_SUCCESS,
  FETCH_LISTSUBCATEGORY_BY_ID_SUCCESS,
  DELETE_CATEGORY_SUCCESS,
  DELETE_SUBCATEGORY_SUCCESS,
  DELETE_LISTSUBCATEGORY_SUCCESS,
  FETCH_NEED_HELP_REQUEST,
  FETCH_NEED_HELP_SUCCESS,
  FETCH_NEED_HELP_FAILURE,
} from '../actions/categoryAction';

const initialState = {
  loading: false,
  categories: [],
  error: null,
  subCategory: null,
  items: [],

};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_CATEGORIES_SUCCESS:
      return { ...state, loading: false, categories: action.payload };
    case FETCH_CATEGORIES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_CATEGORY_REQUEST:
      return { ...state, loading: true };
    case ADD_CATEGORY_SUCCESS:
      return { ...state, loading: false };
    case ADD_CATEGORY_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_SUBCATEGORY_REQUEST:
      return { ...state, loading: true };
    case ADD_SUBCATEGORY_SUCCESS:
      return { ...state, loading: false };
    case ADD_SUBCATEGORY_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case LIST_SUBCATEGORY_REQUEST:
      return { ...state, loading: true };
    case LIST_SUBCATEGORY_SUCCESS:
      return { ...state, loading: false };
    case LIST_SUBCATEGORY_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case EDIT_CATEGORY_REQUEST:
      return { ...state, loading: true };
    case EDIT_CATEGORY_SUCCESS:
      return { ...state, loading: true };
    case EDIT_CATEGORY_FAILURE:
      return { ...state, loading: true, error: action.payload };
    case EDIT_SUBCATEGORY_REQUEST:
      return { ...state, loading: true };
    case EDIT_SUBCATEGORY_SUCCESS:
      return { ...state, loading: true, subCategory: action.payload };
    case EDIT_SUBCATEGORY_FAILURE:
      return { ...state, loading: true, error: action.payload };
    case FETCH_SUBCATEGORY_BY_ID_SUCCESS:
      return { ...state, subCategory: action.payload };
    case EDIT_LISTSUBCATEGORY_SUCCESS:
      return { ...state, loading: true, singleCategory: action.payload };
    case EDIT_LISTSUBCATEGORY_FAILURE:
      return { ...state, loading: true, error: action.payload };
    case FETCH_LISTSUBCATEGORY_BY_ID_SUCCESS:
      return { ...state, loading: false, singleCategory: action.payload };
    case DELETE_CATEGORY_SUCCESS:
      return { ...state, loading: false, categories: state.categories.filter(category => category.id !== action.payload) };
    case DELETE_SUBCATEGORY_SUCCESS:
      return { ...state, loading: false, subCategory: state.subCategory.filter(sub => sub.id !== action.payload) };
    case DELETE_LISTSUBCATEGORY_SUCCESS:
      return { ...state, loading: false, singleCategory: state.singleCategory.filter(item => item.id !== action.payload) };
    case FETCH_NEED_HELP_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_NEED_HELP_SUCCESS:
      return { ...state, loading: false, items: action.payload };
    case FETCH_NEED_HELP_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default categoryReducer;
