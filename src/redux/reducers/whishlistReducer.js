import {
  FETCH_WISHLIST_REQUEST,
  FETCH_WISHLIST_SUCCESS,
  FETCH_WISHLIST_FAILURE,
  ADD_TO_WISHLIST_SUCCESS,
  DELETE_WISHLIST_ITEM_REQUEST,
  DELETE_WISHLIST_ITEM_SUCCESS,
  DELETE_WISHLIST_ITEM_FAILURE
} from '../actions/whishlistAction';

const initialState = {                                                 
  items: [],
  loading: false,
  error: null,
    relatedProducts: [],
};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WISHLIST_REQUEST:
      return { ...state, loading: true };
    case FETCH_WISHLIST_SUCCESS:
      console.log("Reducer received new wishlist:", action.payload);
      return {
    ...state,
    loading: false,
    items: action.payload.wishlistItems || [],
    relatedProducts: action.payload.relatedProducts || [] 
  };
    case FETCH_WISHLIST_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_TO_WISHLIST_SUCCESS:
      return { ...state, items: [...state.items, action.payload] };
       case DELETE_WISHLIST_ITEM_REQUEST:
      return { ...state, loading: true };
    case DELETE_WISHLIST_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        items: state.items.filter(item => item.id !== action.payload),
      };
    case DELETE_WISHLIST_ITEM_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};



export default wishlistReducer;
