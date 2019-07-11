import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { connect } from "react-redux";
import Home from '../Home'
import ErrorToast from '../../components/ErrorToast'
import { actions as appActions, getError } from "../../redux/modules/app";
import './style.scss'

class App extends Component {
  render() {
    const {error, appActions: {clearError}} = this.props
    return (
      <div className="App">
        <Router>
          <Switch>
            {/*<Route path="/detail/:id" component={ProductDetail} />*/}
            {/*<Route path="/search" component={Search} />*/}
            <Route path="/" component={Home} />
          </Switch>
        </Router>
        {error ? <ErrorToast msg={error} clearError={clearError}></ErrorToast> : null}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    error: getError(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    appActions: bindActionCreators(appActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
