import {
  SEARCH_KEYWORDS_REQUEST,
  SEARCH_KEYWORDS_SUCCESS,
  SEARCH_KEYWORDS_FAILURE,
} from "../actions/searchKeywordsAction";

const initialState={
    items: [],
  page: 1,
  take: 10,
  total: 0,
  totalPages: 0,
  sortBy: "createdAt",
  order: "desc",
  filters: {},
  loading: false,
  error: null,
}

const keywordReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_KEYWORDS_REQUEST:
      return { ...state, loading: true, error: null };

    case SEARCH_KEYWORDS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.items,
        page: action.payload.page,
        take: action.payload.take,
        total: action.payload.total,
        totalPages: action.payload.totalPages,
        sortBy: action.payload.sortBy,
        order: action.payload.order,
        filters: action.payload.filters,
      };

    case SEARCH_KEYWORDS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default keywordReducer;