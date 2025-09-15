import {
    FETCH_CART_REQUEST,
    FETCH_CART_SUCCESS,
    FETCH_CART_FAILURE,
    ADD_TO_CART_SUCCESS,
    UPDATE_CART_SUCCESS,
    DELETE_FROM_CART_SUCCESS,
    CLEAR_GUEST_CART,
    REMOVE_COUPON,
    APPLY_COUPON_SUCCESS,
    SET_GUEST_CART,
    CLEAR_CART_REQUEST,
    CLEAR_CART_SUCCESS,
    CLEAR_CART_FAILURE,
} from '../actions/cartAction';

const initialState = {
    loading: false,
    items: [],
    priceSummary: {},
    appliedCoupon: null,
    error: null,
    canAccessCheckout: false
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
        case APPLY_COUPON_SUCCESS:
            return {
                ...state,
                priceSummary: action.payload.priceSummary,
                appliedCoupon: action.payload.coupon,
            };
        case REMOVE_COUPON:
            const { totalMRP, discountOnMRP, platformFee, shippingFee } = state.priceSummary;
            return {
                ...state,
                appliedCoupon: null,
                priceSummary: {
                    ...state.priceSummary,
                    couponDiscount: 0,
                    finalPayable: totalMRP - discountOnMRP + platformFee + shippingFee,
                },
            };
        case SET_GUEST_CART:
            return {
                ...state,
                items: action.payload,
            };
        case CLEAR_CART_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CLEAR_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                items: [],
                priceSummary: {},
                appliedCoupon: null,
            };
        case CLEAR_CART_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "ALLOW_CHECKOUT":
            return { ...state, canAccessCheckout: true };
        default:
            return state;
    }

};

