'use strict'

import { combineReducers } from 'redux';
import chatDots from './chatDots.js';
import messages from './messages.js';
import region from './region.js';
import router from './router.js';

const rootReducer = combineReducers({
  chatDots,
  region,
  router,
  messages
});

export default rootReducer;
