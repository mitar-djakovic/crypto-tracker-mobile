import {
    GET_CURRENT_PRICE_REQUEST,
    GET_CURRENT_PRICE_SUCCESS,
    GET_CURRENT_PRICE_ERROR,
    GET_CURRENCY_CHART_REQUEST,
    GET_CURRENCY_CHART_SUCCESS,
    GET_CURRENCY_CHART_ERROR,
    GET_CHART_POINT_REQUEST,
    GET_CHART_POINT_ERROR,
    GET_CHART_POINT_SUCCESS,
    SELECT_CURRENCY
} from '../actions/actionTypes';
import moment from 'moment';
import { fetchCurrentPrices, fetchCurrencyChart } from '../client/client';

const getCurrentPriceRequest = () => {
    return {
        type: GET_CURRENT_PRICE_REQUEST
    }
};

const getCurrentPriceError = (err) => {
    return {
        type: GET_CURRENT_PRICE_ERROR,
        err
    }
};

const getCurrentPriceSuccess = (data) => {
    return {
        type: GET_CURRENT_PRICE_SUCCESS,
        data
    }
};

export const getCurrentPrices = () => {
    return dispatch => {
        dispatch(getCurrentPriceRequest())
        fetchCurrentPrices().then(res => {
            const data = res.data
            dispatch(getCurrentPriceSuccess(data));
        }).catch(err => {
            dispatch(getCurrentPriceError())
        });      
    }
};

const getCurrencyChartRequest = () => {
    return {
        type: GET_CURRENCY_CHART_REQUEST
    }
}

const getCurrencyChartError = (error) => {
    return {
        type: GET_CURRENCY_CHART_ERROR,
        error
    }
}

const getCurrencyChartSuccess = (chart) => {
    return {
        type: GET_CURRENCY_CHART_SUCCESS,
        chart
    }
}

export const getCurrencyChart = (currency) => {
    return dispatch => {
        dispatch(getCurrencyChartRequest())
        fetchCurrencyChart(currency).then(res => {
            if(res.status === 200) {
                const sortedData = [];
                let count = 0;
               
                for (let date in res.data.Data){       
                    sortedData.push({
                        d: moment(res.data.Data[date].time*1000).format('DD'),
                        p: res.data.Data[date].close.toLocaleString('us-EN',{ style: 'currency', currency: 'USD' }),
                        x: count, 
                        y: res.data.Data[date].close
                    });
                    count++;
                }
                dispatch(getCurrencyChartSuccess(sortedData))
            }
        }).catch(error => {
            dispatch(getCurrencyChartError(error))
        })
    }
}

const getChartPointRequest = () => {
    return {
        type: GET_CHART_POINT_REQUEST
    }
}

const getChartPointSuccess = (value) => {
    return {
        type: GET_CHART_POINT_SUCCESS,
        value
    }
}

const getChartPointError = () => {
    return {
        type: GET_CHART_POINT_ERROR
    }
}

export const getPoint = (value) => {
    return dispatch => {
        dispatch(getChartPointRequest())
        if(!value) {
            dispatch(getChartPointError())
        } else {
            dispatch(getChartPointSuccess(value))
        }
    }
}
