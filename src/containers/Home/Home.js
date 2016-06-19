'use strict'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Home from '../../components/Home';
import { changePage } from '../../ducks/router.js';
import { changeUserName, changeUserPhone, login } from '../../ducks/user.js';

const stateToProps = (state) => {
  return {
    user: state.user
  }
}

const dispatchToProps = (dispatch) => {
  return bindActionCreators({
    changePage,
    login,
    changeUserName,
    changeUserPhone
  }, dispatch)
}

export default connect(stateToProps, dispatchToProps)(Home);
