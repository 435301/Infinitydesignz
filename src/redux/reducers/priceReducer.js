import {
    FETCH_PRICE_REQUEST,
    FETCH_PRICE_SUCCESS,
    FETCH_PRICE_FAILURE,
    ADD_PRICE_REQUEST,
    ADD_PRICE_SUCCESS,
    ADD_PRICE_FAILURE,
    EDIT_PRICE_REQUEST,
    EDIT_PRICE_SUCCESS,
    EDIT_PRICE_FAILURE,
    DELETE_PRICE_SUCCESS,

} from '../actions/priceAction';

const initialState = {
    loading: false,
    prices: [],
    error: null,

};

const priceReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRICE_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_PRICE_SUCCESS:
            return { ...state, loading: false, prices: action.payload };
        case FETCH_PRICE_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case ADD_PRICE_REQUEST:
            return { ...state, loading: true, error: null };
        case ADD_PRICE_SUCCESS:
            return { ...state, loading: false, prices: action.payload };
        case ADD_PRICE_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case EDIT_PRICE_REQUEST:
            return { ...state, loading: true, error: null };
        case EDIT_PRICE_SUCCESS:
            return { ...state, loading: false, prices: action.payload };
        case EDIT_PRICE_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case DELETE_PRICE_SUCCESS:
            return {
                ...state,
                prices: state.prices.filter((item) => item.id !== action.payload),
            };
        default:
            return state;
    }
};

export default priceReducer;