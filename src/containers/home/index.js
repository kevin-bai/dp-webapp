import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import Category from './components/Category'
import Headline from './components/HeadLine'
import Discount from "./components/Discount";
import {
  actions as homeActions,
  getDiscounts
} from '../../redux/modules/home'


class Home extends Component {
  render() {
    const {discounts} = this.props
    return (
      <div>
        <Category></Category>
        <Headline></Headline>
        <Discount data={discounts}></Discount>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    discounts: getDiscounts(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    homeActions: bindActionCreators(homeActions, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
