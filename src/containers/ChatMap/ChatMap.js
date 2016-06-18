'use strict'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ChatMap from '../../components/ChatMap';
import { updateDots } from '../../ducks/chatDots.js';
import { updateRegion, getUserRegion } from '../../ducks/region.js';
import { changePage } from '../../ducks/router.js';
import { startNewChatCreation } from '../../ducks/newChat.js';

const stateToProps = (state) => {
  return {
    chatDots: state.chatDots,
    region: state.region,
    newChatInProgress: state.newChat.inProgress,
    newChatCoordinate: state.newChat.coordinate
  }
}

const dispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateDots,
    updateRegion,
    changePage,
    getUserRegion,
    startNewChatCreation
  }, dispatch)
}

export default connect(stateToProps, dispatchToProps)(ChatMap);
