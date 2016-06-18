'use strict'

import { connect } from 'react-redux';
import ChatMap from '../../components/ChatMap';

const stateToProps = (state) => {
  return {
    chatDots: state.chatDots
  }
}

export default connect(stateToProps)(ChatMap);
