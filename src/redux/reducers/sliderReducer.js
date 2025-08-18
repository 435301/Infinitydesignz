import {
    FETCH_SLIDERS_REQUEST,
    FETCH_SLIDERS_SUCCESS,
    FETCH_SLIDERS_FAILURE,
    ADD_SLIDERS_REQUEST,
    ADD_SLIDERS_SUCCESS,
    ADD_SLIDERS_FAILURE,
    EDIT_SLIDERS_REQUEST,
    EDIT_SLIDERS_SUCCESS,
    EDIT_SLIDERS_FAILURE,
    DELETE_SLIDERS_SUCCESS,
    FETCH_RIGHTSLIDERS_REQUEST,
    FETCH_RIGHTSLIDERS_SUCCESS,
    FETCH_RIGHTSLIDERS_FAILURE,
} from '../actions/slidersAction';

const initialState = {
    loading: false,
    sliders: [],
    rightSliders: [],
    error: null,

};

const slidersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SLIDERS_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_SLIDERS_SUCCESS:
            return { ...state, loading: false, sliders: action.payload };
        case FETCH_SLIDERS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case ADD_SLIDERS_REQUEST:
            return { ...state, loading: true, error: null };
        case ADD_SLIDERS_SUCCESS:
            return {
                ...state,
                sliders: [...state.sliders, action.payload],
            };
        case ADD_SLIDERS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case EDIT_SLIDERS_REQUEST:
            return { ...state, loading: true, error: null };
        case EDIT_SLIDERS_SUCCESS:
            return {
                ...state,
                sliders: [...state.sliders, action.payload],
            };
        case EDIT_SLIDERS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case DELETE_SLIDERS_SUCCESS:
            return {
                ...state,
                sliders: state.sliders.filter((item) => item.id !== action.payload),
            };
        case FETCH_RIGHTSLIDERS_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_RIGHTSLIDERS_SUCCESS:
            return { ...state, loading: false, rightSliders: action.payload };
        case FETCH_RIGHTSLIDERS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default slidersReducer;