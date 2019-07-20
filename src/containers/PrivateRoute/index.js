import React, { Component } from "react";
import { getLoginStatus } from "../../redux/modules/login";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

class PrivateRoute extends Component {
  render() {
    const { component: Component, isLogin, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={props => {
          return isLogin ? (
            <Component {...props}></Component>
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            ></Redirect>
          );
        }}
      ></Route>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    isLogin: getLoginStatus(state)
  };
};

export default connect(
  mapStateToProps,
  null
)(PrivateRoute);
