'use strict'

import { combineReducers } from 'redux';
import chatDots from './chatDots.js';

const rootReducer = combineReducers({
  chatDots
});

export default rootReducer;
