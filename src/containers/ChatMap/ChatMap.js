'use strict'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ChatMap from '../../components/ChatMap';
import { updateDots } from '../../ducks/chatDots.js';
import { updateRegion } from '../../ducks/region.js';
import { changePage } from '../../ducks/router.js';

const stateToProps = (state) => {
  return {
    chatDots: state.chatDots,
    region: state.region
  }
}

const dispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateDots,
    updateRegion,
    changePage
  }, dispatch)
}

export default connect(stateToProps, dispatchToProps)(ChatMap);
