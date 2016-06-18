'use strict'

import { combineReducers } from 'redux';
import chatDots from './chatDots.js';
import messages from './messages.js';

const rootReducer = combineReducers({
  messages,
  chatDots
});

export default rootReducer;
