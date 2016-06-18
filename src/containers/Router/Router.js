'use strict'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React from 'react';
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk';
import rootReducer from '../../ducks'
import Router from '../../components/Router';
import { changePage } from '../../ducks/router.js';

const stateToProps = (state) => {
  return {
    router: state.router
  }
}

const dispatchToProps = (dispatch) => {
  return bindActionCreators({
    changePage
  }, dispatch)
}

export default connect(stateToProps, dispatchToProps)(Router);
