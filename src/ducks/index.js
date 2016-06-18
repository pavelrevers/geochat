'use strict'

import { combineReducers } from 'redux';
import chatDots from './chatDots.js';
import region from './region.js';
import router from './router.js';
import newChat from './newChat.js';

const rootReducer = combineReducers({
  chatDots,
  region,
  router,
  newChat
});

export default rootReducer;
