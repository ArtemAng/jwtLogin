import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as actions from './actions'

function App({ curentUser, setAutentificated, makeLogin }) {
  // const auth = useAuth()
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userData'))

    if (data && data.token) {
      makeLogin(data);
    }
  }, [makeLogin]);
  const isAuthentificated = !!curentUser.token;
  const routes = useRoutes(isAuthentificated);
  return (
    <Router>
      <div className="App">
        {routes}
      </div>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    curentUser: state.curentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  const { setAutentificated, makeLogin } = bindActionCreators(actions, dispatch)
  return {
    setAutentificated, makeLogin
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);