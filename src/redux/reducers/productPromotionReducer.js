import {
  FETCH_PRODUCT_PROMOTIONS_REQUEST,
  FETCH_PRODUCT_PROMOTIONS_SUCCESS,
  FETCH_PRODUCT_PROMOTIONS_FAILURE,
  CREATE_PRODUCT_PROMOTION_REQUEST,
  CREATE_PRODUCT_PROMOTION_SUCCESS,
  CREATE_PRODUCT_PROMOTION_FAILURE,
  UPDATE_PRODUCT_PROMOTION_REQUEST,
  UPDATE_PRODUCT_PROMOTION_SUCCESS,
  UPDATE_PRODUCT_PROMOTION_FAILURE,
  DELETE_PRODUCT_PROMOTION_REQUEST,
  DELETE_PRODUCT_PROMOTION_SUCCESS,
  DELETE_PRODUCT_PROMOTION_FAILURE,
   FETCH_FRONTEND_PROMOTIONS_REQUEST,
  FETCH_FRONTEND_PROMOTIONS_SUCCESS,
  FETCH_FRONTEND_PROMOTIONS_FAILURE
} from "../actions/productionPromotionAction";

const initialState = {
  items: [],
  categories:[],
  promotions: [],
  total: 0,
  loading: false,
  error: null,
  limit:0
};


const productPromotionReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_PROMOTIONS_REQUEST:
      return { ...state, loading: true };
   case FETCH_PRODUCT_PROMOTIONS_SUCCESS: {
  const items = action.payload.items || [];
  const categories = [
    ...new Map(
      items
        .filter(it => it?.category && it.category.id != null)
        .map(it => [it.category.id, it.category])
    ).values(),
  ];

  return {
    ...state,
    loading: false,
    items,
    total: action.payload.total || 0,
    limit: action.payload.limit || 0,
    categories,                
    error: null,
  };
}
    case FETCH_PRODUCT_PROMOTIONS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case CREATE_PRODUCT_PROMOTION_REQUEST:
    case UPDATE_PRODUCT_PROMOTION_REQUEST:
    case DELETE_PRODUCT_PROMOTION_REQUEST:
      return { ...state, loading: true };

    case CREATE_PRODUCT_PROMOTION_SUCCESS:
      return {
        ...state,
        loading: false,
        items: [...state.items, action.payload],
        total: state.total + 1,
      };
    case UPDATE_PRODUCT_PROMOTION_SUCCESS:
      return {
        ...state,
        loading: false,
        items: state.items.map((item) =>
          item.id === action.payload.id ?{ ...item, priority: action.payload.priority }: item
        ),
      };
    case DELETE_PRODUCT_PROMOTION_SUCCESS:
      return {
        ...state,
        loading: false,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case CREATE_PRODUCT_PROMOTION_FAILURE:
    case UPDATE_PRODUCT_PROMOTION_FAILURE:
    case DELETE_PRODUCT_PROMOTION_FAILURE:
      return { ...state, loading: false, error: action.payload };

      case FETCH_FRONTEND_PROMOTIONS_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_FRONTEND_PROMOTIONS_SUCCESS:
      return { ...state, loading: false, promotions: action.payload.items };

    case FETCH_FRONTEND_PROMOTIONS_FAILURE:
      return { ...state, loading: false, error: action.payload };
      
    default:
      return state;
  }
};

export default productPromotionReducer;