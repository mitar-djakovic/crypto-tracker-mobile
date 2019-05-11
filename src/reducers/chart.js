import { 
    GET_CURRENCY_CHART_ERROR,
    GET_CURRENCY_CHART_REQUEST,
    GET_CURRENCY_CHART_SUCCESS,
    GET_CHART_POINT_REQUEST,
    GET_CHART_POINT_SUCCESS,
    GET_CHART_POINT_ERROR,
    SELECT_CURRENCY
} from '../actions/actionTypes';

const initialState = {
    requestSent: false,
    chartData: [],
    error: false,
    errData: [],
    dataLoaded: false,
    activePointReqSent: false,
    pointError: false,
    activePoint: '',
    pointLoaded: false,
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_CURRENCY_CHART_REQUEST:
            return {
                ...state,
                requestSent: true,
                error: false,
            }
        case GET_CURRENCY_CHART_SUCCESS:
            return {
                ...state,
                requestSent: false,
                error: false,
                chartData: action.chart,
                dataLoaded: true,
            }
        case GET_CURRENCY_CHART_ERROR:
            return {
                ...state,
                requestSent: false,
                error: true,
                errData: action.error
            }
        case GET_CHART_POINT_REQUEST:
            return {
                ...state,
                activePointReqSent: true,
                pointError: false,
            }
        case GET_CHART_POINT_SUCCESS:
            return {
                ...state,
                activePointReqSent: false,
                pointError: false,
                activePoint: action.value,
                pointLoaded: true
            }
        case GET_CHART_POINT_ERROR:
            return {
                ...state,
                activePointReqSent: false,
                pointError: true,
                pointLoaded: false,
            }
        default:
            return state;
    }
}