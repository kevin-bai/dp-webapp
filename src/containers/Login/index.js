import React, { Component } from "react";
import LoginHeader from "./components/LoginHeader";
import LoginForm from "./components/LoginForm";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import {
  actions as loginActions,
  getUserName,
  getPassword,
  getLoginStatus
} from "../../redux/modules/login";

class Login extends Component {
  render() {
    const { username, password, loginStatue } = this.props;
    if (loginStatue) {
      return <Redirect to="/user"></Redirect>;
    }

    return (
      <div>
        <LoginHeader></LoginHeader>
        <LoginForm
          username={username}
          password={password}
          onChange={this.handleInputChange}
          onSubmit={this.handleSubmit}
        ></LoginForm>
      </div>
    );
  }

  handleInputChange = e => {
    if (e.target.name === "username") {
      this.props.loginActions.setUsername(e.target.value);
    } else if (e.target.name === "password") {
      this.props.loginActions.setPassword(e.target.value);
    }
  };

  handleSubmit = () => {
    this.props.loginActions.login();
  };
}

const mapStateToProps = (state, props) => {
  return {
    username: getUserName(state),
    password: getPassword(state),
    loginStatue: getLoginStatus(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginActions: bindActionCreators(loginActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
