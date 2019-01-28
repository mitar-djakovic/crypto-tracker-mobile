import { 
    LOGIN_REQUEST, 
    LOGIN_SUCCESSFUL, 
    LOGIN_FAIL 
} from '../actions/actionTypes';

const initialState = {
    logged: false,
    access_token: null,
    error: null,
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case LOGIN_REQUEST:
            return {
                logged: false,
                access_token: null,
                error: null,
                loading: true
            }
        case LOGIN_SUCCESSFUL:
            return {
                logged: true,
                access_token: action.payload.access_token,
                error: null,
                loading: false
            }
        case LOGIN_FAIL:
            return {
                logged: false,
                access_token: null,
                error: action.paload.error,
                loading: false
            }
        default:
            return state;
    }
}