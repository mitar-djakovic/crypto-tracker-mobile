import { 
    GET_CURRENT_PRICE_REQUEST,
    GET_CURRENT_PRICE_SUCCESS,
    GET_CURRENT_PRICE_ERROR,
} from '../actions/actionTypes';

const initialState = {
    requestSent: false,
    currentPrice: [],
    error: false,
    errData: [],
    dataLoaded: false,
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_CURRENT_PRICE_REQUEST:
            return {
                ...state,
                requestSent: true,
                error: false,
                dataLoaded: false,
            }
        case GET_CURRENT_PRICE_SUCCESS:
            return {
                ...state,
                requestSent: false,
                currentPrice: action.data,
                error: false,
                errData: [],
                dataLoaded: true
            }
        case GET_CURRENT_PRICE_ERROR:
            return {
                ...state,
                requestSent: false,
                error: true,
                errData: action.data,
                dataLoaded: false,
            }
        default:
            return state;
    }
}