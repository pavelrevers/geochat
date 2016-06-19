'use strict'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadEarlierMessages, postMessage } from '../../ducks/messages';
import { changePage } from '../../ducks/router.js';
import Chat from '../../components/Chat';

const stateToProps = (state) => {
  return {
    messages: state.messages,
		chatView: state.chatView,
		id: state.router.params.id
  }
}

const dispatchToProps = (dispatch) => {
  return bindActionCreators({
    loadEarlierMessages,
		postMessage,
    changePage
  }, dispatch)
}

export default connect(stateToProps, dispatchToProps)(Chat);
