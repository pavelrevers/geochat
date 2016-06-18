'use strict'

import { connect } from 'react-redux';
import { loadErlierMessages, postMessage } from '../../ducks/messages';
import Chat from '../../components/Chat';

const stateToProps = (state) => {
  return {
    messages: state.messages,
		chatView: state.chatView
  }
}

const dispatchToProps = (dispatch) => {
  return bindActionCreators({
    loadErlierMessages,
		postMessage
  }, dispatch)
}

export default connect(stateToProps, dispatchToProps)(Chat);
