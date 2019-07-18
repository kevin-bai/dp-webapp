import React, { Component } from 'react';
import LoginHeader from './components/LoginHeader'
import LoginForm from './components/LoginForm'
import { connect } from "react-redux";

class Login extends Component {
  render() {
    return (
      <div>
        <LoginHeader></LoginHeader>
        <LoginForm onChange={this.handleInputChange} onSubmit={this.handleSubmit}></LoginForm>
      </div>
    );
  }

  handleInputChange = (e) => {

  }

  handleSubmit = () => {

  }

}

const mapStateToProps = (state, props) => {
  return {

  }
}

const mapDispatchToProps = dispatch =>{
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
