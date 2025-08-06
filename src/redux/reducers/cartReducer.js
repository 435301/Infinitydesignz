import {
    FETCH_CART_REQUEST,
    FETCH_CART_SUCCESS,
    FETCH_CART_FAILURE,
    ADD_TO_CART_SUCCESS,
    UPDATE_CART_SUCCESS,
    DELETE_FROM_CART_SUCCESS,
    CLEAR_GUEST_CART
} from '../actions/cartAction';

const initialState = {
    loading: false,
    items: [],
    error: null,
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CART_REQUEST:
            return { ...state, loading: true };

        case FETCH_CART_SUCCESS:
            return {
                ...state,
                items: action.payload.items || [],
                priceSummary: action.payload.priceSummary || {},
            };

        case FETCH_CART_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case ADD_TO_CART_SUCCESS:
            return { ...state, items: [...(state.items || []), action.payload] };

        case UPDATE_CART_SUCCESS:
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id ? action.payload : item
                ),
            };

        case DELETE_FROM_CART_SUCCESS:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload),
            };

        case CLEAR_GUEST_CART:
            return { ...state, items: [] };
        default:
            return state;
    }
};

