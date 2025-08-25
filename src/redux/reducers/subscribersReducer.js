import {
  SUBSCRIBERS_REQUEST,
  SUBSCRIBERS_SUCCESS,
  SUBSCRIBERS_FAILURE,
} from "../actions/subscribersAction";

const initialState={
    items: [],
  page: 1,
  take: 10,
  total: 0,
  totalPages: 0,
  loading: false,
  error: null,
}

const subscribersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBSCRIBERS_REQUEST:
      return { ...state, loading: true, error: null };

    case SUBSCRIBERS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.items,
        page: action.payload.page,
        take: action.payload.take,
        total: action.payload.total,
        totalPages: Math.ceil(action.payload.total / action.payload.take), 
      };

    case SUBSCRIBERS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default subscribersReducer;