import {
  FETCH_HOME_CATEGORY_PROMOTIONS_REQUEST,
  FETCH_HOME_CATEGORY_PROMOTIONS_SUCCESS,
  FETCH_HOME_CATEGORY_PROMOTIONS_FAILURE,
  CREATE_HOME_CATEGORY_PROMOTION_REQUEST,
  CREATE_HOME_CATEGORY_PROMOTION_SUCCESS,
  CREATE_HOME_CATEGORY_PROMOTION_FAILURE,
  UPDATE_HOME_CATEGORY_PROMOTION_REQUEST,
  UPDATE_HOME_CATEGORY_PROMOTION_SUCCESS,
  UPDATE_HOME_CATEGORY_PROMOTION_FAILURE,
  DELETE_HOME_CATEGORY_PROMOTION_REQUEST,
  DELETE_HOME_CATEGORY_PROMOTION_SUCCESS,
  DELETE_HOME_CATEGORY_PROMOTION_FAILURE,
} from "../actions/categoryPromotionAction";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export const homeCategoryPromotionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HOME_CATEGORY_PROMOTIONS_REQUEST:
    case CREATE_HOME_CATEGORY_PROMOTION_REQUEST:
    case UPDATE_HOME_CATEGORY_PROMOTION_REQUEST:
    case DELETE_HOME_CATEGORY_PROMOTION_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_HOME_CATEGORY_PROMOTIONS_SUCCESS:
      console.log('Updated promotions:', action.payload);
      return { ...state, loading: false, items: action.payload };

    case CREATE_HOME_CATEGORY_PROMOTION_SUCCESS:
      return { ...state, loading: false, items: [...state.items, action.payload] };

    case UPDATE_HOME_CATEGORY_PROMOTION_SUCCESS:
      return {
        ...state,
        loading: false,
        items: state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case DELETE_HOME_CATEGORY_PROMOTION_SUCCESS:
      return {
        ...state,
        loading: false,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case FETCH_HOME_CATEGORY_PROMOTIONS_FAILURE:
    case CREATE_HOME_CATEGORY_PROMOTION_FAILURE:
    case UPDATE_HOME_CATEGORY_PROMOTION_FAILURE:
    case DELETE_HOME_CATEGORY_PROMOTION_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
