'use strict'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ChatMap from '../../components/ChatMap';
import { updateDots } from '../../ducks/chatDots.js';

const stateToProps = (state) => {
  return {
    chatDots: state.chatDots
  }
}

const dispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateDots
  }, dispatch)
}

export default connect(stateToProps, dispatchToProps)(ChatMap);
