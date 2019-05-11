import { combineReducers } from 'redux';

import data from './data';
import chart from './chart';

const rootReducer = combineReducers({
    data,
    chart
});

export default rootReducer;