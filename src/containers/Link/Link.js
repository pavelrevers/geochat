'use strict'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changePage } from '../../ducks/router.js';
import Link from '../../components/Link';

const stateToProps = (state) => {
  return {}
}

const dispatchToProps = (dispatch) => {
  return bindActionCreators({
    changePage
  }, dispatch)
}

export default connect(stateToProps, dispatchToProps)(Link);
