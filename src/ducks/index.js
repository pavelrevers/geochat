'use strict'

import { combineReducers } from 'redux';
import chatDots from './chatDots.js';
import messages from './messages.js';
import region from './region.js';
import router from './router.js';
import user from './user.js';
import newChat from './newChat.js';

const rootReducer = combineReducers({
  chatDots,
  region,
  router,
  newChat,
  messages,
  user
});

export default rootReducer;
