import {
    FETCH_COLOR_REQUEST,
    FETCH_COLOR_SUCCESS,
    FETCH_COLOR_FAILURE,
    ADD_COLORS_REQUEST,
    ADD_COLORS_SUCCESS,
    ADD_COLORS_FAILURE,
    EDIT_COLORS_REQUEST,
    EDIT_COLORS_SUCCESS,
    EDIT_COLORS_FAILURE,
    DELETE_COLOR_SUCCESS,
    BULK_UPDATE_COLOR_SUCCESS

} from '../actions/colorAction';

const initialState = {
    loading: false,
    colors: [],
    error: null,

};

const colorReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COLOR_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_COLOR_SUCCESS:
            return { ...state, loading: false, colors: action.payload };
        case FETCH_COLOR_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case ADD_COLORS_REQUEST:
            return { ...state, loading: true, error: null };
        case ADD_COLORS_SUCCESS:
            return { ...state, loading: false, colors: action.payload };
        case ADD_COLORS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case EDIT_COLORS_REQUEST:
            return { ...state, loading: true, error: null };
        case EDIT_COLORS_SUCCESS:
            return { ...state, loading: false, colors: action.payload };
        case EDIT_COLORS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case DELETE_COLOR_SUCCESS:
            return {
                ...state,
                colors: state.colors.filter((item) => item.id !== action.payload),
            };
        case BULK_UPDATE_COLOR_SUCCESS:
            return {
                ...state,
                colors: state.colors.map((color) =>
                    action.payload.find((c) => c.id === color.id) ? { ...color, ...action.payload.find((c) => c.id === color.id) } : color
                ),
            }
        default:
            return state;
    }
};

export default colorReducer;