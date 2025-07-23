import {
    FETCH_COUPON_REQUEST,
    FETCH_COUPON_SUCCESS,
    FETCH_COUPON_FAILURE,
    ADD_COUPON_REQUEST,
    ADD_COUPON_SUCCESS,
    ADD_COUPON_FAILURE,
    EDIT_COUPON_REQUEST,
    EDIT_COUPON_SUCCESS,
    EDIT_COUPON_FAILURE,
    DELETE_COUPON_SUCCESS,
    BULK_UPDATE_COUPON_SUCCESS

} from '../actions/couponAction';

const initialState = {
    loading: false,
    coupons: [],
    error: null,

};

const couponReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COUPON_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_COUPON_SUCCESS:
            return { ...state, loading: false, coupons: action.payload };
        case FETCH_COUPON_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case ADD_COUPON_REQUEST:
            return { ...state, loading: true, error: null };
        case ADD_COUPON_SUCCESS:
            return { ...state, loading: false, coupons: action.payload };
        case ADD_COUPON_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case EDIT_COUPON_REQUEST:
            return { ...state, loading: true, error: null };
        case EDIT_COUPON_SUCCESS:
            return { ...state, loading: false, coupons: action.payload };
        case EDIT_COUPON_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case DELETE_COUPON_SUCCESS:
            return {
                ...state,
                coupons: state.coupons.filter((item) => item.id !== action.payload),
            };
        case BULK_UPDATE_COUPON_SUCCESS:
            return {
                ...state,
                coupons: state.coupons.map((coupon) =>
                    action.payload.find((c) => c.id === coupon.id) ? { ...coupon, ...action.payload.find((c) => c.id === coupon.id) } : coupon
                ),
            }
        default:
            return state;
    }
};

export default couponReducer;